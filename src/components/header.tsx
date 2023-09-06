import { useState } from 'react'

function Header() {
  const [selected, setSelected] = useState('Upload')

  return (
    <div className="flex justify-start">
      <h1 
        className={`text-2xl cursor-pointer ${selected === 'Apply' ? 'text-black' : 'text-custom-dark-grey'}`} 
        onClick={() => setSelected('Apply')}
      >
        Apply
      </h1>
      <h1 
        className={`text-2xl ml-2 cursor-pointer ${selected === 'Upload' ? 'text-black' : 'text-custom-dark-grey'}`} 
        onClick={() => setSelected('Upload')}
      >
        Upload
      </h1>
      <h1 
        className={`text-2xl ml-2 cursor-pointer ${selected === 'Earn' ? 'text-black' : 'text-custom-dark-grey'}`} 
        onClick={() => setSelected('Earn')}
      >
        Earn
      </h1>
    </div>
  )
}

export default Header;
