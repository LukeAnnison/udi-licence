import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

function Drop({ allFiles, setAllFiles }) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setAllFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    },
  });

  const files = allFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="cursor-pointer">
      <div {...getRootProps({ className: "dropzone mb-4" })}>
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
      <aside className="mb-4">
        <h4 className="mb-2 text-xl">Files to upload</h4>
        <ul className="bg-white p-4 rounded border">{files}</ul>
      </aside>
    </section>
  );
}

export default Drop;
