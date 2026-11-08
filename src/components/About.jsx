import { Btn, GoldRule, GrowLine, Logo, Reveal } from './ui'
export default function About() {
  return (
    <section id="about" className="border-t border-gold/20 bg-beige/60 py-20 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[1fr_auto_1fr] md:gap-16">
        <div>
          <h2 data-split="words" className="font-serif text-4xl text-ink md:text-5xl">About LYSH Living</h2>
          <GoldRule data-line="x" className="mt-4" />
          <p data-split="lines" className="mt-6 max-w-lg text-lg leading-relaxed text-ink">We specialise in high-quality serviced accommodation, combining comfort, style and exceptional service. Our mission is simple — to create beautiful spaces and memorable stays, while providing trusted property management solutions for landlords.</p>
          <Reveal className="mt-8"><Btn variant="dark" href="#approach">Our Approach</Btn></Reveal>
        </div>
        <GrowLine className="hidden h-60 md:block" />
        <Reveal variant="right" className="relative flex flex-col items-center py-8 text-center">
          <span aria-hidden="true" data-speed="14" className="absolute inset-x-6 inset-y-0 border border-gold/40" />
          <span aria-hidden="true" data-speed="-10" className="absolute inset-x-14 -inset-y-3 border border-gold/25" />
          <div data-float="" className="relative"><Logo tone="dark" className="text-[5.5rem] md:text-[7.5rem]" /></div>
          <p className="relative mt-10 text-sm tracking-[0.35em] text-ink">STAY · RELAX · BELONG</p>
        </Reveal>
      </div>
    </section>
  )
}
