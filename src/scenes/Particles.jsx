import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Particles({ count = 200, mouse }) {
  const meshRef = useRef()
  const time = useRef(0)

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    const palette = [
      new THREE.Color('#38bdf8'),
      new THREE.Color('#818cf8'),
      new THREE.Color('#34d399'),
      new THREE.Color('#e2e8f0'),
    ]

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15

      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b

      sizes[i] = Math.random() * 3 + 1
    }

    return { positions, colors, sizes }
  }, [count])

  useFrame((state, delta) => {
    time.current += delta * 0.3

    if (meshRef.current) {
      const pos = meshRef.current.geometry.attributes.position.array
      for (let i = 0; i < count; i++) {
        const ix = i * 3
        pos[ix + 1] += Math.sin(time.current + i * 0.5) * 0.002
        pos[ix] += Math.cos(time.current * 0.5 + i * 0.3) * 0.001
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true

      // Mouse parallax
      if (mouse) {
        meshRef.current.rotation.x += (mouse.y * 0.3 - meshRef.current.rotation.x) * 0.05
        meshRef.current.rotation.y += (mouse.x * 0.3 - meshRef.current.rotation.y) * 0.05
      }
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}