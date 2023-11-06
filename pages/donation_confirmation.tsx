//import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import Page from 'components/page'
import HomeButton from 'components/homebutton'
import Card from 'components/card'

/*
export async function getServerSideProps({query}) {
  console.log('QUERY', query)
  const { ok, chain, txid, nft, nftid, urinft, urimeta } = query
  return {
    props: { ok, chain, txid, nft, nftid, urinft, urimeta }
  }
}
*/

export default function PaymentConfirmation() {
  //console.log('PROPS', props)
  const {
    query: { ok, chain, txid, nft, nftid, urinft, urimeta },
    ...router
  } = useRouter()
  const snftid = decodeURIComponent(nftid?.toString() || '')
  const surinft = decodeURIComponent(urinft?.toString() || '')
  const surimeta = decodeURIComponent(urimeta?.toString() || '')
  console.log('CONFIRM', ok, chain, txid, nft, snftid, surinft, surimeta)
  const isSuccessPayment = (ok=='true')
  //const [message, setMessage] = useState('NFT Minted!')
  const showNFT = nft=='true'

  // NO NFT, don't mint
  if(!showNFT){
    return (
      <Page>
        <div className="relative">
          <HomeButton />
          <Card className="p-6 mx-6">
            <div className="flex flex-col items-center w-full">
              <h1 className="text-center w-full text-2xl font-semibold">
                Payment confirmed!
              </h1>
            </div>
          </Card>
        </div>
      </Page>
    )
  }

  if(isSuccessPayment) {
    const uritmp1 = surinft.toString() || ''
    const uritmp2 = surimeta.toString() || ''
    const parts1  = uritmp1.split(':')
    const parts2  = uritmp2.split(':')
    const cid  = parts1.length>1 ? parts1[1] : ''
    const meta = parts2.length>1 ? parts2[1] : ''
    const nftImage = 'https://ipfs.io/ipfs/'+cid 
    const nftMeta  = 'https://ipfs.io/ipfs/'+meta 
    console.log('CIDS', nftImage, nftMeta)
    return (
      <Page>
        <div className="relative">
          <Card className="p-6 mx-6">
            <div className="flex flex-col items-center w-full">
              <h1 className="text-center w-full text-2xl font-semibold">
                Payment confirmed!
              </h1>
              <span className="text-center w-full text-sky-400">NFT Minted!</span>
              <div className="mt-4">
                <Image className="rounded-xl" src={nftImage} width={300} height={300} alt='NFT image' />
              </div>
              <div className="mt-4">
                <Link href={nftMeta}>NFT Metadata</Link>
              </div>
            </div>
          </Card>
        </div>
      </Page>
    )
  } else {
    router.push(`/donation_failed`);
  }
}
