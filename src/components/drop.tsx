import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

function Drop() {
  const [allFiles, setAllFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setAllFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    },
  });

  useEffect(() => {
    console.log(allFiles);
  }, [allFiles]);

  const files = allFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="cursor-pointer">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <div className="flex flex-col border-2 rounded-lg border-dashed bg-custom-grey px-20 py-10">
          <h1 className="text-custom-dark-grey text-2xl ml-2">
            Drag and Drop your
          </h1>
          <h1 className="text-custom-dark-grey text-2xl ml-2">
            Files here to Upload
          </h1>
        </div>
      </div>
      <aside>
        <h4>Uploaded files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  )
}

export default Drop;
