import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Home')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNav = (href, label) => {
    setActive(label)
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? 'glass border-b border-[rgba(99,179,237,0.12)] shadow-lg shadow-black/40'
          : ''
      }`}
    >
      {/* Main bar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">

        {/* Logo */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => handleNav('#hero', 'Home')}
          className="flex items-center gap-2 shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm font-mono">
            A
          </div>
          <span className="font-display font-bold text-white text-base sm:text-lg tracking-tight">
            Adinath
          </span>
        </motion.button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((link, i) => (
            <motion.li
              key={link.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
            >
              <button
                onClick={() => handleNav(link.href, link.label)}
                className={`relative px-4 py-2.5 text-sm font-medium font-mono transition-colors duration-200 rounded-lg min-w-[70px] ${
                  active === link.label
                    ? 'text-sky-400'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {active === link.label && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-sky-400/10 border border-sky-400/20"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </button>
            </motion.li>
          ))}
        </ul>

        {/* Desktop CTA + Mobile toggle group */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Available badge — desktop only */}
          <motion.a
            href="mailto:adinath0632@example.com"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-lg bg-sky-400/10 border border-sky-400/25 text-sky-400 text-sm font-mono font-medium hover:bg-sky-400/20 transition-colors whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            Available
          </motion.a>

          {/* Mobile hamburger */}
          <button
            aria-label="Toggle menu"
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setOpen(!open)}
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
              transition={{ duration: 0.25 }}
              className="block w-5 h-[2px] bg-white origin-center"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-[2px] bg-white"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
              transition={{ duration: 0.25 }}
              className="block w-5 h-[2px] bg-white origin-center"
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-[rgba(99,179,237,0.1)] bg-[#030712]/95 backdrop-blur-xl"
          >
            <ul className="px-4 py-3 flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNav(link.href, link.label)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-base font-mono transition-colors ${
                      active === link.label
                        ? 'text-sky-400 bg-sky-400/10 border border-sky-400/20'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-2 border-t border-white/5 mt-1">
                <a
                  href="mailto:adinath0632@example.com"
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sky-400 font-mono text-base bg-sky-400/10 border border-sky-400/20"
                >
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  Available for work
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}