import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgConvertCoin } from "./types/evmos/erc20/v1/tx";
import { MsgConvertERC20 } from "./types/evmos/erc20/v1/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/evmos.erc20.v1.MsgConvertCoin", MsgConvertCoin],
    ["/evmos.erc20.v1.MsgConvertERC20", MsgConvertERC20],
    
];

export { msgTypes }