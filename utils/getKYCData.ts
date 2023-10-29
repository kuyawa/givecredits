//Function to make API call to retrieve kyc data.
const getKYCData = async (address: string) => {
  return false
  if(address != null){
    const url = `https://example.com/api/v1/platform/account-meta/${address}`
    const accountData = await fetch(url, {method: 'get'})
    const responseData = await accountData.json()
    if(responseData?.globalid?.linked){
      return true
    }else{
      return false
    }
  }
  }

export { getKYCData };
