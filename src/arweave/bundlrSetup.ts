import { WebBundlr } from "@bundlr-network/client";
import { ethers, parseEther } from "ethers";
import BigNumber from "bignumber.js";
 
const provider = new ethers.BrowserProvider(window.ethereum);
 
provider.getGasPrice = async () => {
	const gp = +((await provider.getFeeData()).gasPrice?.toString() ?? 0);
	console.log("getGasPrice", gp, typeof gp);
	return gp;
};
 
const e = provider.estimateGas.bind(provider);
provider.estimateGas = async (tx) => {
	const est = +((await e(tx))?.toString() ?? 0);
	return { mul: (n) => +est * +n };
};
 
const signer = await provider.getSigner();
 
signer.estimateGas = e;
signer.getGasPrice = provider.getGasPrice;
provider.getSigner = () => signer;
 
signer._signTypedData = (domain, types, value) => signer.signTypedData(domain, types, value);
 
const bundlr = new WebBundlr("https://node2.bundlr.network", "ethereum", provider, {
	providerUrl: "https://rpc-mumbai.maticvigil.com/",
});
 
bundlr.currencyConfig.createTx = async (amount, to) => {
	const estimatedGas = await signer.estimateGas({ to, from: bundlr.address, amount });
	const gasPrice = await signer.getGasPrice();
	const txr = await signer.populateTransaction({
		// eslint-disable-next-line no-undef
		to,
		from: bundlr.address,
		value: BigInt(amount),
		gasPrice,
		gasLimit: estimatedGas,
	});
	return { txId: undefined, tx: txr };
};
 
bundlr.currencyConfig.getTx = async function (txId: string): Promise<Tx> {
	const provider = this.providerInstance;
	const response = await provider.getTransaction(txId);
 
	if (!response) throw new Error("Tx doesn't exist");
	if (!response.to) throw new Error(`Unable to resolve transactions ${txId} receiver`);
 
	return {
		from: response.from,
		to: response.to,
		blockHeight: response.blockNumber ? new BigNumber(response.blockNumber) : undefined,
		amount: new BigNumber(response.value),
		pending: response.blockNumber ? false : true,
		confirmed: response.confirmations >= this.minConfirm,
	};
};
await bundlr.ready();

export default bundlr;

export const fundNode = async (amountInEth: number) => {
  try {
    // Convert the amount to Wei
    const amountInWei = parseEther(amountInEth.toString());

    // Estimate gas price and limit
    const gasPrice = await signer.getGasPrice();
    const estimatedGas = await signer.estimateGas({
      to: bundlr.address,
      value: amountInWei
    });

    // Construct the transaction
    const tx = {
      to: bundlr.address,
      value: amountInWei,
      gasPrice: gasPrice,
      gasLimit: estimatedGas
    };

    // Send the transaction
    const txResponse = await signer.sendTransaction(tx);
    const receipt = await txResponse.wait();

    console.log("Transaction was successful:", receipt);
    return receipt;
  } catch (error) {
    console.error("Failed to fund the node:", error);
    throw error;
  }
};

