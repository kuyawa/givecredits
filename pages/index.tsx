import Link  from 'next/link'
import Page  from 'components/page'
import Card  from 'components/card'
import Tile  from 'components/tile'
import Image from 'next/image'
//import Button from '../components/button'

export default function Home() {
  return (
    <>
      <Page>
        <div className="mb-6 text-center">
          <h1 className="text-4xl">Be the change!</h1>
          Donate to causes you believe in with XLM, save the
          world retiring carbon credits, get limited edition NFTs, and reduce tax liability
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Tile 
            text="Donate"
            icon="volunteer_activism"
            href="/organizations"
          />
          <Link href="/organizations/04340418-765d-48ab-af36-512a66c960b4">
            <Card className="h-full p-4">
              <div className="h-full w-full flex flex-col justify-between items-center">
                <Image
                  src="/media/publicnode.png"
                  alt="Public Node"
                  width={200}
                  height={120}
                  className="mt-4"
                />
                <h4 className="self-center font-bold uppercase">Featured</h4>
              </div>
            </Card>
          </Link>
          <Tile text="Receipts" icon="receipt_long" href="/receipts" />
          <Tile text="My NFTS" icon="collections" href="/nfts" />
        </div>
        <div className="mt-5">
          <div className="text-center">
            {/*<button id="login" onClick={onLogin}>Login with Lobstr wallet</button>*/}
            {/*<button id="logout" onClick={onLogout} className="hidden mx-auto">Logout</button>*/}
          </div>
          <div className="text-center ">
            <p className="text-xl">We use Freighter wallet for Soroban Network</p>
            <li className="list-none">
              {/*<Link href={'https://lobstr.co'} target="_blank">Lobstr</Link> • <Link href={'https://xbull.app'} target="_blank">xBull</Link> • <Link href={'https://trustwallet.com'} target="_blank">TrustWallet</Link>*/}
              Download <Link href={'https://www.freighter.app/'} target="_blank">Freighter</Link> wallet
            </li>
            <p className="text-sm text-slate-400 mt-4">You will need to have XLM in a wallet that supports Soroban Network, such as Freighter.  Freighter is a secure, non-custodial, end-to-end encrypted, blockchain wallet. You can learn more in their website.</p>
          </div>
        </div>
      </Page>
    </>
  )
}
