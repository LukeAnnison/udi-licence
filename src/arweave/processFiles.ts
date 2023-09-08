import { uploadFile, uploadEncryptedData } from "./uploadFile.ts";
import { encryptFile } from "./encrypt.ts";

export const processFiles = async (
  allFiles,
  setProgress,
  setAllFilesUploaded,
  selected,
) => {
  console.log("Starting file processing...");
  const failedFiles = [];

  const uploadPromises = allFiles.map(async (file, index) => {
    console.log(`Processing file: ${file.name}`);

    try {
      if (selected === "Encryption") {
        const encryptedFile = await encryptFile(file);
        await uploadEncryptedData(encryptedFile);
      } else {
        await uploadFile(file);
      }

      console.log(`File uploaded: ${file.name}`);
      setProgress(index + 1);
    } catch (error) {
      console.error(`Error uploading ${file.name}:`, error);
      failedFiles.push(file.name);
    }
  });

  // Await all upload attempts
  await Promise.all(uploadPromises);

  if (failedFiles.length > 0) {
    console.error("The following files failed to upload:", failedFiles);
    // Handle these failed files
  } else {
    console.log("All files uploaded successfully");
    setAllFilesUploaded(true);
  }
};
