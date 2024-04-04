import { createWalletClient, publicActions } from "viem";
import { account, transport, chain } from "./config";

export const client = createWalletClient({
  account,
  transport,
  chain,
}).extend(publicActions);
