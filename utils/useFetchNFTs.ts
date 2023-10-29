import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNFTS } from '../redux/nft/actions';
//import useStellar from './useStellar';

const useFetchNFTs = (wallet: string) => {
  let [isLoading, setIsLoading] = useState(true);
  const client = null; //useStellar();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!wallet) return;
    client.ready().then(async () => {
      console.log(window);
      console.log(client.getState());
      const response = await client
        .send({
          command: 'account_nfts',
          account: wallet,
          ledger_index: 'validated'
        })
        .catch((err) => {
          console.warn(err);
          setIsLoading(false);
        });
      console.log({ response });
      if(!response){
        console.log('Stellar Unknown Error')
      } else {
        // TODO: type redux, maybe use toolkit
        // @ts-ignore
        await dispatch(addNFTS(wallet, response.account_nfts)).catch((err) => {
          console.warn(err);
          setIsLoading(false);
        });
      }
      setIsLoading(false);
    });
  }, [wallet]);
  return { isLoading };
};

export default useFetchNFTs;
