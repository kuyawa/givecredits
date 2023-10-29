import { NextApiRequest, NextApiResponse } from 'next'

// NFT ACCEPT
export default async function Accept(req:NextApiRequest, res:NextApiResponse){
  return res.status(500).json({success:false, error:'Not ready'})
}