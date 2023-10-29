import * as StellarSdk from 'stellar-sdk'

export default async function PaymentXDR(source, destin, amount, currency, issuer, memo='') {
  console.log('PAYMENT', source, destin, amount, currency, issuer, memo)
  const horizon = new StellarSdk.Server(process.env.NEXT_PUBLIC_STELLAR_HORIZON)
  const soroban = new StellarSdk.Server(process.env.NEXT_PUBLIC_STELLAR_SOROBAN)
  const account = await horizon.loadAccount(source)
  //const baseFee = await server.fetchBaseFee()
  const network = process.env.NEXT_PUBLIC_STELLAR_PASSPHRASE
  const operation = StellarSdk.Operation.payment({
    destination: destin,
    amount: amount,
    asset: StellarSdk.Asset.native()
  })
  const transaction = new StellarSdk.TransactionBuilder(account, {networkPassphrase: network, fee:StellarSdk.BASE_FEE})
  const tx = transaction.addOperation(operation)
  if(memo) { tx.addMemo(StellarSdk.Memo.text(memo)) }
  const built = tx.setTimeout(120).build()
  const txid  = built.hash().toString('hex')
  const xdr   = built.toXDR()
  //console.log('XDR:', xdr)
  //console.log('HASH:', txid)
  return {txid, xdr}
}