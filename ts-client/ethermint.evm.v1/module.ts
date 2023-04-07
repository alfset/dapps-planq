// Generated by Ignite ignite.com/cli

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient, DeliverTxResponse } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { msgTypes } from './registry';
import { IgniteClient } from "../client"
import { MissingWalletError } from "../helpers"
import { Api } from "./rest";
import { MsgEthereumTx } from "./types/ethermint/evm/v1/tx";

import { Params as typeParams} from "./types"
import { ChainConfig as typeChainConfig} from "./types"
import { State as typeState} from "./types"
import { TransactionLogs as typeTransactionLogs} from "./types"
import { Log as typeLog} from "./types"
import { TxResult as typeTxResult} from "./types"
import { AccessTuple as typeAccessTuple} from "./types"
import { TraceConfig as typeTraceConfig} from "./types"
import { GenesisAccount as typeGenesisAccount} from "./types"
import { QueryTxLogsRequest as typeQueryTxLogsRequest} from "./types"
import { QueryTxLogsResponse as typeQueryTxLogsResponse} from "./types"
import { LegacyTx as typeLegacyTx} from "./types"
import { AccessListTx as typeAccessListTx} from "./types"
import { DynamicFeeTx as typeDynamicFeeTx} from "./types"
import { ExtensionOptionsEthereumTx as typeExtensionOptionsEthereumTx} from "./types"

export { MsgEthereumTx };

type sendMsgEthereumTxParams = {
  value: MsgEthereumTx,
  fee?: StdFee,
  memo?: string
};


type msgEthereumTxParams = {
  value: MsgEthereumTx,
};


export const registry = new Registry(msgTypes);

type Field = {
	name: string;
	type: unknown;
}
function getStructure(template) {
	const structure: {fields: Field[]} = { fields: [] }
	for (let [key, value] of Object.entries(template)) {
		let field = { name: key, type: typeof value }
		structure.fields.push(field)
	}
	return structure
}
const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
	prefix: string
	signer?: OfflineSigner
}

export const txClient = ({ signer, prefix, addr }: TxClientOptions = { addr: "http://localhost:26657", prefix: "cosmos" }) => {

  return {
		
		async sendMsgEthereumTx({ value, fee, memo }: sendMsgEthereumTxParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgEthereumTx: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgEthereumTx({ value: MsgEthereumTx.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgEthereumTx: Could not broadcast Tx: '+ e.message)
			}
		},
		
		
		msgEthereumTx({ value }: msgEthereumTxParams): EncodeObject {
			try {
				return { typeUrl: "/ethermint.evm.v1.MsgEthereumTx", value: MsgEthereumTx.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgEthereumTx: Could not create message: ' + e.message)
			}
		},
		
	}
};

interface QueryClientOptions {
  addr: string
}

export const queryClient = ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseURL: addr });
};

class SDKModule {
	public query: ReturnType<typeof queryClient>;
	public tx: ReturnType<typeof txClient>;
	public structure: Record<string,unknown>;
	public registry: Array<[string, GeneratedType]> = [];

	constructor(client: IgniteClient) {		
	
		this.query = queryClient({ addr: client.env.apiURL });		
		this.updateTX(client);
		this.structure =  {
						Params: getStructure(typeParams.fromPartial({})),
						ChainConfig: getStructure(typeChainConfig.fromPartial({})),
						State: getStructure(typeState.fromPartial({})),
						TransactionLogs: getStructure(typeTransactionLogs.fromPartial({})),
						Log: getStructure(typeLog.fromPartial({})),
						TxResult: getStructure(typeTxResult.fromPartial({})),
						AccessTuple: getStructure(typeAccessTuple.fromPartial({})),
						TraceConfig: getStructure(typeTraceConfig.fromPartial({})),
						GenesisAccount: getStructure(typeGenesisAccount.fromPartial({})),
						QueryTxLogsRequest: getStructure(typeQueryTxLogsRequest.fromPartial({})),
						QueryTxLogsResponse: getStructure(typeQueryTxLogsResponse.fromPartial({})),
						LegacyTx: getStructure(typeLegacyTx.fromPartial({})),
						AccessListTx: getStructure(typeAccessListTx.fromPartial({})),
						DynamicFeeTx: getStructure(typeDynamicFeeTx.fromPartial({})),
						ExtensionOptionsEthereumTx: getStructure(typeExtensionOptionsEthereumTx.fromPartial({})),
						
		};
		client.on('signer-changed',(signer) => {			
		 this.updateTX(client);
		})
	}
	updateTX(client: IgniteClient) {
    const methods = txClient({
        signer: client.signer,
        addr: client.env.rpcURL,
        prefix: client.env.prefix ?? "cosmos",
    })
	
    this.tx = methods;
    for (let m in methods) {
        this.tx[m] = methods[m].bind(this.tx);
    }
	}
};

const Module = (test: IgniteClient) => {
	return {
		module: {
			EthermintEvmV1: new SDKModule(test)
		},
		registry: msgTypes
  }
}
export default Module;