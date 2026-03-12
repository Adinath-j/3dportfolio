import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import FloatingCards from '../scenes/FloatingCards'

export default function ProjectsScene({ projects, onSelectProject }) {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 10], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
    >
      <color attach="background" args={['transparent']} />
      <ambientLight intensity={0.15} />
      <pointLight color="#38bdf8" intensity={1.5} position={[5, 5, 5]} />
      <pointLight color="#818cf8" intensity={1} position={[-5, -3, 3]} />
      <pointLight color="#34d399" intensity={0.8} position={[0, -4, 2]} />

      <Suspense fallback={null}>
        <Stars radius={50} depth={20} count={400} factor={2} saturation={0.3} fade speed={0.3} />
        <FloatingCards projects={projects} onSelectProject={onSelectProject} />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(2 * Math.PI) / 3}
      />
    </Canvas>
  )
}