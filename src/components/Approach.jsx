import { APPROACH, IMG } from '../data'
import { GrowLine, H2, ImageReveal, Reveal } from './ui'
export default function Approach() {
  return (
    <section id="approach" className="bg-forest py-24 text-cream md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal><H2>Our Approach</H2><p className="mt-4 max-w-xl text-cream/75">Four principles guide every stay we create and every property we manage.</p></Reveal>
        <ImageReveal src={IMG('1618221195710-dd6b41faaea6', 2000)} alt="Elegant serviced apartment living room" className="mt-12 aspect-[21/9]" />
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {APPROACH.map(({ icon: I, title, text }, i) => (
            <Reveal key={title} delay={i * 0.12} className="group">
              <GrowLine axis="x" delay={i * 0.12} className="block w-full" />
              <I className="mt-6 h-8 w-8 text-gold transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110" strokeWidth={1} aria-hidden="true" />
              <h3 className="mt-5 font-serif text-2xl leading-snug">{title}</h3>
              <p className="mt-3 text-sm text-cream/70">{text}</p>
            </Reveal>))}
        </div>
      </div>
    </section>
  )
}
