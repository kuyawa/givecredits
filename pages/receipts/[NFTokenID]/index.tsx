import { useRouter } from 'next/router';
//import { useSelector } from 'react-redux';
import Image from 'next/image';

import Page from '/components/page';
import Card from '/components/card';
import Divider from '/components/divider';
//import { sessionOptions } from '/utils/sessionOptions';
//import { getNFTByNFTokenID } from '/redux/nft/selectors';
import moment from 'moment';
import TextRow from '/components/textrow';
import BackButton from '/components/backbutton';
import Session from '/utils/session';

export async function getServerSideProps({ req }){
  const session = Session(req)
  return {
    props: {
      wallet: session?.wallet ?? null
    }
  }
}

export default function ReceiptNFT({ wallet, ...props }) {
  console.log({ wallet, props });
  const router = useRouter();
  const NFTokenID = (typeof router.query.NFTokenID === 'string'
      ? router.query.NFTokenID
      : router.query.NFTokenID[0]
  )
  //const NFT = useSelector((state) =>
  //  getNFTByNFTokenID(state, wallet, NFTokenID)
  //);
  const NFT = {
    NFTokenID:'123345',
    imageURI: '/hands.jpg',
    attributes:[{name:'End Poverty',value:'123'}],
    transactionMeta:{
      time:'2023-01-01T08:30:50',
      organization:'United Nations',
      amount:{
        value:'123',
        currency:'XLM'
      },
      ein:'EIN123456',
      wallet:'r1234567890'
    }
  }

  console.log({ NFTokenID, NFT });
  const {
    imageURI,
    attributes,
    transactionMeta: {
      time,
      organization,
      wallet: orgWallet,
      ein,
      amount: { value, currency }
    }
  } = NFT;
  // const { isLoading } = useFetchNFTs(wallet);
  console.log('select', { NFT });

  return (
    <>
      <Page toolbarTitle="Give XLM" className="w-11/12 md:w-1/2 2xl:w-1/3 md:mt-20 bg-white/25 shadow-3xl backdrop-blur m-auto">
        <BackButton />
        <div className="px-6">
          <Card key={time}>
            <div className="flex flex-col items-center w-full">
              <Image src={imageURI} height={150} width={150} className="mt-5" alt="" />
              <span className="text-slate-50 text-2xl p-6 w-full">
                {attributes[0].name}
              </span>
              <Divider />
              <div className="flex flex-col w-full items-start">
                <TextRow
                  text={moment(time).format('dddd, MMMM DD YYYY')}
                  label="Date"
                  className="px-6 py-3"
                />
                <TextRow
                  text={`${value} ${currency}`}
                  label={'Donation Value'}
                  className="px-6 py-3"
                />
                <TextRow
                  text={organization}
                  label={'Recipient'}
                  className="px-6 py-3"
                />
                <TextRow text={ein} label="EIN" className="px-6 py-3" />
                <TextRow
                  text={orgWallet}
                  label="Organization Wallet"
                  className="px-6 py-3"
                />
              </div>
            </div>
          </Card>
        </div>
      </Page>
    </>
  );
}
