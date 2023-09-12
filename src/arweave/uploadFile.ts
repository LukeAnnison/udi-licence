import bundlr from "./bundlrSetup.ts";
import { getTokenBalance } from "./wattBalance.ts";

type EncryptedDataType = string | ArrayBuffer | Uint8Array;

const regularTags = {
  Type: "Regular",
  App: "NewLife",
  Version: "1.0.0",
};

const encryptedTags = {
  Type: "Encrypted",
  App: "NewLife",
  Version: "1.0.0",
  Encryption: "LitProtocol",
};

export const uploadFile = async (file: File, selected: string) => {
  const fileContent = await file.text(); // Convert file to text format

  const licence =
    selected === "CC0" ? "" : "yRj4a5KMctX_uOmKWCFJIjmY8DeJcusVk6-HzLiM_t8";

  const wattBalance = await getTokenBalance();

  try {
    const response = await bundlr.upload(fileContent, {
      tags: {
        ...regularTags,
        ContentType: file.type,
        Lisence: licence,
        Watts: wattBalance,
      },
    });
    console.log(response);
    return response; // return the response if the upload is successful
  } catch (error) {
    console.error("Upload failed on first try. Retrying...", error);

    // Retry once
    try {
      const retryResponse = await bundlr.upload(fileContent);
      return retryResponse;
    } catch (retryError) {
      console.error("Upload failed after retry. File:", file.name, retryError);
      throw new Error(`Upload failed for file: ${file.name}`);
    }
  }
};

export const uploadEncryptedData = async (encryptedData: EncryptedDataType) => {
  const packagedData = JSON.stringify(encryptedData);

  const wattBalance = await getTokenBalance();

  try {
    const response = await bundlr.upload(packagedData, {
      tags: encryptedTags,
      Watts: wattBalance,
    });
    console.log(response);
    return response; // return the response if the upload is successful
  } catch (error) {
    console.error("Upload failed on first try. Retrying...", error);

    // Retry once
    try {
      const retryResponse = await bundlr.upload(packagedData);
      return retryResponse;
    } catch (retryError) {
      console.error("Upload failed after retry.", retryError);
      throw new Error("Upload failed after retry.");
    }
  }
};
