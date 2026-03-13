import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import SkillSphere from '../scenes/SkillSphere'

export default function SkillsScene({ skills }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      frameloop="always"
      style={{ background: '#030712' }}
    >
      <color attach="background" args={['#030712']} />
      <ambientLight intensity={0.2} />
      <pointLight color="#38bdf8" intensity={2} position={[4, 4, 4]} />
      <pointLight color="#818cf8" intensity={1} position={[-4, -3, 2]} />

      <Suspense fallback={null}>
        <SkillSphere skills={skills} />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
      />
    </Canvas>
  )
}