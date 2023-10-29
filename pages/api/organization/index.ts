import { NextApiRequest, NextApiResponse } from 'next'
import { newOrganization } from 'utils/registry'
console.log('neworg',newOrganization)

export default async function addOrganization(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req
  console.log('BODY', body)

  try {
    if (method === 'GET') {
      res.status(405).send(JSON.stringify({error:'Method not allowed'}))
    } else if (method === 'POST') {
      //res.status(501).send(JSON.stringify({error:'Not ready'}))
      const result = await newOrganization(body)
      //console.log('RESULT', result)
      res.status(200).send(JSON.stringify(result))
    } else {
      res.status(405).send(JSON.stringify({error:'Method not allowed'}))
    }
  } catch(ex) {
    console.error(ex)
    res.status(500).send(JSON.stringify({error:ex.message}))
  }
}
