import moment from 'moment'
import { NextApiRequest, NextApiResponse } from 'next'
import { sendReceipt } from 'utils/mailgun'
import getRates from 'utils/rates'

export default async function Receipt(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: {
      name,
      email,
      amount,
      currency,
      issuer,
      orgName,
      orgAddress,
      orgEin
    }
  } = req;

  const drops = (amount * 10000000).toString();
  let coins:string|object = drops;
  if (currency && issuer) {
    coins = {
      currency,
      issuer,
      value: amount
    };
  }
  console.log({ coins });

  const usdConversion = await getRates('XLM')
  const xlmAmount = 1*amount
  const usdAmount = xlmAmount * usdConversion
  console.log({usdConversion})
  console.log({xlmAmount})
  console.log({usdAmount})

  const receipt = {
    date: moment().format('MMMM DD, YYYY'),
    donorName: name,
    organizationName: orgName,
    address: orgAddress,
    ein: orgEin,
    coinSymbol: 'XLM',
    coinValue: xlmAmount.toFixed(2),
    usdValue: usdAmount.toFixed(2),
    xrp: xlmAmount.toFixed(2),
    usd: usdAmount.toFixed(2)
  }

  sendReceipt(email, receipt)
  res.status(200).json({success:true})
}
