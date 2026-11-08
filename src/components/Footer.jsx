import { useRef, useState } from 'react'
import { Instagram, Linkedin, X } from 'lucide-react'
import { LINKS } from '../data'
import { Logo } from './ui'
const DOCS = {
  'Privacy Policy': ['This is dummy text. Replace it with LYSH Living’s approved privacy policy before launch.', 'We collect the details you submit through our contact form (name, email and message) only to respond to your enquiry. We do not sell your data.', 'You can ask us to access or delete your information at any time by emailing hello@lyshliving.co.uk.'],
  'Terms & Conditions': ['This is dummy text. Replace it with LYSH Living’s approved terms and conditions before launch.', 'Property descriptions, availability and prices shown on this site are for illustration and may change without notice.', 'Bookings and management agreements are confirmed only in writing by LYSH Living.'],
}
export default function Footer() {
  const ref = useRef(null), [doc, setDoc] = useState('')
  const show = (d) => { setDoc(d); ref.current.showModal() }
  return (
    <footer className="border-t border-gold/50 bg-green py-10 text-cream/90">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-6 px-6 text-center lg:flex-row lg:px-12 lg:text-left">
        <Logo className="text-4xl" />
        <span className="hidden h-14 w-px bg-gold/50 lg:block" aria-hidden="true" />
        <div className="flex items-center gap-4 text-sm text-gold">{Object.keys(DOCS).map((d, i) => <span key={d} className="flex items-center gap-4">{i > 0 && <span className="h-5 w-px bg-gold/50" aria-hidden="true" />}<button onClick={() => show(d)} className="hover:text-cream">{d}</button></span>)}</div>
        <p className="text-sm text-gold lg:mx-auto">© {new Date().getFullYear()} LYSH Living. All rights reserved.</p>
        <div className="flex gap-5 text-cream">
          <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="LYSH Living on Instagram" className="hover:text-gold"><Instagram strokeWidth={1.5} /></a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LYSH Living on LinkedIn" className="hover:text-gold"><Linkedin strokeWidth={1.25} /></a>
        </div>
      </div>
      <dialog ref={ref} className="max-h-[80vh] w-[90vw] max-w-xl overflow-auto bg-cream p-8 text-ink backdrop:bg-green/80" aria-labelledby="doc-t">
        <div className="flex items-start justify-between gap-6"><h2 id="doc-t" className="font-serif text-3xl text-green">{doc}</h2>
          <button onClick={() => ref.current.close()} aria-label="Close"><X /></button></div>
        {(DOCS[doc] || []).map((t) => <p key={t} className="mt-4">{t}</p>)}
      </dialog>
    </footer>
  )
}
