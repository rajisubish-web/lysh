import { Btn, GoldRule, GrowLine, Logo, Reveal } from './ui'
export default function About() {
  return (
    <section id="about" className="border-t border-gold/20 bg-beige/60 py-20 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[1fr_auto_1fr] md:gap-16">
        <Reveal x={-40}>
          <h2 className="font-serif text-4xl text-ink md:text-5xl">About LYSH Living</h2>
          <GoldRule className="mt-4" />
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink">We specialise in high-quality serviced accommodation, combining comfort, style and exceptional service. Our mission is simple — to create beautiful spaces and memorable stays, while providing trusted property management solutions for landlords.</p>
          <div className="mt-8"><Btn variant="dark" href="#approach">Our Approach</Btn></div>
        </Reveal>
        <GrowLine className="hidden h-60 md:block" />
        <Reveal delay={0.15} x={40} className="flex flex-col items-center text-center">
          <div className="motion-safe:animate-float"><Logo tone="dark" className="text-[5.5rem] md:text-[7.5rem]" /></div>
          <p className="mt-10 text-sm tracking-[0.35em] text-ink">STAY · RELAX · BELONG</p>
        </Reveal>
      </div>
    </section>
  )
}
