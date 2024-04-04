import { privateKeyToAccount } from "viem/accounts";
import { Address, http } from "viem";
import { polygon, polygonMumbai } from "viem/chains";
import { config } from "dotenv";
config();

// TODO configurar ambeinte de dev
export const cprvSaleContract = process.env.CPRV_SALE_CONTRACT as Address;

export const account = privateKeyToAccount(
  process.env.ACCOUNT_PRIVATE_KEY as Address
);

export const transport = http(process.env.ALCHEMY_API_URL);

export const chain =
  process.env.NODE_ENV === "production" ? polygon : polygonMumbai;
