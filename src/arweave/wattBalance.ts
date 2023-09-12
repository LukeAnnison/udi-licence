import { ethers } from "ethers";

export async function getTokenBalance() {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();

    const loggedUserAddresses = await provider.send("eth_requestAccounts");
    const loggedUserAddress = loggedUserAddresses[0];
    console.log("logged in user", loggedUserAddress);

    // ABI for ERC20's balanceOf function
    const erc20Abi = [
      "function balanceOf(address owner) view returns (uint256)",
    ];

    const tokenAddress = "0x935e8f7eace4dd560b2a32918a148a4f5218016c";
    const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, provider);

    const bigNoBalance = await tokenContract.balanceOf(loggedUserAddress);
    const balanceString = bigNoBalance.toString(); // Convert the BigNumber to a string
    const balanceNumber = parseFloat(balanceString); // Convert the string to a JavaScript number

    const balance = balanceNumber / Math.pow(10, 18); // Assuming 18 decimals in the token
    console.log(`Adjusted Token balance for ${loggedUserAddress}:`, balance);
    return balance;
  }
}
