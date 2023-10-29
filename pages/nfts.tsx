import Image from 'next/image'
import Link from 'next/link'
import Page from 'components/Page'
import Card from 'components/Card'
import BackButton from 'components/BackButton'
import { getNFTsByAccount } from 'utils/registry'
import { getCookie } from 'cookies-next'

export async function getServerSideProps(context) {
  const { req, res, query } = context
  //console.log({ context })
  //console.log('Cookies', req.cookies)
  let { wallet } = query
  if (!wallet) {
    //wallet = context.cookies?.wallet||null
    wallet = getCookie('wallet', { req, res }) ?? null // check cookies just in case
  }
  console.log('Wallet:', wallet)
  const NFTs = await getNFTsByAccount(wallet) || []
  //console.log({ NFTs })
  return {
    props: { wallet, NFTs }
  }
}

export default function ViewNFTs(props) {
  const { wallet, NFTs } = props
  const gateway = 'https://ipfs.io/ipfs/'
  const defaultImage = '/hands.jpg'

  if (!wallet) {
    return (
      <Page>
        <BackButton />
        <div className="px-6">
          <div className="flex flex-col items-center w-full">
            <p>Wallet not connected</p>
          </div>
        </div>
      </Page>
    )
  }

  if (NFTs?.length == 0) {
    return (
      <Page>
        <BackButton />
        <div className="px-6">
          <div className="flex flex-col items-center w-full">
            <p>No NFTs found</p>
          </div>
        </div>
      </Page>
    )
  }

  return (
    <Page>
      <BackButton />
      <h1 className="text-center text-4xl mb-6">Your NFTs</h1>
      {NFTs.map((item) => {
        //let nftImage = defaultImage
        let nftImage = item.initiative?.defaultAsset || item.organization?.image || defaultImage
        if(item.imageUri){
          if(item.imageUri.startsWith('http')){
            nftImage = item.imageUri
          } else if(item.imageUri.startsWith('ipfs:')){
            nftImage = gateway + item.imageUri.substr(5)
          } else {
            //
          }
        }
        const impactUrl = item.initiative?.id ? '/impact/'+item.initiative?.id : null

        return (
          <Card key={item.tokenId} onClick={() => null}>
            <div className="flex flex-row justify-between items-center w-full">
              <div className="flex flex-col justify-center items-center p-6">
                <Image src={nftImage} width={300} height={300} alt="imageUri" />
              </div>
              <div className="flex flex-col justify-start items-start text-slate-50 text-2xl p-6 w-full">
                <small className="text-sm text-slate-400">{new Date(item.created).toLocaleString()}</small>
                <h1 className="text-xl">{item.organization.name}</h1>
                <h2 className="text-xl text-slate-400">{item.initiative?.title || 'A Happy Donation'}</h2>
                <h3 className="text-base">{impactUrl ? <Link className="text-slate-400" href={impactUrl} target="_blank">See the impact storyline &raquo;</Link> : <>No Impact storyline yet</>}</h3>
                <h3 className="text-base">Thank you for your donation</h3>
                <small className="text-base">{item.coinValue} {item.coinSymbol} • {item.usdValue} USD</small>
              </div>
            </div>
          </Card>
        )})}
      <h1 className="text-center text-xl mb-6">You have received {NFTs?.length || 0} NFT{NFTs?.length==1 ? '' : 's'}</h1>
    </Page>
  )
}
