import { NFTokenWithMeta } from './actions';

export const getNFTArray = (state, walletID: string): NFTokenWithMeta[] => {
  const accountNFTs: { [tokenID: string]: NFTokenWithMeta } =
    state.NFTs[walletID];
  console.log({ accountNFTs });
  if (!accountNFTs) return [];
  const NFTArray = Object.keys(accountNFTs)
    .map((key) => accountNFTs[key])
    .sort((a, b) =>
      b.transactionMeta.created < a.transactionMeta.created ? 1 : -1
    ); // sort ascending by time
  console.log({ NFTArray });
  return NFTArray;
};

export const getNFTByNFTokenID = (
  state,
  walletID: string,
  NFTokenID: string
): NFTokenWithMeta => {
  console.log({ state });
  return state.NFTs?.[walletID]?.[NFTokenID];
};
