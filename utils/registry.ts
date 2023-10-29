const registryApiUrl = process.env.CFCE_REGISTRY_API_URL
const apiKey = process.env.CFCE_REGISTRY_API_KEY;

type Dictionary = { [key:string]:any }

const fetchRegistry = async (endpoint: string) => {
  try {
    const url = `${registryApiUrl}/${endpoint}`
    console.log('Fetching', url)
    const options = {
      headers: {
        'x-api-key': apiKey,
        'content-type': 'application/json'
      }
    }
    const response = await fetch(url, options)
    const { data } = await response.json()
    return data
  } catch(ex) {
    console.error(ex)
    return {error:ex.message}
  }
}

const postRegistry = async (endpoint: string, body: Dictionary) => {
  try {
    const url = `${registryApiUrl}/${endpoint}`
    console.log('Fetching', url)
    const options = {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify(body)
    }
    const response = await fetch(url, options)
    const result = await response.json()
    return result
  } catch(ex) {
    console.error(ex)
    return {error:ex.message}
  }
}

export const newOrganization = (body: Dictionary) => postRegistry('organizations', body)
export const getOrganizations = () => fetchRegistry('organizations')
export const getOrganizationById = (id: string) => fetchRegistry(`organizations/${id}`)
export const getOrganizationByEmail = (email: string) => fetchRegistry(`organizations?email=${email}`)
export const getOrganizationsByCategory = (categorySlug: string) => fetchRegistry(`organizations?category=${categorySlug}`)
export const getOrganizationsByWallet = (walletAddress: string) => fetchRegistry(`organizations?wallet=${walletAddress}`)
export const getOrganizationsByChain = (chain: string) => fetchRegistry(`organizations?chain=${chain}`)

export const getCategories = () => fetchRegistry('categories')

export const newInitiative = (body: Dictionary) => postRegistry('initiatives', body)
export const getInitiativeById = (id: string) => fetchRegistry(`initiatives/${id}`)
export const getInitiativeByTag = (tag: string) => fetchRegistry(`initiatives?tag=${tag}`)
export const getInitiatives = () => fetchRegistry('initiatives')
export const getInitiativesByOrganization = (id: string) => fetchRegistry(`initiatives?orgid=${id}`)

export const newProvider = (body: Dictionary) => postRegistry('providers', body)
export const getProviderById = (id: string) => fetchRegistry(`providers/${id}`)
export const getProviders = () => fetchRegistry('providers')

export const newCredit = (body: Dictionary) => postRegistry('credits', body)
export const getCreditById = (id: string) => fetchRegistry(`credits/${id}`)
export const getCredits = () => fetchRegistry('credits')
export const getCreditsByInitiative = (id: string) => fetchRegistry(`credits?initid=${id}`)
export const getCreditsByProvider = (id: string) => fetchRegistry(`credits?provid=${id}`)

export const createNFT = (body: Dictionary) => postRegistry('nft', body)
export const getNFTs = (id: string) => fetchRegistry(`nft`)
export const getAllNFTs = (id: string) => fetchRegistry(`nft`)
export const getNFTsByAccount = (id: string) => fetchRegistry(`nft?userid=${id}`)
export const getNFTsByOrganization = (id: string) => fetchRegistry(`nft?orgid=${id}`)

export const newUser = (body: Dictionary) => postRegistry('users', body)
export const getUsers = () => fetchRegistry('users')
export const getUserByWallet = (wallet: string) => fetchRegistry('users?wallet='+wallet)
export const getUserByEmail = (email: string) => fetchRegistry('users?email='+email)
export const getUserById = (id: string) => fetchRegistry('users/'+id)
export const updateUser = (id: string, body: Dictionary) => postRegistry('users/'+id, body)
export const getUserWallets = () => fetchRegistry('userwallets')
export const newUserWallet = (body: Dictionary) => postRegistry('userwallets', body)

export const newEvent = (body: Dictionary) => postRegistry('events', body)
export const getEvents = () => fetchRegistry('events')
export const getEventById = (id: string) => fetchRegistry('events/'+id)
export const getEventsByOrganization = (id: string) => fetchRegistry('events?orgid='+id)
export const getEventsByInitiative = (id: string) => fetchRegistry('events?initid='+id)
