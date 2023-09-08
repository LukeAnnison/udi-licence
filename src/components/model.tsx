import { useState } from "react";

function Model({ selected, setSelected }) {
  const getDescription = () => {
    switch (selected) {
      case "CC0":
        return "Creative Commons Zero";
      case "UDL":
        return "Universal Data License";
      case "XDL":
        return "Extended Data License";
      case "Encryption":
        return "Encrypted Data";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="w-1/2 flex justify-center bg-custom-grey text-custom-dark-grey p-2 rounded-lg">
        {getDescription()}
      </div>
      <div className="flex mt-4 items-center">
        <span className="mr-4">Data Licensing Model:</span>

        <label className="flex items-center mr-4 cursor-pointer">
          <div className="w-5 h-5 border-2 rounded-full flex justify-center items-center mr-2">
            <input
              type="radio"
              name="license"
              value="CC0"
              checked={selected === "CC0"}
              onChange={() => setSelected("CC0")}
              className="opacity-0 absolute"
            />
            {selected === "CC0" && (
              <div className="w-3 h-3 bg-black rounded-full"></div>
            )}
          </div>
          CC0
        </label>

        <label className="flex items-center mr-4 cursor-pointer">
          <div className="w-5 h-5 border-2 rounded-full flex justify-center items-center mr-2">
            <input
              type="radio"
              name="license"
              value="UDL"
              checked={selected === "UDL"}
              onChange={() => setSelected("UDL")}
              className="opacity-0 absolute"
            />
            {selected === "UDL" && (
              <div className="w-3 h-3 bg-black rounded-full"></div>
            )}
          </div>
          UDL
        </label>

        <label className="flex items-center cursor-pointer">
          <div className="w-5 h-5 border-2 rounded-full flex justify-center items-center mr-2">
            <input
              type="radio"
              name="license"
              value="Encryption"
              checked={selected === "Encryption"}
              onChange={() => setSelected("Encryption")}
              className="opacity-0 absolute"
            />
            {selected === "Encryption" && (
              <div className="w-3 h-3 bg-black rounded-full"></div>
            )}
          </div>
          Encryption
        </label>
      </div>
    </div>
  );
}

export default Model;
