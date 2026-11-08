import { ArrowRight } from 'lucide-react'
import { imgProps } from '../data'
// All motion is driven by data-attributes read in src/motion/animations.js
export const Reveal = ({ children, variant = 'up', delay, className = '' }) => (
  <div data-reveal={variant} data-delay={delay || undefined} className={className}>{children}</div>
)
export const GrowLine = ({ axis = 'y', delay, className = '' }) => (
  <span aria-hidden="true" data-line={axis} data-delay={delay || undefined} className={`bg-gold ${axis === 'y' ? 'w-px origin-top' : 'h-px origin-left'} ${className}`} />
)
export const GoldRule = ({ className = '', ...p }) => <span aria-hidden="true" className={`block h-px w-20 origin-left bg-gold ${className}`} {...p} />
// Image with mask reveal, scroll parallax, hover zoom. `tilt` adds mouse-driven 3D; `expand` opens the mask on scroll.
export const ImageReveal = ({ image, sizes = '100vw', alt, className = '', tilt = false, stays = false, expand = false, frame = false }) => (
  <div data-tilt={tilt ? '' : undefined} className={`group relative ${className}`}>
    {frame && <span aria-hidden="true" className="depth-frame pointer-events-none absolute inset-0 border border-gold/50" />}
    <div data-mask={expand ? 'expand' : ''} data-stays-img={stays ? '' : undefined} className="relative h-full w-full overflow-hidden bg-forest">
      <div data-zoom className={`h-full w-full ${tilt ? '' : 'transition-transform duration-[1400ms] ease-out group-hover:scale-105'}`}>
        <img {...imgProps(image)} sizes={sizes} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </div>
      <span aria-hidden="true" className="pointer-events-none absolute inset-4 scale-95 border border-gold opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-100" />
    </div>
  </div>
)
const P = 'group inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3 text-[0.95rem] transition-[color,background-color,border-color,filter] duration-300 '
const V = {
  gold: P + 'border-transparent bg-gold-grad text-green hover:brightness-110',
  nav: P + '!px-5 !py-2 !text-sm border-gold/70 bg-green/60 text-cream hover:bg-gold hover:text-green',
  dark: P + 'border-[#9a7448] text-ink hover:border-green hover:bg-green hover:text-cream',
  link: 'group inline-flex items-center gap-2 border-b-2 border-gold px-1 pb-1 text-ink transition-colors hover:text-[#9a7448]',
}
export const Btn = ({ variant = 'gold', href, children, arrow = true, className = '', ...p }) => {
  const C = href ? 'a' : 'button'
  return <C href={href} data-magnetic="" className={`${V[variant]} ${className}`} {...p}>{children}{arrow && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />}</C>
}
// Recreated wordmark (roof line draws itself). Replace with the official logo file when available.
export const Logo = ({ tone = 'light', className = '', delay = 0.3 }) => (
  <span className={`inline-flex flex-col font-serif leading-none ${className}`} role="img" aria-label="LYSH Living">
    <svg viewBox="0 0 70 34" className="ml-[0.2em] h-[0.5em] w-auto self-start" fill="none" aria-hidden="true">
      <defs><linearGradient id="lg" x1="0" x2="1"><stop offset="0" stopColor="#a67c4e" /><stop offset=".5" stopColor="#dcbd89" /><stop offset="1" stopColor="#b08555" /></linearGradient></defs>
      <path data-draw="" data-delay={delay} pathLength="1" strokeDasharray="1" d="M3 31 36 5l30 22M52 16V8h7v14" stroke="url(#lg)" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
    <span data-reveal="fade" data-delay={delay + 0.2} className="bg-gold-grad bg-clip-text font-light tracking-[0.2em] text-transparent">LYSH</span>
    <span className={`mt-[0.25em] self-center text-[0.22em] tracking-[0.75em] ${tone === 'dark' ? 'text-ink' : 'text-cream'}`}>LIVING</span>
  </span>
)
export const H2 = ({ children, className = '', ...p }) => <h2 className={`font-serif text-4xl leading-tight md:text-5xl ${className}`} {...p}>{children}</h2>
