import React, { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function SkillNode({ skill, position, onHover }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const basePos = useRef(new THREE.Vector3(...position))
  const color = new THREE.Color(skill.color)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.position.lerp(basePos.current, 0.05)
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.05
      const targetScale = hovered ? 1.4 * pulse : pulse
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={() => { setHovered(true); onHover(skill); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { setHovered(false); onHover(null); document.body.style.cursor = 'default' }}
    >
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={hovered ? 0.8 : 0.3}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>

      <Text
        position={[0, -0.22, 0]}
        fontSize={0.1}
        color={hovered ? skill.color : '#94a3b8'}
        anchorX="center"
        anchorY="middle"
      >
        {skill.name}
      </Text>

      {hovered && <pointLight color={skill.color} intensity={1.5} distance={1.5} />}
    </group>
  )
}

export default function SkillSphere({ skills }) {
  const groupRef = useRef()
  const [hoveredSkill, setHoveredSkill] = useState(null)

  const positions = useMemo(() => {
    return skills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / skills.length)
      const theta = Math.sqrt(skills.length * Math.PI) * phi
      const r = 2.8
      return [
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi),
      ]
    })
  }, [skills])

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group>
      {/* Core sphere (wireframe) */}
      <mesh>
        <sphereGeometry args={[1.2, 24, 24]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.05} />
      </mesh>

      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.4, 0.008, 8, 128]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.25} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.6, 0.006, 8, 128]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.15} />
      </mesh>

      <group ref={groupRef}>
        {skills.map((skill, i) => (
          <SkillNode
            key={skill.name}
            skill={skill}
            position={positions[i]}
            onHover={setHoveredSkill}
          />
        ))}
      </group>

      {/* Ambient light source */}
      <pointLight color="#38bdf8" intensity={0.5} position={[0, 3, 0]} />
      <pointLight color="#818cf8" intensity={0.3} position={[-3, -2, 2]} />
    </group>
  )
}