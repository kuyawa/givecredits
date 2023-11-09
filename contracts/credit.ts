import * as SorobanClient from 'soroban-client'
import invoke from './invoker'

export const Networks = {
  futurenet: {
    contractId: 'CCYG64O6BJYNT5IZ7ANYNHW4UJ5V2T5XJLRRJMELLSR2W3LHX3PISUKI',
    networkPassphrase: 'Test SDF Future Network ; October 2022',
    rpcUrl: 'https://rpc-futurenet.stellar.org:443'
  },
  testnet: {
    contractId: 'CCYG64O6BJYNT5IZ7ANYNHW4UJ5V2T5XJLRRJMELLSR2W3LHX3PISUKI',
    networkPassphrase: 'Test SDF Network ; September 2015',
    rpcUrl: 'https://soroban-testnet.stellar.org'
  }
};

export class Contract {
  options;
  spec;
  constructor(options) {
    this.options = options;
    this.spec = new SorobanClient.ContractSpec([
      "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAABQAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAppbml0aWF0aXZlAAAAAAAKAAAAAAAAAAhwcm92aWRlcgAAABMAAAAAAAAABmJ1Y2tldAAAAAAACwAAAAAAAAADeGxtAAAAABMAAAAA",
      "AAAAAAAAAAAAAAAGZG9uYXRlAAAAAAACAAAAAAAAAARmcm9tAAAAEwAAAAAAAAAGYW1vdW50AAAAAAALAAAAAA==",
      "AAAAAAAAAAAAAAAIZ2V0QWRtaW4AAAAAAAAAAQAAABM=",
      "AAAAAAAAAAAAAAAKZ2V0QmFsYW5jZQAAAAAAAAAAAAEAAAAL",
      "AAAAAAAAAAAAAAAJZ2V0QnVja2V0AAAAAAAAAAAAAAEAAAAL",
      "AAAAAAAAAAAAAAAHZ2V0RmVlcwAAAAAAAAAAAQAAAAs=",
      "AAAAAAAAAAAAAAANZ2V0SW5pdGlhdGl2ZQAAAAAAAAAAAAABAAAACg==",
      "AAAAAAAAAAAAAAAKZ2V0TWluaW11bQAAAAAAAAAAAAEAAAAL",
      "AAAAAAAAAAAAAAALZ2V0UHJvdmlkZXIAAAAAAAAAAAEAAAAT",
      "AAAAAAAAAAAAAAALZ2V0VHJlYXN1cnkAAAAAAAAAAAEAAAAT",
      "AAAAAAAAAAAAAAAGZ2V0WExNAAAAAAAAAAAAAQAAABM=",
      "AAAAAAAAAAAAAAAIc2V0QWRtaW4AAAABAAAAAAAAAAZuZXd2YWwAAAAAABMAAAAA",
      "AAAAAAAAAAAAAAAJc2V0QnVja2V0AAAAAAAAAQAAAAAAAAAGbmV3dmFsAAAAAAALAAAAAA==",
      "AAAAAAAAAAAAAAAHc2V0RmVlcwAAAAABAAAAAAAAAAZuZXd2YWwAAAAAAAsAAAAA",
      "AAAAAAAAAAAAAAAKc2V0TWluaW11bQAAAAAAAQAAAAAAAAAGbmV3dmFsAAAAAAALAAAAAA==",
      "AAAAAAAAAAAAAAALc2V0UHJvdmlkZXIAAAAAAQAAAAAAAAAGbmV3dmFsAAAAAAATAAAAAA==",
      "AAAAAAAAAAAAAAALc2V0VHJlYXN1cnkAAAAAAQAAAAAAAAAGbmV3dmFsAAAAAAATAAAAAA==",
      "AAAAAAAAAAAAAAAGc2V0WExNAAAAAAABAAAAAAAAAAZuZXd2YWwAAAAAABMAAAAA",
      "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAACQAAAAAAAAAAAAAABUFkbWluAAAAAAAAAAAAAAAAAAAHQmFsYW5jZQAAAAAAAAAAAAAAAAZCdWNrZXQAAAAAAAAAAAAAAAAABEZlZXMAAAAAAAAAAAAAAApJbml0aWF0aXZlAAAAAAAAAAAAAAAAAAdNaW5pbXVtAAAAAAAAAAAAAAAACFByb3ZpZGVyAAAAAAAAAAAAAAAIVHJlYXN1cnkAAAAAAAAAAAAAAANYTE0A"
    ]);
  }
  async initialize({ admin, initiative, provider, bucket, xlm }, options = {}) {
    const res = await invoke({
      method: 'initialize',
      args: this.spec.funcArgsToScVals("initialize", { admin, initiative, provider, bucket, xlm }),
      ...options,
      ...this.options,
      parseResultXdr: () => { },
    });
    return res
  }
  async donate({ from, amount }, options = {}) {
    const res = await invoke({
      method: 'donate',
      args: this.spec.funcArgsToScVals("donate", { from, amount }),
      ...options,
      ...this.options,
      parseResultXdr: () => { },
    });
    return res
  }
  async getAdmin(options = {}) {
    const res = await invoke({
      method: 'getAdmin',
      args: this.spec.funcArgsToScVals("getAdmin", {}),
      ...options,
      ...this.options,
      parseResultXdr: (xdr) => {
        return this.spec.funcResToNative("getAdmin", xdr);
      },
    });
    return res
  }
  async getBalance(options = {}) {
    const res = await invoke({
      method: 'getBalance',
      args: this.spec.funcArgsToScVals("getBalance", {}),
      ...options,
      ...this.options,
      parseResultXdr: (xdr) => {
        return this.spec.funcResToNative("getBalance", xdr);
      },
    });
    return res
  }
  async getBucket(options = {}) {
    const res = await invoke({
      method: 'getBucket',
      args: this.spec.funcArgsToScVals("getBucket", {}),
      ...options,
      ...this.options,
      parseResultXdr: (xdr) => {
        return this.spec.funcResToNative("getBucket", xdr);
      },
    });
    return res
  }
  async getFees(options = {}) {
    const res = await invoke({
      method: 'getFees',
      args: this.spec.funcArgsToScVals("getFees", {}),
      ...options,
      ...this.options,
      parseResultXdr: (xdr) => {
        return this.spec.funcResToNative("getFees", xdr);
      },
    });
    return res
  }
  async getInitiative(options = {}) {
    const res = await invoke({
      method: 'getInitiative',
      args: this.spec.funcArgsToScVals("getInitiative", {}),
      ...options,
      ...this.options,
      parseResultXdr: (xdr) => {
        return this.spec.funcResToNative("getInitiative", xdr);
      },
    });
    return res
  }
  async getMinimum(options = {}) {
    const res = await invoke({
      method: 'getMinimum',
      args: this.spec.funcArgsToScVals("getMinimum", {}),
      ...options,
      ...this.options,
      parseResultXdr: (xdr) => {
        return this.spec.funcResToNative("getMinimum", xdr);
      },
    });
    return res
  }
  async getProvider(options = {}) {
    const res = await invoke({
      method: 'getProvider',
      args: this.spec.funcArgsToScVals("getProvider", {}),
      ...options,
      ...this.options,
      parseResultXdr: (xdr) => {
        return this.spec.funcResToNative("getProvider", xdr);
      },
    });
    return res
  }
  async getTreasury(options = {}) {
    const res = await invoke({
      method: 'getTreasury',
      args: this.spec.funcArgsToScVals("getTreasury", {}),
      ...options,
      ...this.options,
      parseResultXdr: (xdr) => {
        return this.spec.funcResToNative("getTreasury", xdr);
      },
    });
    return res
  }
  async getXlm(options = {}) {
    const res = await invoke({
      method: 'getXLM',
      args: this.spec.funcArgsToScVals("getXLM", {}),
      ...options,
      ...this.options,
      parseResultXdr: (xdr) => {
        return this.spec.funcResToNative("getXLM", xdr);
      },
    });
    return res
  }
  async setAdmin({ newval }, options = {}) {
    const res = await invoke({
      method: 'setAdmin',
      args: this.spec.funcArgsToScVals("setAdmin", { newval }),
      ...options,
      ...this.options,
      parseResultXdr: () => { },
    });
    return res
  }
  async setBucket({ newval }, options = {}) {
    const res = await invoke({
      method: 'setBucket',
      args: this.spec.funcArgsToScVals("setBucket", { newval }),
      ...options,
      ...this.options,
      parseResultXdr: () => { },
    });
    return res
  }
  async setFees({ newval }, options = {}) {
    const res = await invoke({
      method: 'setFees',
      args: this.spec.funcArgsToScVals("setFees", { newval }),
      ...options,
      ...this.options,
      parseResultXdr: () => { },
    });
    return res
  }
  async setMinimum({ newval }, options = {}) {
    const res = await invoke({
      method: 'setMinimum',
      args: this.spec.funcArgsToScVals("setMinimum", { newval }),
      ...options,
      ...this.options,
      parseResultXdr: () => { },
    });
    return res
  }
  async setProvider({ newval }, options = {}) {
    const res = await invoke({
      method: 'setProvider',
      args: this.spec.funcArgsToScVals("setProvider", { newval }),
      ...options,
      ...this.options,
      parseResultXdr: () => { },
    });
    return res
  }
  async setTreasury({ newval }, options = {}) {
    const res = await invoke({
      method: 'setTreasury',
      args: this.spec.funcArgsToScVals("setTreasury", { newval }),
      ...options,
      ...this.options,
      parseResultXdr: () => { },
    });
    return res
  }
  async setXlm({ newval }, options = {}) {
    const res = await invoke({
      method: 'setXLM',
      args: this.spec.funcArgsToScVals("setXLM", { newval }),
      ...options,
      ...this.options,
      parseResultXdr: () => { },
    });
    return res
  }
}
