import React, { useRef } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#030712] overflow-x-hidden noise">
      {/* Global ambient orbs */}
      <div className="orb w-[600px] h-[600px] bg-sky-500/10 top-0 left-1/4 -translate-x-1/2 pointer-events-none" />
      <div className="orb w-[400px] h-[400px] bg-indigo-500/8 top-1/2 right-0 pointer-events-none" />

      <Navbar />
      <Home />
    </div>
  )
}