import { House, Handshake } from 'lucide-react'
import { Btn, GrowLine, Reveal } from './ui'
const Col = ({ id, icon: I, title, sub, text, btn, x, delay }) => (
  <div id={id} className="scroll-mt-20 px-6 py-14 md:px-14 md:py-16">
    <Reveal x={x} className="mx-auto max-w-md text-center">
      <span className="inline-block motion-safe:animate-float" style={{ animationDelay: delay }}><I className="mx-auto h-14 w-14 text-ink" strokeWidth={1} aria-hidden="true" /></span>
      <h2 className="mt-3 font-serif text-4xl text-ink md:text-5xl">{title}</h2>
      <p className="mt-3 text-xl text-ink">{sub}</p>
      <p className="mx-auto mt-3 max-w-sm text-ink/85">{text}</p>
      <div className="mt-6">{btn}</div>
    </Reveal>
  </div>
)
export default function Split({ onEnquire }) {
  return (
    <section className="bg-cream">
      <div className="relative mx-auto grid max-w-6xl md:grid-cols-2 md:py-4">
        <GrowLine className="absolute left-1/2 top-6 hidden h-[calc(100%-3rem)] md:block" />
        <Col id="guests" icon={House} x={-40} delay="0s" title="For Guests" sub="Your home away from home." text="Discover comfortable, stylish accommodation for work, relocation or leisure."
          btn={<Btn variant="link" href="#properties" onClick={() => onEnquire('Guest Enquiry')}>Find Out More</Btn>} />
        <Col id="landlords" icon={Handshake} x={40} delay="1.5s" title="For Landlords" sub="Your property. Our expertise." text="Partner with LYSH Living and let us manage your property with care and professionalism."
          btn={<Btn variant="link" href="#contact" onClick={() => onEnquire('Landlord Enquiry')}>Let's Talk</Btn>} />
      </div>
    </section>
  )
}
