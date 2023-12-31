const SorobanClient = require('soroban-client')
//import * as SorobanClient from 'soroban-client'
//import {assembleTransaction, Contract, Keypair, Server, SorobanRpc, TransactionBuilder, TimeoutInfinite} from 'soroban-client'

async function sendTx(tx, secondsToWait, server) {
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
    await new Promise((resolve) => setTimeout(resolve, waitTime))
    waitTime = waitTime * exponentialFactor
    getTransactionResponse = await server.getTransaction(txid)
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

export default async function invoke({ method, args = [], fee = 100, responseType, parseResultXdr, secondsToWait = 30, rpcUrl, networkPassphrase, contractId, wallet, parseMeta=false}) {
  console.log('INVOKE', JSON.stringify({ method, args, fee, responseType, parseResultXdr, secondsToWait, rpcUrl, networkPassphrase, contractId, wallet }, null, 2))
  let parse = parseResultXdr
  const server = new SorobanClient.Server(rpcUrl, {allowHttp: rpcUrl.startsWith("http://")})
  const signer = SorobanClient.Keypair.fromSecret(process.env.CFCE_MINTER_WALLET_SECRET)
  const pubkey = signer.publicKey()
  console.log('Signer', pubkey)
  const account = await server.getAccount(pubkey)
  console.log('Account', account)
  const contract = new SorobanClient.Contract(contractId)
  let tx = new SorobanClient.TransactionBuilder(account, {fee: fee.toString(10), networkPassphrase})
    .addOperation(contract.call(method, ...args))
    .setTimeout(SorobanClient.TimeoutInfinite)
    .build()
  console.log('TX', tx)
  const simulated = await server.simulateTransaction(tx)
  console.log('SIM', simulated)
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
    throw new Error('Multiple auths not yet supported')
  }
  const txr = SorobanClient.assembleTransaction(tx, networkPassphrase, simulated).build()
  console.log('TXR', txr)
  txr.sign(signer)
  //const txs = txr.sign(signer)
  //const sendTransactionResponse = await server.sendTransaction(txr)
  //console.log('RES', sendTransactionResponse)
  //const ok = sendTransactionResponse?.status=='SUCCESS'
  //return {success:ok, result:sendTransactionResponse, txid:sendTransactionResponse.hash}
  //--------
  const secsToWait = 60
  const {raw, txid} = await sendTx(txr, secsToWait, server)
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
      return {success:false, result:raw, txid}
    }
    //console.log('ENV', raw.envelopeXdr.toXDR("base64"))
    //console.log('RES', raw.resultXdr.toXDR("base64"))
    //console.log('MET', raw.resultMetaXdr.toXDR("base64"))
    //const env  = new SorobanClient.xdr.TransactionEnvelope(raw.envelopeXdr)
    //console.log('RES')
    //const res  = new SorobanClient.xdr.TransactionResult(raw.resultXdr)
    //const meta = new SorobanClient.xdr.TransactionResultMeta(raw.resultMetaXdr)
    //const meta = new SorobanClient.xdr.TransactionMetaV3(raw.resultMetaXdr)
    let parsed = {}
    if(parseMeta){
      parsed = parse(raw.resultMetaXdr)
      //parsed = parse(raw.resultMetaXdr.result().toXDR("base64"))
    } else {
      parsed = parse(raw.resultXdr.result().toXDR("base64"))
    }
    console.log('PARSED', parsed)
    return {success:true, result:parsed, txid}
  }
  // otherwise, it returned the result of `sendTransaction`
  if ("errorResult" in raw) {
    console.log('ERRRES')
    const parsed = parse(raw.errorResult.result().toXDR("base64"))
    return {success:false, result:parsed, txid, error:'Error sending transaction'}
  }
  if ("errorResultXdr" in raw) {
    console.log('ERRXDR')
    return {success:false, result:raw, txid, error:'Error sending transaction'}
    //return parse(raw.errorResultXdr)
  }
  if("status" in raw && raw.status=='FAILED'){
    console.error('Transaction failed without a reason')
    return {success:false, result:raw, txid, error:'Transaction failed'}
  }
  // if neither of these are present, something went wrong
  console.error("Don't know how to parse result! Returning full RPC response.")
  return {success:false, result:raw, txid, error:'Error unknown response'}
}


