import { imgProps } from '../data'
import { Btn, GoldRule } from './ui'
const DUST = [[8, 4, 3, 0, 16], [22, 0, 2, 4, 19], [38, 10, 4, 2, 22], [52, 0, 2, 7, 17], [66, 6, 3, 1, 21], [78, 0, 4, 5, 18], [90, 8, 2, 9, 20], [15, 20, 2, 11, 23]]
export default function Hero() {
  return (
    <section id="home" className="relative flex items-center overflow-hidden bg-green text-cream">
      <div data-hero-bg="" className="absolute inset-x-0 -top-[10%] h-[120%] will-change-transform">
        <div data-hero-zoom="" className="absolute inset-0 will-change-transform">
          <img data-hero-a="" {...imgProps('hero-1')} sizes="100vw" alt="" fetchpriority="high" className="absolute inset-0 h-full w-full object-cover" />
          <img data-hero-b="" {...imgProps('hero-2')} sizes="100vw" alt="" className="absolute inset-0 h-full w-full object-cover opacity-0" />
        </div>
      </div>
      <div className="absolute inset-0 bg-green/40 lg:hidden" />
      <div className="absolute inset-0 bg-gradient-to-r from-green via-green/80 to-green/25" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-green/70 to-transparent" />
      <div data-hero-dim="" className="absolute inset-0 bg-green opacity-0" />
      {DUST.map(([l, b, s, d, t], i) => <span key={i} aria-hidden="true" data-dust="" data-delay={d} data-dur={t} className="absolute rounded-full bg-gold/70 opacity-0 blur-[1px]" style={{ left: `${l}%`, bottom: `${b}%`, width: s, height: s }} />)}
      <div data-hero-content="" className="relative mx-auto w-full max-w-[1400px] px-6 pb-24 pt-28 lg:px-12">
        <h1 className="max-w-3xl font-serif text-[2.75rem] leading-[1.05] sm:text-5xl md:text-7xl lg:text-[5.5rem]">
          <span data-hero-l1="" className="block pb-2">Comfortable stays.</span>
          <span data-hero-l2="" className="block pb-3 pr-3"><em className="text-gold">Exceptional living.</em></span>
        </h1>
        <GoldRule data-hero-rule="" className="mt-8" />
        <p data-hero-p="" className="mt-8 max-w-md text-lg text-cream/90">Thoughtfully designed serviced accommodation for business, relocation and leisure.</p>
        <div data-hero-cta="" className="mt-10 inline-block"><Btn href="#properties">Explore Our Stays</Btn></div>
      </div>
      <a data-hero-scroll="" href="#guests" aria-label="Scroll down" className="absolute bottom-8 left-1/2 flex [@media(max-height:600px)]:hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] tracking-[0.35em] text-cream/70">
        SCROLL<span data-cue="" className="h-10 w-px bg-gold" />
      </a>
    </section>
  )
}
