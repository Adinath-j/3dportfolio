import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'

export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-[#030712] overflow-x-hidden noise">
      {/* Global ambient orbs — clamped so they never push layout */}
      <div
        className="orb pointer-events-none"
        style={{
          width: 'min(600px, 100vw)',
          height: 'min(600px, 100vw)',
          background: 'rgba(14,165,233,0.07)',
          top: 0,
          left: '25%',
          transform: 'translateX(-50%)',
        }}
      />
      <div
        className="orb pointer-events-none"
        style={{
          width: 'min(400px, 80vw)',
          height: 'min(400px, 80vw)',
          background: 'rgba(99,102,241,0.06)',
          top: '50%',
          right: '-10%',
        }}
      />

      <Navbar />
      <Home />
    </div>
  )
}