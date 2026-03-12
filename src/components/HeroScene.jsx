import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars, OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import Particles from '../scenes/Particles'
import { useMouseParallax } from '../hooks/useScrollCamera'
import * as THREE from 'three'

function AnimatedGrid() {
  const gridRef = useRef()
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.material.uniforms &&
        (gridRef.current.position.z = (state.clock.elapsedTime * 0.5) % 2)
    }
  })
  return (
    <gridHelper
      ref={gridRef}
      args={[40, 40, '#38bdf8', '#0f172a']}
      position={[0, -4, 0]}
      rotation={[0, 0, 0]}
    />
  )
}

function FloatingOrbs() {
  const orb1 = useRef()
  const orb2 = useRef()
  const orb3 = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (orb1.current) {
      orb1.current.position.x = Math.sin(t * 0.4) * 3
      orb1.current.position.y = Math.cos(t * 0.3) * 1.5 + 0.5
    }
    if (orb2.current) {
      orb2.current.position.x = Math.cos(t * 0.5) * 4 - 1
      orb2.current.position.y = Math.sin(t * 0.4) * 2 - 0.5
    }
    if (orb3.current) {
      orb3.current.position.x = Math.sin(t * 0.3 + 2) * 3.5
      orb3.current.position.y = Math.cos(t * 0.6) * 1 + 1
    }
  })

  return (
    <>
      <mesh ref={orb1} position={[2, 0, -3]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.5} transparent opacity={0.6} />
      </mesh>
      <pointLight ref={orb2} color="#818cf8" intensity={3} distance={6} position={[-3, 1, -2]} />
      <mesh ref={orb2} position={[-3, 1, -2]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={2} transparent opacity={0.5} />
      </mesh>
      <mesh ref={orb3} position={[4, 1, -4]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={2} transparent opacity={0.5} />
      </mesh>
    </>
  )
}

function CameraRig({ mouse }) {
  useFrame((state) => {
    state.camera.position.x += (mouse.x * 2 - state.camera.position.x) * 0.03
    state.camera.position.y += (mouse.y * 1.5 - state.camera.position.y) * 0.03
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function HeroScene() {
  const mouse = useMouseParallax(1.5)

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
    >
      <color attach="background" args={['#030712']} />
      <fog attach="fog" args={['#030712', 15, 35]} />

      <ambientLight intensity={0.15} />
      <pointLight color="#38bdf8" intensity={2} position={[5, 5, 5]} />
      <pointLight color="#818cf8" intensity={1.5} position={[-5, -3, 3]} />

      <Suspense fallback={null}>
        <Stars radius={60} depth={30} count={800} factor={3} saturation={0.5} fade speed={0.5} />
        <Particles count={180} mouse={mouse} />
        <AnimatedGrid />
        <FloatingOrbs />
        <CameraRig mouse={mouse} />
      </Suspense>
    </Canvas>
  )
}