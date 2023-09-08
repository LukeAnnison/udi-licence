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

