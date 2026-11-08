import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV } from '../data'
import { Btn, Logo } from './ui'
export default function Header() {
  const { scrollYProgress } = useScroll(), progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [solid, setSolid] = useState(false), [open, setOpen] = useState(false), [active, setActive] = useState('#home')
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40); f(); addEventListener('scroll', f, { passive: true })
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive('#' + e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    NAV.forEach(([, h]) => { const el = document.getElementById(h.slice(1)); el && io.observe(el) })
    return () => { removeEventListener('scroll', f); io.disconnect() }
  }, [])
  return (
    <motion.header initial={{ y: -90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className={`fixed inset-x-0 top-0 z-50 text-cream transition-[padding,background-color,box-shadow] duration-500 ${solid || open ? 'bg-green py-3 shadow-[0_1px_0_rgba(197,161,110,.3)]' : 'bg-transparent py-6'}`}>
      <nav aria-label="Main" className="mx-auto flex max-w-[1400px] items-center px-6 xl:px-12">
        <a href="#home" aria-label="LYSH Living home"><Logo className="text-4xl" /></a>
        <span className="mx-6 hidden h-14 w-px bg-gold/60 xl:block" aria-hidden="true" />
        <ul className="hidden min-w-0 flex-1 items-center gap-7 whitespace-nowrap text-[0.95rem] xl:flex">
          {NAV.map(([n, h]) => <li key={h}><a href={h} aria-current={active === h ? 'true' : undefined}
            className={`border-b pb-1 transition-colors hover:text-gold ${active === h ? 'border-gold text-gold' : 'border-transparent'}`}>{n}</a></li>)}
        </ul>
        <div className="ml-auto hidden shrink-0 whitespace-nowrap xl:block"><Btn variant="nav" href="#contact">Get in Touch</Btn></div>
        <button className="ml-auto xl:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button>
      </nav>
      <AnimatePresence>{open && (
        <motion.ul id="mobile-menu" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden bg-green px-6 xl:hidden">
          {NAV.map(([n, h]) => <li key={h}><a href={h} onClick={() => setOpen(false)} className="block border-b border-cream/10 py-4 font-serif text-2xl">{n}</a></li>)}
          <li className="py-6"><Btn href="#contact" onClick={() => setOpen(false)}>Get in Touch</Btn></li>
        </motion.ul>)}
      </AnimatePresence>
    <motion.div aria-hidden="true" style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gold-grad" />
    </motion.header>
  )
}
