import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

function ContactPanel() {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.12
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main panel */}
      <RoundedBox args={[4.5, 2.8, 0.1]} radius={0.12} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#06091a"
          metalness={0.4}
          roughness={0.6}
          emissive="#38bdf8"
          emissiveIntensity={0.03}
          transparent
          opacity={0.9}
        />
      </RoundedBox>

      {/* Top accent */}
      <mesh position={[0, 1.3, 0.06]}>
        <planeGeometry args={[4.3, 0.02]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.7} />
      </mesh>

      {/* Decorative corner dots */}
      {[[-2.0, 1.2], [2.0, 1.2], [-2.0, -1.2], [2.0, -1.2]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.07]}>
          <circleGeometry args={[0.04, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      ))}

      {/* Inner glow border */}
      <RoundedBox args={[4.4, 2.7, 0.08]} radius={0.1} smoothness={4} position={[0, 0, -0.01]}>
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.04} />
      </RoundedBox>

      {/* Ambient light for panel */}
      <pointLight color="#38bdf8" intensity={1.5} distance={5} position={[0, 0, 2]} />
      <pointLight color="#818cf8" intensity={0.8} distance={4} position={[-3, 2, 1]} />
    </group>
  )
}

function FloatingParticlesSmall() {
  const meshRef = useRef()
  const positions = new Float32Array(60 * 3)
  for (let i = 0; i < 60; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 14
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8
  }

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.04
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={60} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#38bdf8" transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

export default function ContactScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ background: '#030712' }}
    >
      <color attach="background" args={['#030712']} />
      <ambientLight intensity={0.2} />

      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
          <ContactPanel />
        </Float>
        <FloatingParticlesSmall />
      </Suspense>
    </Canvas>
  )
}