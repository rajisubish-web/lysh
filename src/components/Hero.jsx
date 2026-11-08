import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HERO_IMG, IMG } from '../data'
import { Btn, GoldRule } from './ui'
const ease = [0.22, 1, 0.36, 1]
const DUST = [[8, 4, 3, 0, 16], [22, 0, 2, 4, 19], [38, 10, 4, 2, 22], [52, 0, 2, 7, 17], [66, 6, 3, 1, 21], [78, 0, 4, 5, 18], [90, 8, 2, 9, 20], [15, 20, 2, 11, 23]]
export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const lift = useTransform(scrollYProgress, [0, 1], ['0%', '-14%'])
  const up = (d) => ({ initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay: d, ease } })
  const line = (d) => ({ initial: { y: '110%' }, animate: { y: 0 }, transition: { duration: 1.2, delay: d, ease } })
  return (
    <section id="home" ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden bg-green text-cream">
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[8%] h-[116%]">
        <motion.img src={IMG(HERO_IMG, 2400)} alt="" fetchpriority="high" className="h-full w-full object-cover" initial={{ scale: 1.18 }} animate={{ scale: 1 }} transition={{ duration: 16, ease: 'easeOut' }} />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-green via-green/80 to-green/25" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-green/70 to-transparent" />
      {DUST.map(([l, b, s, d, t], i) => <span key={i} aria-hidden="true" className="absolute rounded-full bg-gold/70 blur-[1px] motion-safe:animate-drift" style={{ left: `${l}%`, bottom: `${b}%`, width: s, height: s, animationDelay: `${d}s`, animationDuration: `${t}s` }} />)}
      <motion.div style={{ opacity: fade, y: lift }} className="relative mx-auto w-full max-w-[1400px] px-6 pt-28 lg:px-12">
        <h1 aria-label="Comfortable stays. Exceptional living." className="max-w-3xl font-serif text-5xl leading-[1.05] md:text-7xl lg:text-[5.5rem]">
          <span className="block overflow-hidden pb-2" aria-hidden="true"><motion.span className="block" {...line(0.3)}>Comfortable stays.</motion.span></span>
          <span className="block overflow-hidden pb-3" aria-hidden="true"><motion.em className="block bg-gold-grad bg-clip-text pr-3 text-transparent" {...line(0.5)}>Exceptional living.</motion.em></span>
        </h1>
        <motion.div {...up(0.9)}><GoldRule className="mt-8" /></motion.div>
        <motion.p {...up(1)} className="mt-8 max-w-md text-lg text-cream/90">Thoughtfully designed serviced accommodation for business, relocation and leisure.</motion.p>
        <motion.div {...up(1.2)} className="mt-10"><Btn href="#properties">Explore Our Stays</Btn></motion.div>
      </motion.div>
      <a href="#guests" aria-label="Scroll down" className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] tracking-[0.35em] text-cream/70">
        SCROLL<span className="h-10 w-px bg-gold motion-safe:animate-cue" />
      </a>
    </section>
  )
}
