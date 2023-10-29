import nftActions from './actionTypes';
import { NFTList, NFToken } from './reducer';

const IPFS_URI = 'https://ipfs.filebase.io/ipfs/';
//const IPFS_URI = process.env.IPFS_GATEWAY_URL;
//console.log({IPFS_URI})

export interface TransactionMeta {
  hash: string;
  organization: string;
  wallet: string;
  logo: string;
  ein: string;
  phone: string;
  donor: string; // wallet id
  amount: {
    issuer: string;
    currency: string;
    value: number;
  };
  time: number; // timestamp
  initiative: string;
  tag: number;
  created: Date;
}

export interface NFTokenMeta {
  description: string;
  file: string; // meta, ipfs address
  image: string; // ipfs address
  name: string;
  nftType: string;
  schema: string;
}

export interface NFTokenWithMeta extends NFToken, NFTokenMeta {
  imageURI: string;
  transactionMeta: TransactionMeta;
}

interface NFTokenError extends NFToken {
  error: string;
}

export const addNFTS =
  (accountID: string, NFTs: NFToken[]) => async (dispatch) => {
    const transformNFT = async (
      NFT: NFToken
    ): Promise<NFTokenWithMeta | NFTokenError> => {
      try {
        const decodedURI = NFT.URI;
        //console.log({ decodedURI });
        let url = decodedURI;
        if (decodedURI.startsWith('ipfs:')) {
          let cid = decodedURI.split('ipfs:')[1];
          url = IPFS_URI + cid;
        }
        console.log({ url });
        const apiUrl = '/api/nft/metadata?url=' + url;
        const metaResponse = await fetch(apiUrl); // proxy to get metadata
        const meta = await metaResponse.json();
        //console.log({ meta });
        //const imageURI = `${IPFS_URI}/${meta.image.split('ipfs://')[1]}`;
        let imageURI = meta.image; // assume https:
        if (meta?.image?.startsWith('ipfs:')) {
          let imageCID = meta.image.split('ipfs:')[1];
          imageURI = IPFS_URI + imageCID;
        } else if (meta?.image?.startsWith('Q')) {
          imageURI = IPFS_URI + meta.image;
        }
        //const metadataURI = `${IPFS_URI}/${meta.file.split('ipfs://')[1]}`;
        //const metaDataResponse = await fetch(metadataURI);
        //const metaData = await metaDataResponse.json();
        const metaData = meta;
        //console.log({ metaData });
        return {
          ...NFT,
          ...meta,
          imageURI,
          transactionMeta: metaData
        };
      } catch (ex) {
        console.error(ex);
        return { ...NFT, error: 'Error loading NFT' };
      }
    };
    // transformNFT(NFTs[0]);
    const formattedNFTs = await Promise.all(NFTs.map(transformNFT));
    console.log('nfts: ', formattedNFTs);
    dispatch({
      type: nftActions.ADD_NFTS,
      payload: {
        accountID,
        NFTs: formattedNFTs
      }
    });
  };
