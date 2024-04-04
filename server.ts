import { parseAbi } from "viem";
import { client } from "./client";
import { cprvSaleContract } from "./config";

async function handleTokenTransfer() {
  // ... logica da confirmacao do pagamento
  const receiver = "0x"; //deve vir no corpo da confirmacao de pagamento
  const tokenId = ""; //deve vir no corpo da confirmacao de pagamento
  const amount = ""; //deve vir no corpo da confirmacao de pagamento

  /**
   * @notice Precisamos colocar os `fees` para gerar a informacao correta no subgraph
   * @param brCarbono 90% da venda
   * @param topMidia 10% da venda
   * @param price valor total pago
   * @param amount quantia CPRV adquirido
   **/
  const brCarbonoFee = ""; // (amount * price) * 90 / 100
  const topMidiaFee = ""; // (amount * price) - brCarbonoFee

  const { request } = await client.simulateContract({
    address: cprvSaleContract,
    abi: parseAbi([
      "function transferCPRFromCustomPurchase(address,uint256,uint256,uint96,uint96)",
    ]),
    functionName: "transferCPRFromCustomPurchase",
    args: [
      receiver,
      BigInt(tokenId),
      BigInt(amount),
      BigInt(topMidiaFee),
      BigInt(brCarbonoFee),
    ],
  });

  const txHash = await client.writeContract(request);

  // Guardar isso no banco pra historico
  const receipt = {
    txHash,
    receiver,
    tokenId,
    amount,
    date: new Date().toISOString(),
    topMidiaFee,
    brCarbonoFee,
    total: brCarbonoFee + topMidiaFee,
  };
}
handleTokenTransfer().catch((error) => {
  console.log(error);
});
