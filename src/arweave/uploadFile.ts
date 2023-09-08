import bundlr from "./bundlrSetup.ts";

export const uploadFile = async (file) => {
  const fileContent = await file.text(); // Convert file to text format

  try {
    const response = await bundlr.upload(fileContent);
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

export const uploadEncryptedData = async (encryptedData: any) => {
  const packagedData = JSON.stringify(encryptedData);

  console.log("packagedData", packagedData);

  try {
    const response = await bundlr.upload(packagedData);
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
