import { useState } from 'react'
import './App.css'
import TypewriterComponent from 'typewriter-effect'
import { Button } from './components/ui/button'
import { Card } from './components/ui/card'

function App() {

  return (
  
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
     
     
             <div>
                 <Button variant = "premium" onClick={() => {
                      alert("Fuck Me more I am getting fun o yeaa!")
                 }}>
                   FUCK ROBIN VERY HARD
                 </Button>
             </div>
             
         
      </div>
        
    
  )
}

export default App
