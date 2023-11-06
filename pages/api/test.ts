// TEST
//import { newWallet } from 'utils/registry'
//import { getOrganizations } from 'utils/registry'
//import { getOrganizationById } from 'utils/registry'
//import { getOrganizationsByWallet } from 'utils/registry'
//import { getOrganizationsByChain } from 'utils/registry'
import { getNFTsByAccount } from 'utils/registry'
//import { getNFTs } from 'utils/registry'
//import { getInitiativeByTag } from 'utils/registry'
//import mint from 'libs/nft/mint'
//import { createNFT } from 'utils/registry'

export default async function test(req, res) {
  console.log('> api/test')
  //console.log('Params:', req.params)
  //console.log('Body:', req.body)
  // Do something
  //const info = await getOrganizations()
  //const info = await getOrganizationById('64e61a296fd6ba67b0c7ee72')
  //const info = await getOrganizationsByWallet('rudepFBToSRaHKaSADcAoYg4W45NrEuKP')
  //const info = await getOrganizationsByWallet('GBJO624PT3MELDFYNAXT4MVOHA4E3RWPI6DH6KORJGMZDDZEDLNHJ2Y6')
  //const info = await getOrganizationsByChain('Stellar')
  //const info = await getOrganizationsByChain('XRPL')
  const info = await getNFTsByAccount('GAU2AJNUVZ47Q4ZJUVAOQFLN3EE3XJUTV34N2EXGKXRBFZ2MWCN2TZGO')
  //const info = await getNFTs()
  //const info = await getInitiativeByTag('200000')
  //const info = await mint('GAU2AJNUVZ47Q4ZJUVAOQFLN3EE3XJUTV34N2EXGKXRBFZ2MWCN2TZGO', 'ipfs:someuri')
/*
  const info = await createNFT({
    created: '2023-11-06T19:34:43.956Z',
    donorAddress: 'GAU2AJNUVZ47Q4ZJUVAOQFLN3EE3XJUTV34N2EXGKXRBFZ2MWCN2TZGO',
    userId: '654164af2e9b01fd20884859',
    organizationId: '64e15451dbd36186f0f1765b',
    initiativeId: '64e157177bf5d9064eadc075',
    metadataUri: 'ipfs:QmeHdn43hv15r84Nuk44QsiEhjXrzw45qvmqkWXNQeiozp',
    imageUri: 'ipfs:QmciAuEL7wVR8a2b3ow59B5ptmW7z5VjUUpuxVJaUcKzvA',
    coinNetwork: 'futurenet',
    coinSymbol: 'XLM',
    coinLabel: 'Stellar',
    coinValue: '1.0000',
    usdValue: '0.1313',
    tokenId: 'CDHGVKFRG7CFXVKTZGNM7VKEQWZDBLH733FD6AD3SN7JZIRZSHZM5Q2S #62',
    offerId: '',
    status: 0
  })
*/
  console.log('Info:', info)
  res.status(200).setHeader("Content-Type", "text/plain").send(JSON.stringify(info||null,null,2))
  
/*
  const orgId = '636283c22552948fa675473c'
  const data = {
    address:'GBJO624PT3MELDFYNAXT4MVOHA4E3RWPI6DH6KORJGMZDDZEDLNHJ2Y6',
    chain:'Stellar'
  }
  //const url = 'wallets?organizationid='+orgId
  const info = await newWallet(orgId, data)
  console.log('INFO', info)
*/
  //res.status(200).setHeader("Content-Type", "text/plain").send('OK')
  //res.status(204).end()
}
