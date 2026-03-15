import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const WHATSAPP_NUMBER = '9405110632' 
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Adinath%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.`

// ── Data ──────────────────────────────────────────────────────────────────────
const services = [
  {
    icon: '🌐',
    title: 'Web Development',
    desc: 'Fast, responsive websites and full-stack web apps using React, Node.js, and MongoDB.',
    tags: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
    color: '#38bdf8',
  },
  {
    icon: '📱',
    title: 'Mobile App Development',
    desc: 'Cross-platform mobile apps for Android and iOS using React Native and Expo.',
    tags: ['React Native', 'Expo', 'Supabase', 'Offline-first'],
    color: '#818cf8',
  },
  {
    icon: '⚙️',
    title: 'Full Stack Applications',
    desc: 'End-to-end applications — UI, backend APIs, database, authentication, and deployment.',
    tags: ['MERN Stack', 'JWT Auth', 'Deployment', 'Tailwind CSS'],
    color: '#34d399',
  },
]

const packages = [
  {
    name: 'Starter',
    price: '₹5,000',
    duration: '3–5 days',
    color: '#38bdf8',
    desc: 'Perfect for a landing page or simple website',
    features: [
      'Single page responsive website',
      'Mobile friendly design',
      'Contact form integration',
      '1 round of revisions',
      'Deployed on Vercel',
    ],
  },
  {
    name: 'Standard',
    price: '₹15,000',
    duration: '1–2 weeks',
    color: '#818cf8',
    desc: 'Best for small business web apps',
    features: [
      'Multi-page React web app',
      'Backend API with Node.js',
      'MongoDB database',
      'User authentication',
      '3 rounds of revisions',
      'Full deployment',
    ],
    highlighted: true,
  },
  {
    name: 'Premium',
    price: 'Custom',
    duration: '2–4 weeks',
    color: '#34d399',
    desc: 'Full-stack or mobile app from scratch',
    features: [
      'Full stack web or mobile app',
      'Custom design + development',
      'Admin dashboard',
      'Advanced features as needed',
      'Unlimited revisions',
      'Post-launch support',
    ],
  },
]

const faqs = [
  {
    q: 'How do we get started?',
    a: 'Send me a WhatsApp message or email describing your project. We\'ll have a quick call to discuss requirements, timeline, and cost.',
  },
  {
    q: 'What information do you need from me?',
    a: 'A rough idea of what you want to build, any design references you like, and your timeline. I\'ll handle the rest.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes. I accept payments via UPI, bank transfer, PayPal, and Wise.',
  },
//   {
//     q: 'What if I need changes after delivery?',
//     a: 'Each package includes a set number of revision rounds. After that, changes are billed at an hourly rate.',
//   },
]

// ── Sub-components ────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <p className="font-mono text-[10px] sm:text-xs text-sky-400 tracking-[0.25em] uppercase mb-3">
      {children}
    </p>
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
export default function Hire() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-200 overflow-x-hidden">

      {/* Ambient orbs */}
      <div className="orb pointer-events-none fixed" style={{ width: 'min(500px,90vw)', height: 'min(500px,90vw)', background: 'rgba(14,165,233,0.05)', top: '5%', left: '20%', zIndex: 0 }} />
      <div className="orb pointer-events-none fixed" style={{ width: 'min(400px,80vw)', height: 'min(400px,80vw)', background: 'rgba(99,102,241,0.05)', bottom: '10%', right: '10%', zIndex: 0 }} />

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-50 w-full border-b border-white/5 backdrop-blur-xl bg-[#030712]/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link to="/" className="font-mono text-xs text-slate-400 hover:text-white transition-colors">
            ← Back to Portfolio
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/25 text-green-400 hover:bg-green-500/20 transition-all"
          >
            💬 WhatsApp Me
          </a>
        </div>
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-emerald-400/20 text-emerald-400 text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for freelance projects
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white leading-tight mb-5">
            Let's Build Something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
              Together
            </span>
          </h1>

          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed mb-8">
            I build fast, modern web and mobile applications for startups and small businesses.
            Clean code, on-time delivery, and clear communication throughout.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-mono text-sm font-semibold transition-all bg-green-500/15 border border-green-500/35 text-green-400 hover:bg-green-500/25"
            >
              💬 Chat on WhatsApp
            </motion.a>
            <motion.a
              href="mailto:adinath0632@gmail.com"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-mono text-sm font-semibold transition-all bg-sky-400/10 border border-sky-400/30 text-sky-400 hover:bg-sky-400/20"
            >
              ✉️ Send an Email
            </motion.a>
          </div>
        </motion.div>

        {/* ── Services ── */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <SectionLabel>What I offer</SectionLabel>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">Services</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all"
                style={{ borderTop: `3px solid ${s.color}` }}
              >
                <span className="text-3xl mb-4 block">{s.icon}</span>
                <h3 className="font-display font-bold text-white mb-2">{s.title}</h3>
                <p className="font-mono text-xs text-slate-400 leading-relaxed mb-4">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((t) => <Tag key={t} color={s.color}>{t}</Tag>)}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Packages ── */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">Packages</h2>
            <p className="font-mono text-xs text-slate-500 mt-2">All prices are starting estimates — final cost depends on scope</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`glass rounded-2xl p-6 border transition-all relative ${
                  pkg.highlighted
                    ? 'border-indigo-400/40 shadow-lg shadow-indigo-400/10'
                    : 'border-white/5'
                }`}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full font-mono text-[10px] bg-indigo-400 text-white">
                    Most Popular
                  </div>
                )}
                <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: pkg.color }}>{pkg.name}</p>
                <p className="font-display font-bold text-3xl text-white mb-1">{pkg.price}</p>
                <p className="font-mono text-[10px] text-slate-500 mb-2">{pkg.duration}</p>
                <p className="font-mono text-xs text-slate-400 mb-5 pb-5 border-b border-white/5">{pkg.desc}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 font-mono text-xs text-slate-300">
                      <span style={{ color: pkg.color }} className="mt-0.5 shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <motion.a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="block w-full text-center py-3 rounded-xl font-mono text-sm font-semibold transition-all"
                  style={{ background: `${pkg.color}15`, border: `1px solid ${pkg.color}35`, color: pkg.color }}
                >
                  Get Started →
                </motion.a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Why me ── */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <SectionLabel>Why work with me</SectionLabel>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">What You Get</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '⚡', title: 'Fast Delivery', desc: 'I respect deadlines and communicate proactively if anything changes.' },
              { icon: '📱', title: 'Mobile First', desc: 'Every project is designed and tested on mobile devices first.' },
              { icon: '🔒', title: 'Clean Code', desc: 'Readable, maintainable code you can hand off to any developer.' },
              { icon: '💬', title: 'Clear Comms', desc: 'Daily updates, quick replies, and no technical jargon.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-xl p-5 border border-white/5 text-center"
              >
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <p className="font-display font-semibold text-white text-sm mb-2">{item.title}</p>
                <p className="font-mono text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">Common Questions</h2>
          </div>
          <div className="space-y-3 max-w-2xl mx-auto">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="glass rounded-xl p-5 border border-white/5"
              >
                <p className="font-display font-semibold text-white text-sm mb-2">{faq.q}</p>
                <p className="font-mono text-xs text-slate-400 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-8 sm:p-12 border border-white/5 text-center"
        >
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
            Ready to start your project?
          </h2>
          <p className="font-mono text-sm text-slate-400 mb-8 max-w-md mx-auto">
            Send me a message and I'll get back to you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-mono text-sm font-semibold bg-green-500/15 border border-green-500/35 text-green-400 hover:bg-green-500/25 transition-all"
            >
              💬 Chat on WhatsApp
            </motion.a>
            <motion.a
              href="mailto:adinath0632@gmail.com"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-mono text-sm font-semibold bg-sky-400/10 border border-sky-400/30 text-sky-400 hover:bg-sky-400/20 transition-all"
            >
              ✉️ adinath0632@gmail.com
            </motion.a>
          </div>
        </motion.div>

      </main>
    </div>
  )
}