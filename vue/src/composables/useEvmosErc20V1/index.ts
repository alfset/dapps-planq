/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, type UseQueryOptions, useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/vue-query";
import { useClient } from '../useClient';
import type { Ref } from 'vue'

export default function useEvmosErc20V1() {
  const client = useClient();
  const QueryTokenPairs = (query: any, options: any, perPage: number) => {
    const key = { type: 'QueryTokenPairs', query };    
    return useInfiniteQuery([key], ({pageParam = 1}: { pageParam?: number}) => {
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      return  client.EvmosErc20V1.query.queryTokenPairs(query ?? undefined).then( res => ({...res.data,pageParam}) );
    }, {...options,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  const QueryTokenPair = (token: string,  options: any) => {
    const key = { type: 'QueryTokenPair',  token };    
    return useQuery([key], () => {
      const { token } = key
      return  client.EvmosErc20V1.query.queryTokenPair(token).then( res => res.data );
    }, options);
  }
  
  const QueryParams = ( options: any) => {
    const key = { type: 'QueryParams',  };    
    return useQuery([key], () => {
      return  client.EvmosErc20V1.query.queryParams().then( res => res.data );
    }, options);
  }
  
  const MsgConvertCoin = (query: any, options: any) => {
    const key = { type: 'MsgConvertCoin', query };    
    return useQuery([key], () => {
      const {query } = key
      return  client.EvmosErc20V1.query.msgConvertCoin(query ?? undefined).then( res => res.data );
    }, options);
  }
  
  const MsgConvertERC20 = (query: any, options: any) => {
    const key = { type: 'MsgConvertERC20', query };    
    return useQuery([key], () => {
      const {query } = key
      return  client.EvmosErc20V1.query.msgConvertERC20(query ?? undefined).then( res => res.data );
    }, options);
  }
  
  return {QueryTokenPairs,QueryTokenPair,QueryParams,MsgConvertCoin,MsgConvertERC20,
  }
}