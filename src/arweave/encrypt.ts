import * as LitJsSdk from "@lit-protocol/lit-node-client";

export const encryptFile = async (file: File) => {
  const client = new LitJsSdk.LitNodeClient();
  await client.connect();
  window.litNodeClient = client;

  const fileContent = await file.text();
  const chain = "ethereum";
  console.log("likJdSdk", LitJsSdk);
  const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });

  const accessControlConditions = [
    {
      contractAddress: "",
      standardContractType: "",
      chain,
      method: "",
      parameters: [":userAddress"],
      returnValueTest: {
        comparator: "=",
        value: "0x9F09de58B6EC16F8Eaf339e854BBE19672180cD0",
      },
    },
  ];

  const { encryptedString, symmetricKey } =
    await LitJsSdk.encryptString(fileContent);
  const encryptedSymmetricKey = await window.litNodeClient.saveEncryptionKey({
    accessControlConditions,
    symmetricKey,
    authSig,
    chain,
  });

  return {
    encryptedData: encryptedString,
    encryptedSymmetricKey: encryptedSymmetricKey,
    accessControlConditions: accessControlConditions,
  };
};
