
import { useState } from 'react' // corrected the import
import logo from '/logo.png'
import Header from './components/header'
import Drop from './components/drop'
import Model from './components/model'
import { processFiles } from './arweave/processFiles.ts';

function App() {
  const [allFiles, setAllFiles] = useState([]);

  return (
      <div className="bg-white h-screen p-2 flex flex-col">
        <Header/>
        <div className="flex flex-col justify-center items-center flex-grow">
        <div className="flex">
          <a target="_blank" rel="noreferrer">
            <img src={logo} className="logo h-10" alt="Vite logo" />
          </a>
          <h1 className="text-3xl mb-8">
            UCI Drive
          </h1>
        </div>
          <Drop allFiles={allFiles} setAllFiles={setAllFiles}/>
          <Model/>
          <button 
              onClick={() => processFiles(allFiles)}
              className="mt-4 bg-custom-dark-grey text-white px-4 py-2 rounded hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Upload Files
          </button>
        </div>
      </div>
  )
}

export default App;
