import { PROPERTIES, IMG } from '../data'
import { Btn, H2, ImageReveal, Reveal } from './ui'
import { motion } from 'framer-motion'
import { MapPin, BedDouble, Users } from 'lucide-react'
export default function Properties({ onEnquire }) {
  return (
    <section id="properties" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal><H2 className="text-ink">Our Stays</H2><p className="mt-4 max-w-xl text-ink/70">Serviced apartments for business, relocation and leisure. Dummy listings are shown until real property details are added.</p></Reveal>
        <div className="mt-16 space-y-24">
          {PROPERTIES.map((p, i) => (
            <article key={p.name} className="grid items-center gap-8 md:grid-cols-12 md:gap-14">
              <ImageReveal src={IMG(p.image, 1600)} alt={`${p.name} interior`} className={`aspect-[4/3] md:col-span-7 ${i % 2 ? 'md:order-2' : ''}`} />
              <Reveal className="md:col-span-5">
                {p.sample && <p className="mb-3 inline-block border border-gold px-2 py-0.5 text-xs text-[#9a7448]">Sample content</p>}
                <h3 className="font-serif text-3xl text-ink md:text-4xl">{p.name}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-ink/70"><MapPin className="h-4 w-4 text-gold" aria-hidden="true" />{p.location}</p>
                <p className="mt-5 text-ink/85">{p.blurb}</p>
                <ul className="mt-5 space-y-1 text-sm text-ink/85">{p.highlights.map((h, k) => <motion.li key={h} className="border-l border-gold pl-3" initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 + k * 0.12 }}>{h}</motion.li>)}</ul>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-gold/40 pt-4 text-sm text-ink">
                  <span className="flex items-center gap-2"><BedDouble className="h-4 w-4 text-gold" aria-hidden="true" />{p.beds} {p.beds > 1 ? 'bedrooms' : 'bedroom'}</span>
                  <span className="flex items-center gap-2"><Users className="h-4 w-4 text-gold" aria-hidden="true" />Sleeps {p.guests}</span>
                  <span className="font-serif text-xl">From {p.price} <span className="font-sans text-sm text-ink/60">/ night</span></span>
                </div>
                <div className="mt-8"><Btn variant="dark" href="#contact" onClick={() => onEnquire('Guest Enquiry')}>View Property</Btn></div>
              </Reveal>
            </article>))}
        </div>
      </div>
    </section>
  )
}
