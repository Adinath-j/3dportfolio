import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

function ProjectCard({ project, index, total, onSelect }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const time = useRef(Math.random() * Math.PI * 2)

  const angle = (index / total) * Math.PI * 2
  const radius = 4.5
  const baseX = Math.sin(angle) * radius
  const baseZ = Math.cos(angle) * radius

  const targetScale = useRef(new THREE.Vector3(1, 1, 1))

  useFrame((state, delta) => {
    time.current += delta * 0.4
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time.current + index) * 0.25
      groupRef.current.rotation.y += hovered ? 0.01 : 0.003

      targetScale.current.setScalar(hovered ? 1.08 : 1)
      groupRef.current.scale.lerp(targetScale.current, 0.1)
    }
  })

  const accentColor = new THREE.Color(project.color)

  return (
    <group
      ref={groupRef}
      position={[baseX, 0, baseZ]}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default' }}
      onClick={() => onSelect(project)}
    >
      {/* Card base */}
      <RoundedBox args={[2.6, 1.6, 0.08]} radius={0.08} smoothness={4}>
        <meshStandardMaterial
          color={hovered ? '#0a0f1e' : '#060c1a'}
          metalness={0.3}
          roughness={0.7}
          emissive={accentColor}
          emissiveIntensity={hovered ? 0.15 : 0.04}
          transparent
          opacity={0.92}
        />
      </RoundedBox>

      {/* Top accent line */}
      <mesh position={[0, 0.72, 0.05]}>
        <planeGeometry args={[2.4, 0.025]} />
        <meshBasicMaterial color={project.color} transparent opacity={hovered ? 1 : 0.6} />
      </mesh>

      {/* Icon */}
      <Text
        position={[-0.9, 0.35, 0.07]}
        fontSize={0.32}
        anchorX="center"
        anchorY="middle"
      >
        {project.icon}
      </Text>

      {/* Title */}
      <Text
        position={[0.1, 0.35, 0.07]}
        fontSize={0.16}
        color="#e2e8f0"
        anchorX="left"
        anchorY="middle"
        maxWidth={1.5}
      >
        {project.title}
      </Text>

      {/* Tagline */}
      <Text
        position={[0.1, 0.12, 0.07]}
        fontSize={0.085}
        color={project.color}
        anchorX="left"
        anchorY="middle"
        maxWidth={1.5}
      >
        {project.tagline}
      </Text>

      {/* Tech tags */}
      {project.tech.slice(0, 3).map((t, ti) => (
        <group key={t} position={[-0.9 + ti * 0.72, -0.28, 0.07]}>
          <mesh>
            <planeGeometry args={[0.62, 0.18]} />
            <meshBasicMaterial color={project.color} transparent opacity={0.12} />
          </mesh>
          <Text
            fontSize={0.07}
            color={project.color}
            anchorX="center"
            anchorY="middle"
            position={[0, 0, 0.01]}
          >
            {t}
          </Text>
        </group>
      ))}

      {/* Status badge */}
      <Text
        position={[0.85, -0.55, 0.07]}
        fontSize={0.07}
        color={project.color}
        anchorX="right"
        anchorY="middle"
      >
        {`• ${project.status}`}
      </Text>

      {/* Hover glow */}
      {hovered && (
        <pointLight color={project.color} intensity={2} distance={3} position={[0, 0, 1]} />
      )}
    </group>
  )
}

export default function FloatingCards({ projects, onSelectProject }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {projects.map((project, i) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={i}
          total={projects.length}
          onSelect={onSelectProject}
        />
      ))}
    </group>
  )
}