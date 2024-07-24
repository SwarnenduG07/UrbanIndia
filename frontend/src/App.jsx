import { useState } from 'react'
import './App.css'
import TypewriterComponent from 'typewriter-effect'

function App() {

  return (
    <>
      <div className='w-full items-center flex flex-col justify-center h-screen font-bold text-6xl bg-gradient-to-r from-cyan-500 to-blue-500'>

      <TypewriterComponent 
              options={{
                strings: [
                    "FUCK YOU ROBIN"
                ],
                autoStart: true,
                loop: true,
              }}
             />
         
      </div>
        
    </>
  )
}

export default App
