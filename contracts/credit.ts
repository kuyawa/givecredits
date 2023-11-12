import * as SorobanClient from 'soroban-client'
import {invoke} from 'utils/invokeContractClient'

export const Networks = {
  futurenet: {
    contractId: 'CCHJXOOUDFHM6CKNNQ6ZT3GGVU3UPBDDMYUGOW7CMRYBCEWAAOQNSHQW',
    networkPassphrase: 'Test SDF Future Network ; October 2022',
    rpcUrl: 'https://rpc-futurenet.stellar.org:443'
  },
  testnet: {
    contractId: 'CCHJXOOUDFHM6CKNNQ6ZT3GGVU3UPBDDMYUGOW7CMRYBCEWAAOQNSHQW',
    networkPassphrase: 'Test SDF Network ; September 2015',
    rpcUrl: 'https://soroban-testnet.stellar.org'
  }
};


export class Contract {
  options;
  spec;
  constructor(options) {
    console.log('OPTIONS', options)
    this.options = options;
    this.spec = new SorobanClient.ContractSpec([
      "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAABgAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAppbml0aWF0aXZlAAAAAAAKAAAAAAAAAAhwcm92aWRlcgAAABMAAAAAAAAABnZlbmRvcgAAAAAAEwAAAAAAAAAGYnVja2V0AAAAAAALAAAAAAAAAAN4bG0AAAAAEwAAAAA=",
      "AAAAAAAAAAAAAAAGZG9uYXRlAAAAAAACAAAAAAAAAARmcm9tAAAAEwAAAAAAAAAGYW1vdW50AAAAAAALAAAAAA==",
      "AAAAAAAAAAAAAAAIZ2V0QWRtaW4AAAAAAAAAAQAAABM=",
      "AAAAAAAAAAAAAAAKZ2V0QmFsYW5jZQAAAAAAAAAAAAEAAAAL",
      "AAAAAAAAAAAAAAASZ2V0Q29udHJhY3RCYWxhbmNlAAAAAAAAAAAAAQAAAAs=",
      "AAAAAAAAAAAAAAAJZ2V0QnVja2V0AAAAAAAAAAAAAAEAAAAL",
      "AAAAAAAAAAAAAAAHZ2V0RmVlcwAAAAAAAAAAAQAAAAs=",
      "AAAAAAAAAAAAAAANZ2V0SW5pdGlhdGl2ZQAAAAAAAAAAAAABAAAACg==",
      "AAAAAAAAAAAAAAAKZ2V0TWluaW11bQAAAAAAAAAAAAEAAAAL",
      "AAAAAAAAAAAAAAALZ2V0UHJvdmlkZXIAAAAAAAAAAAEAAAAT",
      "AAAAAAAAAAAAAAAPZ2V0UHJvdmlkZXJGZWVzAAAAAAAAAAABAAAACw==",
      "AAAAAAAAAAAAAAALZ2V0VHJlYXN1cnkAAAAAAAAAAAEAAAAT",
      "AAAAAAAAAAAAAAAJZ2V0VmVuZG9yAAAAAAAAAAAAAAEAAAAT",
      "AAAAAAAAAAAAAAANZ2V0VmVuZG9yRmVlcwAAAAAAAAAAAAABAAAACw==",
      "AAAAAAAAAAAAAAAGZ2V0WExNAAAAAAAAAAAAAQAAABM=",
      "AAAAAAAAAAAAAAAIc2V0QWRtaW4AAAABAAAAAAAAAAZuZXd2YWwAAAAAABMAAAAA",
      "AAAAAAAAAAAAAAAJc2V0QnVja2V0AAAAAAAAAQAAAAAAAAAGbmV3dmFsAAAAAAALAAAAAA==",
      "AAAAAAAAAAAAAAAHc2V0RmVlcwAAAAABAAAAAAAAAAZuZXd2YWwAAAAAAAsAAAAA",
      "AAAAAAAAAAAAAAAKc2V0TWluaW11bQAAAAAAAQAAAAAAAAAGbmV3dmFsAAAAAAALAAAAAA==",
      "AAAAAAAAAAAAAAALc2V0UHJvdmlkZXIAAAAAAQAAAAAAAAAGbmV3dmFsAAAAAAATAAAAAA==",
      "AAAAAAAAAAAAAAAPc2V0UHJvdmlkZXJGZWVzAAAAAAEAAAAAAAAABm5ld3ZhbAAAAAAACwAAAAA=",
      "AAAAAAAAAAAAAAALc2V0VHJlYXN1cnkAAAAAAQAAAAAAAAAGbmV3dmFsAAAAAAATAAAAAA==",
      "AAAAAAAAAAAAAAAJc2V0VmVuZG9yAAAAAAAAAQAAAAAAAAAGbmV3dmFsAAAAAAATAAAAAA==",
      "AAAAAAAAAAAAAAANc2V0VmVuZG9yRmVlcwAAAAAAAAEAAAAAAAAABm5ld3ZhbAAAAAAACwAAAAA=",
      "AAAAAAAAAAAAAAAGc2V0WExNAAAAAAABAAAAAAAAAAZuZXd2YWwAAAAAABMAAAAA",
      "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAADAAAAAAAAAAAAAAABUFkbWluAAAAAAAAAAAAAAAAAAAHQmFsYW5jZQAAAAAAAAAAAAAAAAZCdWNrZXQAAAAAAAAAAAAAAAAABEZlZXMAAAAAAAAAAAAAAApJbml0aWF0aXZlAAAAAAAAAAAAAAAAAAdNaW5pbXVtAAAAAAAAAAAAAAAACFByb3ZpZGVyAAAAAAAAAAAAAAAMUHJvdmlkZXJGZWVzAAAAAAAAAAAAAAAGVmVuZG9yAAAAAAAAAAAAAAAAAApWZW5kb3JGZWVzAAAAAAAAAAAAAAAAAAhUcmVhc3VyeQAAAAAAAAAAAAAAA1hMTQA="
    ]);
  }
  async initialize({ admin, initiative, provider, vendor, bucket, xlm }, options = {}) {
    return await invoke({
      method: 'initialize',
      args: this.spec.funcArgsToScVals("initialize", { admin, initiative, provider, vendor, bucket, xlm }),
      ...options,
      ...this.options,
      parseResultXdr: () => { },
    });
  }
  async donate({ from, amount }, options = {}) {
    console.log('ARGS', from, amount)
    return await invoke({
      method: 'donate',
      args: this.spec.funcArgsToScVals("donate", { from, amount }),
      ...options,
      ...this.options,
      parseResultXdr: (metaXdr) => {
        // TODO: get xdr meta response and parse logs
        //const meta = new SorobanClient.xdr.TransactionMetaV3(metaXdr)
        //console.log('META', meta)
        const meta = new SorobanClient.xdr.TransactionResultMeta(metaXdr)
        console.log('META', meta)
        //const retn = meta.v3().sorobanMeta().returnValue()
        //const evts = meta.v3().sorobanMeta().events()
        //console.log('EVENTS', evts)
        return 'OK'
      },
      parseMeta: true
    });
  }
  async getAdmin(options = {}) {
    return await invoke({
      method: 'getAdmin',
      args: this.spec.funcArgsToScVals("getAdmin", {}),
      ...options,
      ...this.options,
      parseResultXdr: (xdr) => {
        return this.spec.funcResToNative("getAdmin", xdr);
      },
    });
  }
  async getBalance(options = {}) {
    return await invoke({
      method: 'getBalance',
      args: this.spec.funcArgsToScVals("getBalance", {}),
      ...options,
      ...this.options,
      parseResultXdr: (xdr) => {
        return this.spec.funcResToNative("getBalance", xdr);
      },
    });
  }
  async getContractBalance(options = {}) {
    return await invoke({
      method: 'getContractBalance',
      args: this.spec.funcArgsToScVals("getContractBalance", {}),
      ...options,
      ...this.options,
      parseResultXdr: (xdr) => {
        return this.spec.funcResToNative("getContractBalance", xdr);
      },
    });
  }
  async getBucket(options = {}) {
    return await invoke({
      method: 'getBucket',
      args: this.spec.funcArgsToScVals("getBucket", {}),
      ...options,
      ...this.options,
      parseResultXdr: (xdr) => {
        return this.spec.funcResToNative("getBucket", xdr);
      },
    });
  }
  async getFees(options = {}) {
    return await invoke({
      method: 'getFees',
      args: this.spec.funcArgsToScVals("getFees", {}),
      ...options,
      ...this.options,
      parseResultXdr: (xdr) => {
        return this.spec.funcResToNative("getFees", xdr);
      },
    });
  }
  async getInitiative(options = {}) {
    return await invoke({
      method: 'getInitiative',
      args: this.spec.funcArgsToScVals("getInitiative", {}),
      ...options,
      ...this.options,
      parseResultXdr: (xdr) => {
        return this.spec.funcResToNative("getInitiative", xdr);
      },
    });
  }
  async getMinimum(options = {}) {
    return await invoke({
      method: 'getMinimum',
      args: this.spec.funcArgsToScVals("getMinimum", {}),
      ...options,
      ...this.options,
      parseResultXdr: (xdr) => {
        return this.spec.funcResToNative("getMinimum", xdr);
      },
    });
  }
  async getProvider(options = {}) {
    return await invoke({
      method: 'getProvider',
      args: this.spec.funcArgsToScVals("getProvider", {}),
      ...options,
      ...this.options,
      parseResultXdr: (xdr) => {
        return this.spec.funcResToNative("getProvider", xdr);
      },
    });
  }
  async getProviderFees(options = {}) {
    return await invoke({
      method: 'getProviderFees',
      args: this.spec.funcArgsToScVals("getProviderFees", {}),
      ...options,
      ...this.options,
      parseResultXdr: (xdr) => {
        return this.spec.funcResToNative("getProviderFees", xdr);
      },
    });
  }
  async getTreasury(options = {}) {
    return await invoke({
      method: 'getTreasury',
      args: this.spec.funcArgsToScVals("getTreasury", {}),
      ...options,
      ...this.options,
      parseResultXdr: (xdr) => {
        return this.spec.funcResToNative("getTreasury", xdr);
      },
    });
  }
  async getVendor(options = {}) {
    return await invoke({
      method: 'getVendor',
      args: this.spec.funcArgsToScVals("getVendor", {}),
      ...options,
      ...this.options,
      parseResultXdr: (xdr) => {
        return this.spec.funcResToNative("getVendor", xdr);
      },
    });
  }
  async getVendorFees(options = {}) {
    return await invoke({
      method: 'getVendorFees',
      args: this.spec.funcArgsToScVals("getVendorFees", {}),
      ...options,
      ...this.options,
      parseResultXdr: (xdr) => {
        return this.spec.funcResToNative("getVendorFees", xdr);
      },
    });
  }
  async getXlm(options = {}) {
    return await invoke({
      method: 'getXLM',
      args: this.spec.funcArgsToScVals("getXLM", {}),
      ...options,
      ...this.options,
      parseResultXdr: (xdr) => {
        return this.spec.funcResToNative("getXLM", xdr);
      },
    });
  }
  async setAdmin({ newval }, options = {}) {
    return await invoke({
      method: 'setAdmin',
      args: this.spec.funcArgsToScVals("setAdmin", { newval }),
      ...options,
      ...this.options,
      parseResultXdr: () => { },
    });
  }
  async setBucket({ newval }, options = {}) {
    return await invoke({
      method: 'setBucket',
      args: this.spec.funcArgsToScVals("setBucket", { newval }),
      ...options,
      ...this.options,
      parseResultXdr: () => { },
    });
  }
  async setFees({ newval }, options = {}) {
    return await invoke({
      method: 'setFees',
      args: this.spec.funcArgsToScVals("setFees", { newval }),
      ...options,
      ...this.options,
      parseResultXdr: () => { },
    });
  }
  async setMinimum({ newval }, options = {}) {
    return await invoke({
      method: 'setMinimum',
      args: this.spec.funcArgsToScVals("setMinimum", { newval }),
      ...options,
      ...this.options,
      parseResultXdr: () => { },
    });
  }
  async setProvider({ newval }, options = {}) {
    return await invoke({
      method: 'setProvider',
      args: this.spec.funcArgsToScVals("setProvider", { newval }),
      ...options,
      ...this.options,
      parseResultXdr: () => { },
    });
  }
  async setProviderFees({ newval }, options = {}) {
    return await invoke({
      method: 'setProviderFees',
      args: this.spec.funcArgsToScVals("setProviderFees", { newval }),
      ...options,
      ...this.options,
      parseResultXdr: () => { },
    });
  }
  async setTreasury({ newval }, options = {}) {
    return await invoke({
      method: 'setTreasury',
      args: this.spec.funcArgsToScVals("setTreasury", { newval }),
      ...options,
      ...this.options,
      parseResultXdr: () => { },
    });
  }
  async setVendor({ newval }, options = {}) {
    return await invoke({
      method: 'setVendor',
      args: this.spec.funcArgsToScVals("setVendor", { newval }),
      ...options,
      ...this.options,
      parseResultXdr: () => { },
    });
  }
  async setVendorFees({ newval }, options = {}) {
    return await invoke({
      method: 'setVendorFees',
      args: this.spec.funcArgsToScVals("setVendorFees", { newval }),
      ...options,
      ...this.options,
      parseResultXdr: () => { },
    });
  }
  async setXlm({ newval }, options = {}) {
    return await invoke({
      method: 'setXLM',
      args: this.spec.funcArgsToScVals("setXLM", { newval }),
      ...options,
      ...this.options,
      parseResultXdr: () => { },
    });
  }
}

