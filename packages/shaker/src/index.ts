import { Api, ApiInterfaces, JsonRpc, RpcInterfaces } from 'eosjs';
import { Signature } from 'eosjs-ecc';
import * as bigi from 'bigi';
import { Greeter } from './greeter';
import { square } from './math';
export * from './greeter';

// tslint:disable-next-line:only-arrow-functions
(function(currentWindow: Window) {
  // execute when load index.js

  // tslint:disable-next-line:no-console
  console.log('hello world' + square(43));
  var si = new Signature(bigi.fromHex(0), bigi.fromHex(1), bigi.fromHex(2));
  // let a = bigi.fromHex(0);

  // assign Greeter to global
  const myWindow = currentWindow as any;
  myWindow.Greeter = Greeter;
  // we can use Greeter , execute following in console
  // var greet = new Greeter('myName');
  // greet.greet();

  return {
    async getAvailableKeys() {
      console.log('get available keys called');
      // Really we should not have to do this again becasue we already got the keys we care about when connect was called. Create a cache.
      return ['keys[0]'];
    },

    async sign(
      signatureProviderArgs: ApiInterfaces.SignatureProviderArgs
    ): Promise<RpcInterfaces.PushTransactionArgs> {
      const rpc = new JsonRpc(
        "network.protocol + '://' + network.host + ':' + network.port"
      );
      var args = {
        rpc: rpc,
        authorityProvider: undefined,
        abiProvider: undefined,
        signatureProvider: this,
        chainId: undefined,
        textEncoder: undefined,
        textDecoder: undefined,
      };
      const api = new Api(args);
      var _txn = await api.deserializeTransactionWithActions(
        signatureProviderArgs.serializedTransaction
      );

      // var ledgerManager = new LedgerDataManager();
      // const ledgerBuffer = await ledgerManager.serialize(signatureProviderArgs.chainId, _txn, api.abiTypes, api);

      // let ledger = new LedgerProxy();
      // let signature = await ledger.sign(ledgerBuffer);

      var signatureArray = ['signature'];

      var respone: RpcInterfaces.PushTransactionArgs = {
        signatures: signatureArray,
        serializedTransaction: signatureProviderArgs.serializedTransaction,
      };

      return respone;
    },
  };
})(window);
