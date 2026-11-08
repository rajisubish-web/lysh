import { PROPERTIES } from '../data'
import { Btn, H2, ImageReveal, Reveal } from './ui'
import { MapPin, BedDouble, Users } from 'lucide-react'
// On desktop this section pins and scrolls sideways (see src/motion/animations.js). On tablet and mobile it stays a vertical list.
export default function Properties({ onEnquire }) {
  return (
    <section id="properties" data-stays="" className="bg-cream">
      <div data-stays-pin="" className="relative py-24 md:py-32">
        <div data-stays-track="" className="mx-auto max-w-7xl space-y-24 px-6">
          <div data-stays-intro="">
            <H2 data-split="lines" className="text-ink">Our Stays</H2>
            <Reveal className="mt-4 max-w-xl"><p className="text-ink/70">Serviced apartments for business, relocation and leisure. Dummy listings are shown until real property details are added.</p></Reveal>
          </div>
          {PROPERTIES.map((p, i) => (
            <article key={p.name} data-stays-panel="" className="grid items-center gap-8 md:grid-cols-12 md:gap-14">
              <ImageReveal tilt stays frame image={p.image} sizes="(min-width: 1024px) 60vw, 100vw" alt={`${p.name} interior`} className={`aspect-[4/3] md:col-span-7 ${i % 2 ? 'md:order-2' : ''}`} />
              <div data-stays-text="" className="md:col-span-5">
                {p.sample && <p className="mb-3 inline-block border border-gold px-2 py-0.5 text-xs text-[#9a7448]">Sample content</p>}
                <h3 data-stays-title="" className="font-serif text-3xl text-ink md:text-4xl">{p.name}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-ink/70"><MapPin className="h-4 w-4 text-gold" aria-hidden="true" />{p.location}</p>
                <p className="mt-5 text-ink/85">{p.blurb}</p>
                <ul className="mt-5 space-y-1 text-sm text-ink/85">{p.highlights.map((h) => <li key={h} className="border-l border-gold pl-3">{h}</li>)}</ul>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-gold/40 pt-4 text-sm text-ink">
                  <span className="flex items-center gap-2"><BedDouble className="h-4 w-4 text-gold" aria-hidden="true" />{p.beds} {p.beds > 1 ? 'bedrooms' : 'bedroom'}</span>
                  <span className="flex items-center gap-2"><Users className="h-4 w-4 text-gold" aria-hidden="true" />Sleeps {p.guests}</span>
                  <span className="font-serif text-xl">From {p.price} <span className="font-sans text-sm text-ink/60">/ night</span></span>
                </div>
                <div className="mt-8"><Btn variant="dark" href="#contact" onClick={() => onEnquire('Guest Enquiry')}>View Property</Btn></div>
              </div>
            </article>))}
        </div>
        <div data-stays-bar="" aria-hidden="true" className="absolute bottom-10 left-[8vw] right-[8vw] hidden h-px bg-gold/30"><div data-stays-progress="" className="h-full origin-left scale-x-0 bg-gold" /></div>
      </div>
    </section>
  )
}
