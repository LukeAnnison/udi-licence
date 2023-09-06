import { useState } from 'react'
import logo from '/logo.png'
import Header from './components/header'
import Drop from './components/drop'
import Model from './components/model'

function App() {

  return (
    <div className="bg-white h-screen p-2">
      <Header/>
      <div className="h-full flex flex-col justify-center items-center">
      <div className="flex">
        <a target="_blank">
          <img src={logo} className="logo h-10" alt="Vite logo" />
        </a>
        <h1 className="text-3xl mb-8">
          UCI Drive
        </h1>
      </div>
        <Drop/>
        <Model/>
      </div>

    </div>
  )
}

export default App; 
