import nftActions from './actionTypes';

export interface NFToken {
  Flags: number;
  Issuer: string;
  NFTokenID: string;
  NFTokenTaxon: number;
  TransferFee: number;
  URI: string;
  nft_serial: number;
  attributes: [
    {
      name: string;
      amount: {
        issuer: string;
        currency: 'XLM';
        value: number;
      };
    }
  ];
}

export interface NFTList {
  [accountId: string]: {
    [NFTokenId: string]: NFToken;
  };
}

const initialState: NFTList = {};

const nftReducer = (state = initialState, action) => {
  switch (action.type) {
    case nftActions.ADD_NFTS: {
      const { accountID, NFTs } = action.payload;
      console.log({ NFTs });
      const updatedAccount = state[accountID] ? { ...state[accountID] } : {};
      NFTs.forEach((NFT) => {
        updatedAccount[NFT.NFTokenID] = NFT;
      });
      return {
        ...state,
        [accountID]: updatedAccount
      };
    }
    default: {
      return state;
    }
  }
};

export default nftReducer;
