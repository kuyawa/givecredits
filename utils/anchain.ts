import * as constants from '../constants';

//Function to make API call to Anchain to know risk of donor wallet
const validateWalletAddressWithAnchain = async (address: string) => {
  const url = `${constants.ANCHAIN_URL}?proto=${constants.ANCHAIN_RISKSCORE_CURRENCY}&address=${address}&apikey=${process.env.ANCHAIN_API_KEY}`;
  //Making get request API call to ANCHAIN to retrieve risk score
  const response = await fetch(url, {
    method: 'get'
  });
  return await response.json();
};

export { validateWalletAddressWithAnchain };
