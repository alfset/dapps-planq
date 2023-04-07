/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, type UseQueryOptions, useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/vue-query";
import { useClient } from '../useClient';
import type { Ref } from 'vue'

export default function useEthermintEvmV1() {
  const client = useClient();
  const QueryAccount = (address: string,  options: any) => {
    const key = { type: 'QueryAccount',  address };    
    return useQuery([key], () => {
      const { address } = key
      return  client.EthermintEvmV1.query.queryAccount(address).then( res => res.data );
    }, options);
  }
  
  const QueryCosmosAccount = (address: string,  options: any) => {
    const key = { type: 'QueryCosmosAccount',  address };    
    return useQuery([key], () => {
      const { address } = key
      return  client.EthermintEvmV1.query.queryCosmosAccount(address).then( res => res.data );
    }, options);
  }
  
  const QueryValidatorAccount = (cons_address: string,  options: any) => {
    const key = { type: 'QueryValidatorAccount',  cons_address };    
    return useQuery([key], () => {
      const { cons_address } = key
      return  client.EthermintEvmV1.query.queryValidatorAccount(cons_address).then( res => res.data );
    }, options);
  }
  
  const QueryBalance = (address: string,  options: any) => {
    const key = { type: 'QueryBalance',  address };    
    return useQuery([key], () => {
      const { address } = key
      return  client.EthermintEvmV1.query.queryBalance(address).then( res => res.data );
    }, options);
  }
  
  const QueryStorage = (address: string, key: string,  options: any) => {
    const key = { type: 'QueryStorage',  address,  key };    
    return useQuery([key], () => {
      const { address,  key } = key
      return  client.EthermintEvmV1.query.queryStorage(address, key).then( res => res.data );
    }, options);
  }
  
  const QueryCode = (address: string,  options: any) => {
    const key = { type: 'QueryCode',  address };    
    return useQuery([key], () => {
      const { address } = key
      return  client.EthermintEvmV1.query.queryCode(address).then( res => res.data );
    }, options);
  }
  
  const QueryParams = ( options: any) => {
    const key = { type: 'QueryParams',  };    
    return useQuery([key], () => {
      return  client.EthermintEvmV1.query.queryParams().then( res => res.data );
    }, options);
  }
  
  const QueryEthCall = (query: any, options: any) => {
    const key = { type: 'QueryEthCall', query };    
    return useQuery([key], () => {
      const {query } = key
      return  client.EthermintEvmV1.query.queryEthCall(query ?? undefined).then( res => res.data );
    }, options);
  }
  
  const QueryEstimateGas = (query: any, options: any) => {
    const key = { type: 'QueryEstimateGas', query };    
    return useQuery([key], () => {
      const {query } = key
      return  client.EthermintEvmV1.query.queryEstimateGas(query ?? undefined).then( res => res.data );
    }, options);
  }
  
  const QueryTraceTx = (query: any, options: any) => {
    const key = { type: 'QueryTraceTx', query };    
    return useQuery([key], () => {
      const {query } = key
      return  client.EthermintEvmV1.query.queryTraceTx(query ?? undefined).then( res => res.data );
    }, options);
  }
  
  const QueryTraceBlock = (query: any, options: any) => {
    const key = { type: 'QueryTraceBlock', query };    
    return useQuery([key], () => {
      const {query } = key
      return  client.EthermintEvmV1.query.queryTraceBlock(query ?? undefined).then( res => res.data );
    }, options);
  }
  
  const QueryBaseFee = ( options: any) => {
    const key = { type: 'QueryBaseFee',  };    
    return useQuery([key], () => {
      return  client.EthermintEvmV1.query.queryBaseFee().then( res => res.data );
    }, options);
  }
  
  const MsgEthereumTx = (query: any, options: any) => {
    const key = { type: 'MsgEthereumTx', query };    
    return useQuery([key], () => {
      const {query } = key
      return  client.EthermintEvmV1.query.msgEthereumTx(query ?? undefined).then( res => res.data );
    }, options);
  }
  
  return {QueryAccount,QueryCosmosAccount,QueryValidatorAccount,QueryBalance,QueryStorage,QueryCode,QueryParams,QueryEthCall,QueryEstimateGas,QueryTraceTx,QueryTraceBlock,QueryBaseFee,MsgEthereumTx,
  }
}