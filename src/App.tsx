import { useState } from "react"; // corrected the import
import logo from "/logo.png";
import Header from "./components/header";
import Drop from "./components/drop";
import Model from "./components/model";
import { processFiles } from "./arweave/processFiles.ts";

function App() {
  const [allFiles, setAllFiles] = useState([]);
  const [progress, setProgress] = useState(0); // This will track the upload progress
  const [allFilesUploaded, setAllFilesUploaded] = useState(false); // This will confirm if all files were uploaded successfully
  const [selected, setSelected] = useState("CC0");

  const handleFilesProcessing = async () => {
    await processFiles(allFiles, setProgress, setAllFilesUploaded, selected);
  };

  return (
    <div className="bg-white h-screen p-2 flex flex-col">
      <Header />
      <div className="flex flex-col justify-center items-center flex-grow">
        <div className="flex">
          <a target="_blank" rel="noreferrer">
            <img src={logo} className="logo h-10" alt="Vite logo" />
          </a>
          <h1 className="text-3xl mb-8">UCI Drive</h1>
        </div>
        <Drop allFiles={allFiles} setAllFiles={setAllFiles} />
        <Model selected={selected} setSelected={setSelected} />

        <button
          className="mt-4 bg-custom-dark-grey text-white px-4 py-2 rounded hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={handleFilesProcessing}
        >
          {!allFilesUploaded ? "Upload" : "Uploaded"}
        </button>

        {/* Display confirmation message */}
        {allFilesUploaded && <div>All files uploaded successfully!</div>}
      </div>
    </div>
  );
}

export default App;
