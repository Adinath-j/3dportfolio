import React, { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import HeroScene from '../components/HeroScene'
import SkillsScene from '../components/SkillsScene'
import ProjectsScene from '../components/ProjectsScene'
import ContactScene from '../components/ContactScene'
import { projects } from '../data/projects'
import { skills, skillCategories } from '../data/skills'
import { useLazyCanvas } from '../hooks/useLazyCanvas'

// ─── Reusable section heading ────────────────────────────────────────────────
function SectionHeading({ label, title, subtitle }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref} className="text-center mb-10 sm:mb-14 px-4">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="font-mono text-[10px] sm:text-xs text-sky-400 tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-3"
      >
        {label}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4 leading-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed px-2"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

// ─── Project Modal ────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  if (!project) return null
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative glass rounded-t-3xl sm:rounded-2xl p-6 sm:p-8 w-full sm:max-w-lg z-10 overflow-hidden max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          style={{ borderColor: project.color + '30' }}
        >
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ boxShadow: `inset 0 0 60px ${project.glowColor}` }}
          />

          {/* Drag handle on mobile */}
          <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-5 sm:hidden" />

          <div className="flex items-start justify-between mb-5 gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl shrink-0"
                style={{ background: project.color + '18', border: `1px solid ${project.color}40` }}
              >
                {project.icon}
              </div>
              <div className="min-w-0">
                <h3 className="font-display font-bold text-lg sm:text-2xl text-white leading-tight">{project.title}</h3>
                <p className="text-xs sm:text-sm font-mono mt-0.5 truncate" style={{ color: project.color }}>{project.tagline}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors shrink-0"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-mono border" style={{ color: project.color, borderColor: project.color + '40', background: project.color + '12' }}>
              ● {project.status}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono border border-slate-700 text-slate-400">
              {project.year}
            </span>
          </div>

          <p className="text-slate-300 leading-relaxed mb-5 text-sm">{project.description}</p>

          <div>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono"
                  style={{ background: project.color + '15', border: `1px solid ${project.color}30`, color: project.color }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="canvas-container">
        <HeroScene />
      </div>

      {/* Full-width overlay so text is always centered */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-5"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-sky-400/20 text-sky-400 text-xs sm:text-sm font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extrabold text-white leading-none mb-3 text-glow"
          style={{ fontSize: 'clamp(3rem, 13vw, 8.5rem)' }}
        >
          Adinath
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-mono text-sky-400/80 text-xs sm:text-sm md:text-base tracking-[0.12em] sm:tracking-[0.2em] uppercase mb-5 sm:mb-6"
        >
          Software Engineer · Generative AI Developer
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-slate-400 w-full max-w-sm sm:max-w-lg mx-auto text-sm sm:text-base leading-relaxed mb-8 sm:mb-10"
        >
          Building intelligent systems at the intersection of{' '}
          <span className="text-sky-400">large language models</span>,{' '}
          <span className="text-indigo-400">ML infrastructure</span>, and{' '}
          <span className="text-emerald-400">developer tooling</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs sm:max-w-none pointer-events-auto"
        >
          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-sky-400/15 border border-sky-400/35 text-sky-400 font-mono text-sm font-semibold hover:bg-sky-400/25 hover:border-sky-400/60 transition-all duration-300 glow-cyan"
          >
            View Projects →
          </button>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/8 border border-white/15 text-slate-200 font-mono text-sm font-semibold hover:bg-white/14 hover:border-white/25 transition-all duration-300"
          >
            Get in Touch
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] sm:text-xs text-slate-600 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 sm:h-10 bg-gradient-to-b from-sky-400/60 to-transparent animate-pulse" />
      </motion.div>
    </section>
  )
}

// ─── About Section ─────────────────────────────────────────────────────────────
function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const stats = [
    { label: 'Years Experience', value: '3+' },
    { label: 'Projects Built', value: '20+' },
    { label: 'AI Models Deployed', value: '10+' },
    { label: 'Open Source Commits', value: '500+' },
  ]

  return (
    <section id="about" className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden w-full">
      <div
        className="orb pointer-events-none absolute"
        style={{
          width: 'min(400px, 80vw)',
          height: 'min(400px, 80vw)',
          background: 'rgba(99,102,241,0.05)',
          top: '50%',
          right: '-15%',
          transform: 'translateY(-50%)',
        }}
      />

      <div className="max-w-6xl mx-auto w-full" ref={ref}>
        <SectionHeading label="01 — Who I Am" title="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex justify-center order-1 lg:order-none"
          >
            <div className="relative w-52 h-52 sm:w-64 sm:h-64">
              <div className="absolute inset-0 rounded-full border border-sky-400/20 animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute inset-4 rounded-full border border-indigo-400/15 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
              <div className="absolute inset-8 rounded-full glass border border-sky-400/25 flex flex-col items-center justify-center gap-1">
                <div className="text-4xl sm:text-5xl">🤖</div>
                <p className="font-mono text-[9px] sm:text-xs text-sky-400 tracking-widest text-center px-2">SOFTWARE ENGINEER</p>
              </div>

              {[
                { icon: '⚙️', angle: 0, label: 'ML' },
                { icon: '🧠', angle: 72, label: 'AI' },
                { icon: '⚛️', angle: 144, label: 'React' },
                { icon: '🐍', angle: 216, label: 'Python' },
                { icon: '🐳', angle: 288, label: 'Docker' },
              ].map(({ icon, angle, label }) => {
                const rad = (angle * Math.PI) / 180
                const x = 50 + 46 * Math.sin(rad)
                const y = 50 - 46 * Math.cos(rad)
                return (
                  <motion.div
                    key={label}
                    className="absolute w-9 h-9 sm:w-10 sm:h-10 -translate-x-1/2 -translate-y-1/2 glass rounded-xl border border-white/10 flex items-center justify-center text-base sm:text-lg cursor-default"
                    style={{ left: `${x}%`, top: `${y}%` }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2.5 + angle * 0.01, repeat: Infinity, delay: angle * 0.01 }}
                    whileHover={{ scale: 1.2 }}
                    title={label}
                  >
                    {icon}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-4 leading-snug">
              Building intelligent systems at the edge of what's possible
            </h3>
            <p className="text-slate-400 leading-relaxed mb-4 text-sm sm:text-base">
              I'm a software engineer focused on building <span className="text-sky-400">AI systems</span> and <span className="text-sky-400">generative AI applications</span>. My work spans the full stack — from fine-tuning language models and building RAG pipelines to shipping production-grade web applications.
            </p>
            <p className="text-slate-400 leading-relaxed mb-7 text-sm sm:text-base">
              Interested in <span className="text-indigo-400">large language models</span>, <span className="text-indigo-400">ML infrastructure</span>, and crafting intelligent developer tools that genuinely improve how we build software.
            </p>

            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {stats.map(({ label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className="glass rounded-xl p-3 sm:p-4 border border-white/5"
                >
                  <p className="font-display font-bold text-xl sm:text-2xl text-sky-400">{value}</p>
                  <p className="text-[10px] sm:text-xs font-mono text-slate-500 mt-1 leading-tight">{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { wrapperRef: canvasWrapperRef, shouldRender: canvasShouldRender } = useLazyCanvas('300px')

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory)

  return (
    <section id="skills" className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden w-full">
      <div
        className="orb pointer-events-none absolute"
        style={{
          width: 'min(500px, 90vw)',
          height: 'min(500px, 90vw)',
          background: 'rgba(14,165,233,0.05)',
          top: '50%',
          left: '-20%',
          transform: 'translateY(-50%)',
        }}
      />

      <div className="max-w-6xl mx-auto w-full" ref={ref}>
        <SectionHeading
          label="02 — What I Know"
          title="Skills & Expertise"
          subtitle="A living sphere of technologies I work with — hover over nodes to explore."
        />

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {skillCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-sky-400/20 border border-sky-400/40 text-sky-400'
                  : 'bg-white/5 border border-white/10 text-slate-500 hover:text-slate-300 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* 3D Sphere — lazy mounted */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            ref={canvasWrapperRef}
            className="canvas-section relative h-[300px] sm:h-[400px] lg:h-[480px] rounded-2xl overflow-hidden"
          >
            {canvasShouldRender ? (
              <SkillsScene skills={filtered} />
            ) : (
              <div className="w-full h-full bg-[#030712] rounded-2xl flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-sky-400/30 border-t-sky-400 animate-spin" />
              </div>
            )}
            <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-mono text-slate-600 tracking-widest whitespace-nowrap pointer-events-none">
              DRAG TO ROTATE
            </p>
          </motion.div>

          {/* Skills list */}
          <div className="min-w-0">
            <div className="space-y-2 max-h-[340px] sm:max-h-[400px] lg:max-h-[460px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
              {filtered.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.035 }}
                  className="glass rounded-xl p-3 border border-white/5 group hover:border-sky-400/20 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-1.5 gap-2">
                    <span className="font-mono text-xs sm:text-sm text-slate-300 group-hover:text-white transition-colors truncate">{skill.name}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] sm:text-xs font-mono text-slate-600 hidden sm:block">{skill.category}</span>
                      <span className="font-mono text-xs" style={{ color: skill.color }}>{skill.level}%</span>
                    </div>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.035, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Projects Section ─────────────────────────────────────────────────────────
function ProjectsSection({ onSelectProject }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { wrapperRef: canvasWrapperRef, shouldRender: canvasShouldRender } = useLazyCanvas('300px')

  return (
    <section id="projects" className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden w-full">
      <div
        className="orb pointer-events-none absolute"
        style={{
          width: 'min(600px, 100vw)',
          height: 'min(600px, 100vw)',
          background: 'rgba(99,102,241,0.04)',
          bottom: 0,
          right: '-10%',
        }}
      />

      <div className="max-w-6xl mx-auto w-full" ref={ref}>
        <SectionHeading
          label="03 — What I've Built"
          title="Projects"
          subtitle="Click on a card to explore the project details."
        />

        {/* 3D scene — lazy mounted */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          ref={canvasWrapperRef}
          className="canvas-section h-[320px] sm:h-[420px] lg:h-[520px] rounded-2xl overflow-hidden border border-white/5 relative mb-6 sm:mb-8"
        >
          {canvasShouldRender ? (
            <ProjectsScene projects={projects} onSelectProject={onSelectProject} />
          ) : (
            <div className="w-full h-full bg-[#030712] rounded-2xl flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-sky-400/30 border-t-sky-400 animate-spin" />
            </div>
          )}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-mono text-slate-600 tracking-widest pointer-events-none whitespace-nowrap">
            CLICK CARDS · AUTO-ROTATING
          </div>
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {projects.map((project, i) => (
            <motion.button
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              onClick={() => onSelectProject(project)}
              className="glass rounded-xl p-4 sm:p-5 border border-white/5 hover:border-sky-400/25 text-left group transition-all duration-300 hover:-translate-y-1 w-full"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl sm:text-2xl">{project.icon}</span>
                <div className="min-w-0">
                  <h4 className="font-display font-semibold text-white text-sm group-hover:text-sky-400 transition-colors truncate">
                    {project.title}
                  </h4>
                  <p className="text-xs font-mono truncate" style={{ color: project.color }}>{project.tagline}</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, 3).map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-white/5 border border-white/5">
                    {t}
                  </span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact Section ─────────────────────────────────────────────────────────
function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { wrapperRef: canvasWrapperRef, shouldRender: canvasShouldRender } = useLazyCanvas('200px')

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')

  // Point to your Express server
  // In production replace with your deployed server URL e.g. https://api.yourdomain.com
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    // Client-side validation before hitting the server
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      setStatus('error')
      setErrorMsg('Please fill in all fields.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      setStatus('error')
      setErrorMsg('Please enter a valid email address.')
      return
    }

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Something went wrong.')
      }

      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Failed to send. Please try again.')
    }
  }

  const inputClass =
    'w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 border border-white/10 focus:border-sky-400/50 focus:outline-none focus:ring-1 focus:ring-sky-400/20 transition-all duration-200 font-mono bg-transparent'

  const labelClass =
    'block text-[10px] sm:text-xs font-mono text-slate-500 mb-1.5 tracking-widest uppercase'

  const socials = [
    { icon: '🐙', label: 'GitHub',   href: 'https://github.com',   color: '#e2e8f0' },
    { icon: '💼', label: 'LinkedIn', href: 'https://linkedin.com', color: '#60a5fa' },
    { icon: '✉️', label: 'Email',    href: 'mailto:adinath@example.com', color: '#38bdf8' },
  ]

  return (
    <section id="contact" className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden w-full">
      {/* Background orb */}
      <div
        className="orb pointer-events-none absolute"
        style={{
          width: 'min(400px, 80vw)',
          height: 'min(400px, 80vw)',
          background: 'rgba(14,165,233,0.06)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      />

      <div className="max-w-6xl mx-auto w-full" ref={ref}>
        <SectionHeading
          label="04 — Say Hello"
          title="Get in Touch"
          subtitle="Have a project, opportunity, or just want to say hi? Drop me a message."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* ── Left: 3D panel + info ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            {/* 3D canvas — desktop + tablet */}
            <div
              ref={canvasWrapperRef}
              className="canvas-section h-[220px] sm:h-[280px] rounded-2xl overflow-hidden border border-white/5"
            >
              {canvasShouldRender ? (
                <ContactScene />
              ) : (
                <div className="w-full h-full bg-[#030712] flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-sky-400/30 border-t-sky-400 animate-spin" />
                </div>
              )}
            </div>

            {/* Social links */}
            <div>
              <p className="text-[10px] sm:text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">
                Find me on
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {socials.map(({ icon, label, href }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl border border-white/10 hover:border-sky-400/30 transition-all duration-300"
                  >
                    <span className="text-base">{icon}</span>
                    <span className="font-mono text-sm text-slate-300 hover:text-white transition-colors">{label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick info */}
            <div className="glass rounded-xl p-4 border border-white/5 space-y-3">
              {[
                { icon: '📍', label: 'Location',     value: 'India' },
                { icon: '⏱️', label: 'Response time', value: 'Within 24 hours' },
                { icon: '💼', label: 'Status',        value: 'Open to opportunities' },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-lg w-6 text-center">{icon}</span>
                  <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{label}</p>
                    <p className="text-sm font-mono text-slate-300">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Form ───────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-full min-w-0"
          >
            <div className="glass rounded-2xl p-6 sm:p-8 border border-white/5">
              <h3 className="font-display font-bold text-xl text-white mb-1">Send a Message</h3>
              <p className="font-mono text-xs text-slate-500 mb-6">All fields are required</p>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className={labelClass}>Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      disabled={status === 'sending'}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      disabled={status === 'sending'}
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className={labelClass}>Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What's this about?"
                    value={form.subject}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                    className={inputClass}
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={labelClass}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project, idea, or opportunity..."
                    value={form.message}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                    className={`${inputClass} resize-none`}
                    required
                  />
                  {/* Character count */}
                  <p className="text-right font-mono text-[10px] text-slate-600 mt-1">
                    {form.message.length} / 1000
                  </p>
                </div>

                {/* Error message */}
                <AnimatePresence>
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm font-mono"
                    >
                      <span>⚠</span>
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={status === 'sending' || status === 'success'}
                  whileHover={status === 'idle' || status === 'error' ? { scale: 1.02 } : {}}
                  whileTap={status === 'idle' || status === 'error' ? { scale: 0.97 } : {}}
                  className="w-full py-4 rounded-xl font-mono font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                  style={
                    status === 'success'
                      ? { background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.35)', color: '#34d399' }
                      : status === 'error'
                      ? { background: 'rgba(248,113,113,0.10)', border: '1px solid rgba(248,113,113,0.30)', color: '#f87171' }
                      : status === 'sending'
                      ? { background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.20)', color: '#38bdf8', opacity: 0.7 }
                      : { background: 'rgba(56,189,248,0.12)', border: '1px solid rgba(56,189,248,0.30)', color: '#38bdf8' }
                  }
                >
                  {status === 'sending' && (
                    <span className="w-4 h-4 rounded-full border-2 border-sky-400/30 border-t-sky-400 animate-spin" />
                  )}
                  {status === 'idle'    && 'Send Message →'}
                  {status === 'sending' && 'Sending...'}
                  {status === 'success' && '✓ Message Sent!'}
                  {status === 'error'   && 'Try Again →'}
                </motion.button>

                {/* Reset after success */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.button
                      type="button"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setStatus('idle')}
                      className="w-full py-2 font-mono text-xs text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      Send another message
                    </motion.button>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 sm:py-10 px-4 sm:px-6 w-full">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xs">
            A
          </div>
          <span className="font-display font-semibold text-slate-400">Adinath</span>
        </div>
        <p className="font-mono text-xs text-slate-600">
          Built with React + Three.js + Framer Motion ·{' '}
          <span className="text-sky-400/60">© {new Date().getFullYear()}</span>
        </p>
        <div className="flex items-center gap-4">
          {['GitHub', 'LinkedIn', 'Email'].map((s) => (
            <a key={s} href="#" className="font-mono text-xs text-slate-600 hover:text-sky-400 transition-colors">
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ─── Home ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection onSelectProject={setSelectedProject} />
      <ContactSection />
      <Footer />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  )
}