const SorobanClient = require("soroban-client");
/**
 * Get account details from the Soroban network for the publicKey currently
 * selected in Freighter. If not connected to Freighter, return null.
 */
async function getAccount(wallet, server) {
  if (!(await wallet.isConnected()) || !(await wallet.isAllowed())) {
    return null;
  }
  const { publicKey } = await wallet.getUserInfo();
  if (!publicKey) {
    return null;
  }
  return await server.getAccount(publicKey);
}

export class NotImplementedError extends Error {}

// defined this way so typeahead shows full union, not named alias
//let someRpcResponse;

/**
 * Sign a transaction with Freighter and return the fully-reconstructed
 * transaction ready to send with {@link sendTx}.
 *
 * If you need to construct a transaction yourself rather than using `invoke`
 * or one of the exported contract methods, you may want to use this function
 * to sign the transaction with Freighter.
 */
export async function signTx(wallet, tx, networkPassphrase) {
  const signed = await wallet.signTransaction(tx.toXDR(), { networkPassphrase })
  return SorobanClient.TransactionBuilder.fromXDR(signed, networkPassphrase)
}

/**
 * Send a transaction to the Soroban network.
 *
 * Wait `secondsToWait` seconds for the transaction to complete (default: 10).
 *
 * If you need to construct or sign a transaction yourself rather than using
 * `invoke` or one of the exported contract methods, you may want to use this
 * function for its timeout/`secondsToWait` logic, rather than implementing
 * your own.
 */
export async function sendTx(tx, secondsToWait, server) {
  //console.log('SEND', tx)
  //console.log('SERV', server)
  const sendTransactionResponse = await server.sendTransaction(tx)
  const txid = sendTransactionResponse.hash
  if (sendTransactionResponse.status !== "PENDING" || secondsToWait === 0) {
    console.log('DONE')
    return {raw:sendTransactionResponse, txid}
  }
  let getTransactionResponse = await server.getTransaction(txid)
  const waitUntil = new Date(Date.now() + secondsToWait * 1000).valueOf()
  let waitTime = 1000
  let exponentialFactor = 1.5
  while (Date.now() < waitUntil && getTransactionResponse.status === SorobanClient.SorobanRpc.GetTransactionStatus.NOT_FOUND) {
    console.log('WAIT')
    await new Promise((resolve) => setTimeout(resolve, waitTime)) // Wait a beat
    waitTime = waitTime * exponentialFactor; /// Exponential backoff
    getTransactionResponse = await server.getTransaction(txid) // See if the transaction is complete
    console.log('RESTR', getTransactionResponse?.status)
  }
  if (getTransactionResponse.status === SorobanClient.SorobanRpc.GetTransactionStatus.NOT_FOUND) {
    console.log('NOTFOUND')
    console.error(`Waited ${secondsToWait} seconds for transaction to complete, but it did not. ` +
      `Returning anyway. Check the transaction status manually. ` +
      `Info: ${JSON.stringify(sendTransactionResponse, null, 2)}`)
  }
  console.log('RESRET')
  return {raw:getTransactionResponse, txid}
}

export async function invoke({ method, args = [], fee = 100, responseType, parseResultXdr, secondsToWait = 30, rpcUrl, networkPassphrase, contractId, wallet, parseMeta=false}) {
  console.log('INVOKE CLIENT', JSON.stringify({ method, args, fee, responseType, parseResultXdr, secondsToWait, rpcUrl, networkPassphrase, contractId, wallet, parseMeta }, null, 2))
  wallet = wallet ?? (await Promise.resolve().then(() => require("@stellar/freighter-api")))
  let parse = parseResultXdr
  const server = new SorobanClient.Server(rpcUrl, { allowHttp: rpcUrl.startsWith("http://") })
  const walletAccount = await getAccount(wallet, server)
  // use a placeholder null account if not yet connected to Freighter so that view calls can still work
  const account = walletAccount ?? new SorobanClient.Account("GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF", "0")
  console.log('Account', account)
  const contract = new SorobanClient.Contract(contractId)
  let tx = new SorobanClient.TransactionBuilder(account, { fee: fee.toString(10), networkPassphrase })
    .addOperation(contract.call(method, ...args))
    .setTimeout(SorobanClient.TimeoutInfinite)
    .build()
  //console.log('TX', tx)
  const simulated = await server.simulateTransaction(tx)
  //console.log('SIM', simulated)
  if (SorobanClient.SorobanRpc.isSimulationError(simulated)) {
    throw new Error(simulated.error)
  } else if (responseType === "simulated") {
    return simulated
  } else if (!simulated.result) {
    throw new Error(`invalid simulation: no result in ${simulated}`)
  }
  let authsCount = simulated.result.auth.length
  const writeLength = simulated.transactionData.getReadWrite().length
  const isViewCall = (authsCount === 0) && (writeLength === 0)
  if (isViewCall) {
    if (responseType === "full") {
      return simulated
    }
    return parseResultXdr(simulated.result.retval)
  }
  if (authsCount > 1) {
    throw new NotImplementedError("Multiple auths not yet supported")
  }
  if (authsCount === 1) {
    // TODO: figure out how to fix with new SorobanClient
    // const auth = SorobanClient.xdr.SorobanAuthorizationEntry.fromXDR(auths![0]!, 'base64')
    // if (auth.addressWithNonce() !== undefined) {
    //   throw new NotImplementedError(
    //     `This transaction needs to be signed by ${auth.addressWithNonce()
    //     }; Not yet supported`
    //   )
    // }
  }
  if (!walletAccount) {
    throw new Error("Not connected to Freighter")
  }
  const txr = SorobanClient.assembleTransaction(tx, networkPassphrase, simulated).build()
  console.log('TXR', txr)
  //const txs = await signTx(wallet, txr, networkPassphrase)
  const signed = await wallet.signTransaction(txr.toXDR(), { networkPassphrase })
  const txs = SorobanClient.TransactionBuilder.fromXDR(signed, networkPassphrase)
  console.log('TXS', txs)
  const secsToWait = 60
  const {raw, txid} = await sendTx(txs, secsToWait, server)
  console.log('RAW', raw)
  console.log('TXID', txid)
  if (responseType === "full") {
    console.log('FULL RESPONSE')
    return {success:true, result:raw, txid}
  }
  // if `sendTx` awaited the inclusion of the tx in the ledger, it used
  // `getTransaction`, which has a `resultXdr` field
  if ("resultXdr" in raw) {
    console.log('RESXDR')
    const getResult = raw
    if (getResult.status !== SorobanClient.SorobanRpc.GetTransactionStatus.SUCCESS) {
      console.error('Transaction submission failed! Returning full RPC response.')
      return {result:raw, txid, success:false}
    }
    let parsed = {}
    if(parseMeta){
      parsed = parse(raw.resultMetaXdr);
    } else {
      parsed = parse(raw.resultXdr.result().toXDR("base64"));
    }
    console.log('PARSED', parsed)
    return {success:true, result:parsed, txid}
  }
  if ("errorResult" in raw) {
    console.log('ERRRES')
    const parsed = parse(raw.errorResult.result().toXDR("base64"));
    return {success:false, result:parsed, txid, error:'Error sending transaction'}
  }
  if ("errorResultXdr" in raw) {
    console.log('ERRXDR')
    //const parsed = parse(raw.errorResultXdr)
    //const parsed = parse(raw.errorResultXdr.result().toXDR("base64"));
    return {success:false, result:raw, txid, error:'Error sending transaction'}
  }
  if("status" in raw && raw.status=='FAILED'){
    console.error('Transaction failed without a reason')
    return {success:false, result:raw, txid, error:'Transaction failed'}
  }
  // if neither of these are present, something went wrong
  console.error("Don't know how to parse result! Returning full RPC response.")
  return {success:false, result:raw, txid, error:'Error unknown response'}
}

