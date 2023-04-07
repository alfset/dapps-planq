/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, type UseQueryOptions, useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/vue-query";
import { useClient } from '../useClient';
import type { Ref } from 'vue'

export default function useEthermintFeemarketV1() {
  const client = useClient();
  const QueryParams = ( options: any) => {
    const key = { type: 'QueryParams',  };    
    return useQuery([key], () => {
      return  client.EthermintFeemarketV1.query.queryParams().then( res => res.data );
    }, options);
  }
  
  const QueryBaseFee = ( options: any) => {
    const key = { type: 'QueryBaseFee',  };    
    return useQuery([key], () => {
      return  client.EthermintFeemarketV1.query.queryBaseFee().then( res => res.data );
    }, options);
  }
  
  const QueryBlockGas = ( options: any) => {
    const key = { type: 'QueryBlockGas',  };    
    return useQuery([key], () => {
      return  client.EthermintFeemarketV1.query.queryBlockGas().then( res => res.data );
    }, options);
  }
  
  return {QueryParams,QueryBaseFee,QueryBlockGas,
  }
}