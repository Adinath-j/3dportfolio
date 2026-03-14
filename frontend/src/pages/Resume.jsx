import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

// ── Data ──────────────────────────────────────────────────────────────────────
const resume = {
  name: 'Adinath Jadhav',
  pronouns: 'He/Him',
  title: 'Data Science Undergrad • MERN Developer',
  location: 'Karvir, Maharashtra, India',
  email: 'adinath0632@gmail.com',
  github: 'Adinath-j',
  linkedin: 'jadhav-adinath2003',

  summary:
    'Data Science undergrad with hands-on experience in full-stack web development, AI-driven projects, and open-source collaboration. Skilled in the MERN stack, React-based UI design, and building developer-centric tools. Passionate about merging AI and web technologies to create impactful digital solutions.',

  experience: [
    {
      role: 'Open Source Contributor',
      org: 'GirlScript Summer of Code (GSSoC)',
      period: 'Oct 2024 – Present',
      type: 'Hybrid',
      points: [
        'Contributing to open-source repositories and improving front-end architecture.',
        'Working with React.js, JavaScript, and HTML/CSS for UI enhancement and optimization.',
      ],
    },
  ],

  education: [
    {
      degree: 'Bachelor of Technology (B.Tech) in Data Science',
      institute: "D. Y. Patil Pratishthan's College of Engineering, Kolhapur",
      period: '2023 – 2027',
      detail: 'Coursework: Engineering, MERN Stack, Data Science',
    },
    {
      degree: 'HSC, PCMB',
      institute: 'Shri Jalandar Secondary & Higher Secondary College, Raimoha',
      period: '2021 – 2022',
      detail: 'Grade: 80.81%',
    },
    {
      degree: 'SSC, PCMB',
      institute: 'Z. P. H. S. Khokarmoha',
      period: '2019 – 2020',
      detail: 'Grade: 81.40%',
    },
  ],

  certifications: [
    'Oracle AI Foundations (OCI 2025)',
    'Postman API Student Expert',
    'Google Cloud Generative AI',
  ],

  skills: {
    Languages: ['C', 'JavaScript', 'HTML', 'CSS'],
    'Frameworks & Tools': ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Postman', 'Git'],
    'Soft Skills': ['Communication', 'Collaboration', 'Continuous Learning'],
  },
}

// ── Sub-components ────────────────────────────────────────────────────────────
function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="font-mono text-[10px] text-sky-400 tracking-widest uppercase">{children}</span>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  )
}

function Tag({ children, color = '#38bdf8' }) {
  return (
    <span
      className="font-mono text-[10px] px-2 py-1 rounded-md border"
      style={{ color, borderColor: `${color}40`, background: `${color}10` }}
    >
      {children}
    </span>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Resume() {
  const printRef = useRef(null)

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-200 overflow-x-hidden">

      {/* Ambient orb */}
      <div
        className="orb pointer-events-none fixed"
        style={{
          width: 'min(500px, 90vw)',
          height: 'min(500px, 90vw)',
          background: 'rgba(14,165,233,0.05)',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 0,
        }}
      />

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-50 w-full border-b border-white/5 backdrop-blur-xl bg-[#030712]/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 font-mono text-xs text-slate-400 hover:text-white transition-colors"
          >
            <span>←</span>
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Print / Save as PDF */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.print()}
              className="font-mono text-xs px-3 sm:px-4 py-2 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all"
            >
              🖨 Print
            </motion.button>

            {/* Download PDF */}
            <motion.a
              href="/resume.pdf"
              download="Adinath_Jadhav_Resume.pdf"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="font-mono text-xs px-3 sm:px-4 py-2 rounded-lg transition-all flex items-center gap-1.5"
              style={{
                background: 'rgba(56,189,248,0.12)',
                border: '1px solid rgba(56,189,248,0.30)',
                color: '#38bdf8',
              }}
            >
              ↓ Download PDF
            </motion.a>
          </div>
        </div>
      </div>

      {/* ── Resume body ── */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14" ref={printRef}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="font-display font-bold text-3xl sm:text-4xl text-white">
                  {resume.name}
                </h1>
                <span className="font-mono text-xs text-slate-500">{resume.pronouns}</span>
              </div>
              <p className="font-mono text-sm text-sky-400 mb-3">{resume.title}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {[
                  { icon: '📍', text: resume.location },
                  { icon: '✉️', text: resume.email, href: `mailto:${resume.email}` },
                  { icon: '🐙', text: resume.github, href: `https://github.com/${resume.github}` },
                  { icon: '💼', text: resume.linkedin, href: `https://linkedin.com/in/${resume.linkedin}` },
                ].map(({ icon, text, href }) => (
                  href ? (
                    <a key={text} href={href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-mono text-xs text-slate-400 hover:text-sky-400 transition-colors">
                      <span>{icon}</span><span>{text}</span>
                    </a>
                  ) : (
                    <span key={text} className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
                      <span>{icon}</span><span>{text}</span>
                    </span>
                  )
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="flex items-center gap-2 px-3 py-2 glass rounded-xl border border-white/5 self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs text-emerald-400">Open to opportunities</span>
            </div>
          </div>
        </motion.div>

        <div className="space-y-10">

          {/* Summary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <SectionTitle>Summary</SectionTitle>
            <p className="font-mono text-sm text-slate-400 leading-relaxed">{resume.summary}</p>
          </motion.div>

          {/* Experience */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-5">
              {resume.experience.map((exp, i) => (
                <div key={i} className="glass rounded-xl p-5 border border-white/5">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                    <div>
                      <p className="font-display font-semibold text-white">{exp.role}</p>
                      <p className="font-mono text-sm text-sky-400">{exp.org}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-xs text-slate-500">{exp.period}</p>
                      <p className="font-mono text-xs text-slate-600">{exp.type}</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {exp.points.map((pt, j) => (
                      <li key={j} className="flex gap-2 font-mono text-xs text-slate-400">
                        <span className="text-sky-400 mt-0.5">–</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Projects — from projects.js */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <SectionTitle>Projects</SectionTitle>
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="glass rounded-xl p-5 border border-white/5 hover:border-white/10 transition-all"
                  style={{ borderLeft: `3px solid ${project.color}` }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{project.icon}</span>
                      <div>
                        <p className="font-display font-semibold text-white">{project.title}</p>
                        <p className="font-mono text-xs" style={{ color: project.color }}>{project.tagline}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-8 sm:ml-0">
                      <Tag color={project.color}>{project.status}</Tag>
                      <span className="font-mono text-xs text-slate-600">{project.year}</span>
                    </div>
                  </div>
                  <p className="font-mono text-xs text-slate-400 leading-relaxed mb-3 ml-8">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 ml-8">
                    {project.tech.map((t) => (
                      <Tag key={t} color={project.color}>{t}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <SectionTitle>Education</SectionTitle>
            <div className="space-y-4">
              {resume.education.map((edu, i) => (
                <div key={i} className="glass rounded-xl p-5 border border-white/5">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                    <div>
                      <p className="font-display font-semibold text-white">{edu.degree}</p>
                      <p className="font-mono text-sm text-sky-400">{edu.institute}</p>
                      <p className="font-mono text-xs text-slate-500 mt-1">{edu.detail}</p>
                    </div>
                    <span className="font-mono text-xs text-slate-500 whitespace-nowrap">{edu.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <SectionTitle>Technical Skills</SectionTitle>
            <div className="glass rounded-xl p-5 border border-white/5 space-y-4">
              {Object.entries(resume.skills).map(([category, items]) => (
                <div key={category} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                  <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest w-36 shrink-0 pt-1">
                    {category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <SectionTitle>Certifications</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {resume.certifications.map((cert) => (
                <div key={cert} className="glass rounded-xl px-4 py-2.5 border border-white/5 flex items-center gap-2">
                  <span className="text-yellow-400 text-sm">🏅</span>
                  <span className="font-mono text-xs text-slate-300">{cert}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Footer */}
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-slate-600">
            Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </p>
          <motion.a
            href="/resume.pdf"
            download="Adinath_Jadhav_Resume.pdf"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="font-mono text-xs px-4 py-2 rounded-lg transition-all flex items-center gap-1.5"
            style={{
              background: 'rgba(56,189,248,0.12)',
              border: '1px solid rgba(56,189,248,0.30)',
              color: '#38bdf8',
            }}
          >
            ↓ Download PDF
          </motion.a>
        </div>
      </main>
    </div>
  )
}