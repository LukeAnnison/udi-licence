import { uploadFile } from './uploadFile.ts';

export const processFiles = async (allFiles) => {
  console.log('Starting file processing...');
  const failedFiles = [];
  
  const uploadPromises = allFiles.map(async (file) => {
    console.log(`Processing file: ${file.name}`);
    
    try {
      await uploadFile(file);
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
  }
};
