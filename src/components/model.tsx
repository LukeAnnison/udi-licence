import { useState } from 'react'

function Model() {
  const [selected, setSelected] = useState('CC0')

  const getDescription = () => {
    switch (selected) {
      case 'CC0': return 'Creative Commons Zero';
      case 'UDL': return 'Universal Data License';
      case 'XDL': return 'Extended Data License';
      case 'Encryption': return 'Encrypted Data';
      default: return '';
    }
  }

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="w-1/2 flex justify-center bg-custom-grey text-custom-dark-grey p-2 rounded-lg">
        {getDescription()}
      </div>
      <div className="flex mt-4">
        <span className="mr-4">Data Licensing Model:</span>
        <span 
          className={`cursor-pointer ${selected === 'CC0' ? 'text-black' : 'text-custom-dark-grey'}`}
          onClick={() => setSelected('CC0')}
        >
          CC0
        </span>
        <span 
          className={`cursor-pointer ml-4 ${selected === 'UDL' ? 'text-black' : 'text-custom-dark-grey'}`}
          onClick={() => setSelected('UDL')}
        >
          UDL
        </span>
        <span 
          className={`cursor-pointer ml-4 ${selected === 'XDL' ? 'text-black' : 'text-custom-dark-grey'}`}
          onClick={() => setSelected('XDL')}
        >
          XDL
        </span>
        <span 
          className={`cursor-pointer ml-4 ${selected === 'Encryption' ? 'text-black' : 'text-custom-dark-grey'}`}
          onClick={() => setSelected('Encryption')}
        >
          Encryption
        </span>
      </div>
    </div>
  )
}

export default Model;
