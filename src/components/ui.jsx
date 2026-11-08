import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
const ease = [0.22, 1, 0.36, 1]
export const Reveal = ({ children, delay = 0, x = 0, className = '' }) => (
  <motion.div className={className} initial={{ opacity: 0, x, y: x ? 0 : 24 }} whileInView={{ opacity: 1, x: 0, y: 0 }}
    viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, delay, ease }}>{children}</motion.div>
)
// Gold line that draws itself when scrolled into view. Pass display/size classes from the caller.
export const GrowLine = ({ axis = 'y', delay = 0, className = '' }) => (
  <motion.span aria-hidden="true" className={`bg-gold ${axis === 'y' ? 'w-px origin-top' : 'h-px origin-left'} ${className}`}
    initial={axis === 'y' ? { scaleY: 0 } : { scaleX: 0 }} whileInView={axis === 'y' ? { scaleY: 1 } : { scaleX: 1 }}
    viewport={{ once: true }} transition={{ duration: 1.2, delay, ease }} />
)
export const GoldRule = ({ className = '' }) => <GrowLine axis="x" className={`block w-20 ${className}`} />
// Image that wipes in, drifts slowly as you scroll, and zooms on hover.
export const ImageReveal = ({ src, alt, className = '' }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])
  return (
    <motion.div ref={ref} className={`overflow-hidden bg-forest ${className}`} initial={{ clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)' }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 1.2, ease: [0.77, 0, 0.18, 1] }}>
      <div className="h-full w-full transition-transform duration-[1400ms] ease-out hover:scale-105">
        <motion.img src={src} alt={alt} loading="lazy" decoding="async" style={{ y, scale: 1.16 }} className="h-full w-full object-cover" />
      </div>
    </motion.div>
  )
}
const P = 'group inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3 text-[0.95rem] transition-all duration-300 '
const V = {
  gold: P + 'border-transparent bg-gold-grad text-green hover:brightness-110',
  nav: P + '!px-5 !py-2 !text-sm border-gold/70 bg-green/60 text-cream hover:bg-gold hover:text-green',
  dark: P + 'border-[#9a7448] text-ink hover:border-green hover:bg-green hover:text-cream',
  link: 'group inline-flex items-center gap-2 border-b-2 border-gold px-1 pb-1 text-ink transition-colors hover:text-[#9a7448]',
}
export const Btn = ({ variant = 'gold', href, children, arrow = true, className = '', ...p }) => {
  const C = href ? 'a' : 'button'
  return <C href={href} className={`${V[variant]} ${className}`} {...p}>{children}{arrow && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />}</C>
}
// Recreated wordmark (roof line draws itself). Replace with the official logo file when available.
export const Logo = ({ tone = 'light', className = '' }) => (
  <span className={`inline-flex flex-col font-serif leading-none ${className}`} role="img" aria-label="LYSH Living">
    <svg viewBox="0 0 70 34" className="ml-[0.2em] h-[0.5em] w-auto self-start" fill="none" aria-hidden="true">
      <defs><linearGradient id="lg" x1="0" x2="1"><stop offset="0" stopColor="#a67c4e" /><stop offset=".5" stopColor="#dcbd89" /><stop offset="1" stopColor="#b08555" /></linearGradient></defs>
      <motion.path d="M3 31 36 5l30 22M52 16V8h7v14" stroke="url(#lg)" strokeWidth="1.6" strokeLinejoin="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, delay: 0.3, ease: 'easeInOut' }} />
    </svg>
    <motion.span className="bg-gold-grad bg-clip-text font-light tracking-[0.2em] text-transparent" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.5 }}>LYSH</motion.span>
    <span className={`mt-[0.25em] self-center text-[0.22em] tracking-[0.75em] ${tone === 'dark' ? 'text-ink' : 'text-cream'}`}>LIVING</span>
  </span>
)
export const H2 = ({ children, className = '' }) => <h2 className={`font-serif text-4xl leading-tight md:text-5xl ${className}`}>{children}</h2>
