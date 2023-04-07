const apiURL = import.meta.env.VITE_API_COSMOS ?? "https://rest.planq.network:443";
const rpcURL = import.meta.env.VITE_WS_TENDERMINT ?? "https://rpc.planq.network:443";
const prefix = import.meta.env.VITE_ADDRESS_PREFIX ?? "planq";

export const env = {
  apiURL,
  rpcURL,
  prefix,
};
