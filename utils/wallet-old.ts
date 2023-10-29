// ref: https://github.com/stellarterm/stellarterm/blob/dbc8a8f03d8dcf9b522aba40ef43b24dfd7f243b/src/lib/driver/driverInstances/WalletConnectService.js
import * as StellarSdk from 'stellar-sdk';
import WalletConnectClient, { SIGN_CLIENT_EVENTS } from '@walletconnect/sign-client';
import {Web3Modal} from '@web3modal/standalone'

interface Result {
  success?:  boolean
  restored?: boolean
  account?:  string
  network?:  string
  chain?:    string
  topic?:    string
  error?:    string  
}

type AnyResult = Result | Promise<Result>

const PROJECT_ID = '1c355b1d7a1c309308c655178fd0940a';
const AUTH_TYPE = { WALLET_CONNECT: 'wallet-connect' }
const TX_STATUS = { SENT_TO_WALLET_CONNECT: 'sent_to_wallet_connect' }
const UNKNOWN_TYPE = { message:"Unknown type", code:7 }
const USER_DISCONNECTED = { message:"User disconnected", code:6000 }

const METADATA = {
  name: 'Give-Credit',
  description: 'Donations in XLM',
  url: 'https://givecredit.vercel.app',
  icons: ['https://givecredit.vercel.app/logo.png']
};

//const CHAIN_ID = process.env.NEXT_PUBLIC_STELLAR_NETWORK=='mainnet' ? 'stellar:pubnet' : 'stellar:testnet'
const CHAIN_ID = 'stellar:pubnet'
console.log('CHAINID:', CHAIN_ID)

const ALLOWED_METHODS = {
  SIGN: 'stellar_signXDR',
  SIGN_AND_SUBMIT: 'stellar_signAndSubmitXDR'
}

const REQUIRED_NAMESPACES = {
  stellar: {
    chains:  [CHAIN_ID],
    methods: Object.values(ALLOWED_METHODS),
    events:  []
  },
};

export default class WalletConnectService {
  appMeta = null
  client  = null
  session = null
  modal   = null

  constructor() {
    console.log('WC INIT')
  }

  async init():Promise<Result> {
    //if (!this.driver.isOnline) {
    //  this.driver.toastService.error('No connection', 'Internet connection appears to be offline');
    //}
    if (this.client) {
      return null;
    }
    this.client = await WalletConnectClient.init({
      logger: 'debug',
      projectId: PROJECT_ID,
      metadata: METADATA,
    });

    this.listenWalletConnectEvents();

    this.modal = new Web3Modal({
      projectId: PROJECT_ID,
      walletConnectVersion: 2
      //themeVariables: {
      //  '--w3m-font-family': 'Roboto, sans-serif',
      //  '--w3m-accent-color': '#F5841F'
      //}
    })

    if (!this.client.session.length) {
      console.log('NO SESSION')
      return null;
    }

    //const pairings = this.client.pairing.getAll({ active: true })
    const sessions = await this.client.session.getAll(); // get all sessions
    console.log('SESSIONS', sessions)
    // TODO: Get current session?
    this.session = sessions[0]; // get first session
    console.log('SESSION', this.session)

    const [chain, reference, publicKey] = this.session.namespaces.stellar.accounts[0].split(':');
    console.log(chain, reference, publicKey)
    this.appMeta = this.session.peer.metadata;
    //const keypair = StellarSdk.Keypair.fromPublicKey(publicKey);
    //console.log('KEYPAIR', keypair)

    //await this.driver.session.handlers.logIn(keypair, {
    //  authType: AUTH_TYPE.WALLET_CONNECT,
    //});
    return {success:true, restored:true, account:publicKey, network:reference, chain:chain, topic:this.session.topic, error:''}
  }

  clearClient() {
    if (this.client) {
      this.client = null;
    }
  }

  setTheme() {
    if (this.modal) {
      this.modal.setTheme({
        themeMode: "dark",
        themeVariables: {
          "--w3m-font-family": "Roboto, sans-serif",
          "--w3m-accent-color": "#F5841F",
          // ... more styles
        },
      })
    }
  }

  async restoreConnectionIfNeeded() {
    if (this.session) {
      this.client = await WalletConnectClient.init({
        logger: 'debug',
        projectId: PROJECT_ID,
        metadata: METADATA,
      });
    }
  }

  listenWalletConnectEvents() {
    this.client.on(SIGN_CLIENT_EVENTS.session_delete, ({ topic }) => this.onSessionDeleted(topic));
  }

  onSessionDeleted(topic) {
    if (this.session && this.session.topic === topic) {
      this.session = null;
      this.appMeta = null;
      //this.driver.session.handlers.handleLogout();
    }
  }

  async login():Promise<Result> {
    var result = await this.init()
    console.log('LOGIN...', result)

    if (result?.success || result?.restored) {
      console.log('ALREADY LOGGED', result)
      return result
    }

    //if (this.driver.modal.modalName) {
    //  this.driver.modal.handlers.cancel();
    //}

    //if (this.client.pairing.getAll({ active: true }).length > 3) {
    //  const deletePromises = [];
    //  this.client.pairing
    //    .getAll({ active: true })
    //    .slice(0, -3)
    //    .forEach(pairing => {
    //      deletePromises.push(this.client.pairing.delete(pairing.topic, UNKNOWN_TYPE));
    //    });
    //  await Promise.all(deletePromises);
    //}

    //if (this.client.pairing.getAll({ active: true }).length) {
    //  this.driver.modal.handlers.activate('WalletConnectPairingModal', {
    //    pairings: this.client.pairing.getAll({ active: true }).reverse(),
    //    connect: this.connect.bind(this),
    //    deletePairing: this.deletePairing.bind(this),
    //  });
    //  return;
    //}
    console.log('CONNECTING...')
    result = await this.connect(null);
    console.log('RESULT:', result)
    return result
  }

  async deletePairing(topic) {
    await this.client.pairing.delete(topic, UNKNOWN_TYPE);
  }

  async connect(topic):Promise<Result> {
    console.log('TOPIC', topic)
    // check if not online
    // check if already modal
    // chek if already paired

    try {
      var options = {}
      if(topic){
        options = {
          requiredNamespaces: REQUIRED_NAMESPACES,
          pairingTopic: topic,
        }
      } else {
        options = {
          requiredNamespaces: REQUIRED_NAMESPACES
        }
      }
      const { uri, approval } = await this.client.connect(options);
      console.log('URI', uri)
      //if (!pairing) {
      //  this.driver.modal.handlers.activate('WalletConnectQRModal', uri);
      //}

      const open = await this.modal.openModal({ uri, standaloneChains: REQUIRED_NAMESPACES.stellar.chains })
      console.log('Modal opened', open)
      this.session = await approval()
      console.log('Approved')
      console.log('SESSION', this.session)
      // handleApproval(response)  get account, network, etc from response.namespaces.stellar.accounts[0]
      this.modal.closeModal()
      console.log('Closed')
    } catch (e) {
      const errorMessage = e.message === 'rejected' ? 'Connection canceled by the user' : e.message;
      return {error:'Connection canceled by the user'}
    }

    //this.driver.modal.handlers.cancel();
    this.appMeta = this.session.peer.metadata;     
    const [chain, reference, publicKey] = this.session.namespaces.stellar.accounts[0].split(':');
    console.log('PUBLIC KEY', publicKey)
    //const keypair = StellarSdk.Keypair.fromPublicKey(publicKey);
    //console.log('KEYPAIR', keypair)
    const newTopic = this.session.topic
    return {success:true, restored:false, account:publicKey, network:reference, chain:chain, topic:newTopic, error:''}
    //if (pairing) {
    //  this.client.pairing.update(pairing.topic, {
    //    peerMetadata: this.appMeta,
    //  });
    //}
  }

  async logout() {
    console.log('Logging out...')
    if (this.session && this.client) {
      console.log('Disconnecting...')
      await this.client.disconnect({
        topic: this.session.topic,
        reason: USER_DISCONNECTED,
      });
      this.onSessionDeleted(this.session.topic);
    }
  }

  signAndSubmit(xdr, callback) {
    console.log('SIGNANDSUBMIT')

    const options = {
      topic: this.session.topic,
      chainId: CHAIN_ID,
      request: {
        id: 1,
        jsonrpc: '2.0',
        method: ALLOWED_METHODS.SIGN_AND_SUBMIT,
        params: {
          xdr,
        }
      }
    }

    this.client.request(options).then(result=>{
      console.log('SUBMIT RESULT', result)
      callback(result)
    }).catch(ex=>{
      console.log('ERROR', ex)
      callback({error:ex.message})
    })
  }

  async signTx(xdr, callback) {
    console.log('SIGN')

    const options = {
      topic: this.session.topic,
      chainId: CHAIN_ID,
      request: {
        id: 1,
        jsonrpc: '2.0',
        method: ALLOWED_METHODS.SIGN,
        params: {
          xdr,
        }
      }
    }

    this.client.request(options).then(result=>{
      console.log('SIGN RESULT', result)
      callback(result)
    }).catch(ex=>{
      console.log('ERROR', ex)
      callback({error:ex.message})
    })
  }
}