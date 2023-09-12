import { uploadFile, uploadEncryptedData } from "./uploadFile.ts";
import { encryptFile } from "./encrypt.ts";

export const processFiles = async (
  allFiles: File[],
  setAllFilesUploaded: (success: boolean) => void,
  selected: string,
) => {
  console.log("Starting file processing...");
  const failedFiles: string[] = [];

  const uploadPromises = allFiles.map(async (file) => {
    console.log(`Processing file: ${file.name}`);

    try {
      if (selected === "Encryption") {
        const encryptedFile = await encryptFile(file);
        await uploadEncryptedData(encryptedFile);
      } else {
        await uploadFile(file, selected);
      }

      console.log(`File uploaded: ${file.name}`);
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
