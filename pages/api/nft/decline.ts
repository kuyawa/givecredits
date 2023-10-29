import { NextApiRequest, NextApiResponse } from 'next'

// NFT DECLINE
export default async function Decline(req:NextApiRequest, res:NextApiResponse){
  return res.status(500).json({success:false, error:'Not ready'})
}