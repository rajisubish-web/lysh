import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Instagram, ChevronDown } from 'lucide-react'
import { LINKS } from '../data'
import { Btn, Reveal } from './ui'
const TYPES = ['Guest Enquiry', 'Landlord Enquiry', 'General Enquiry']
const inp = 'w-full rounded-xl border border-gold/60 bg-transparent px-4 py-3 text-cream placeholder:text-cream/70 focus:border-gold focus:outline-none aria-[invalid=true]:border-red-300'
const Field = ({ id, label, error, children }) => (
  <div><label htmlFor={id} className="sr-only">{label}</label>{children}{error && <p id={`${id}-e`} className="mt-1 text-sm text-red-300">{error}</p>}</div>
)
const Leaves = () => (
  <svg className="pointer-events-none absolute -left-16 bottom-0 hidden h-72 w-72 lg:block" viewBox="0 0 300 300" aria-hidden="true">
    {[[40, 250, -70, 1, 5], [30, 230, -30, 0.85, 6.5], [60, 270, -105, 0.7, 5.5], [20, 200, 5, 0.6, 7]].map(([x, y, r, s, d], i) => (
      <g key={i} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
        <motion.g style={{ transformBox: 'fill-box', transformOrigin: '0% 50%' }} animate={{ rotate: [0, 3.5, 0, -2, 0] }} transition={{ duration: d, repeat: Infinity, ease: 'easeInOut' }}>
          <path d="M0 0C30-70 150-90 230-30 150 40 40 50 0 0Z" fill={i % 2 ? '#1f3a2b' : '#264636'} />
          <path d="M0 0C80-20 160-25 225-30" stroke="#C5A16E" strokeOpacity=".35" fill="none" />
        </motion.g>
      </g>))}
  </svg>
)
export default function Contact({ enquiry, setEnquiry }) {
  const [v, setV] = useState({ name: '', email: '', message: '' }), [err, setErr] = useState({}), [status, setStatus] = useState('idle')
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value })
  const a = (k) => ({ 'aria-invalid': !!err[k], 'aria-describedby': err[k] ? `${k}-e` : undefined })
  async function submit(e) {
    e.preventDefault()
    const er = {}
    if (!v.name.trim()) er.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(v.email)) er.email = 'Please enter a valid email address.'
    if (!enquiry) er.type = 'Please choose an enquiry type.'
    if (v.message.trim().length < 10) er.message = 'Please write at least 10 characters.'
    setErr(er); if (Object.keys(er).length) return
    setStatus('sending')
    try {
      // TODO: send to your backend or a form service, e.g. await fetch('/api/enquiry', { method: 'POST', body: JSON.stringify({ ...v, enquiry }) })
      await new Promise((r) => setTimeout(r, 700))
      setStatus('sent'); setV({ name: '', email: '', message: '' }); setEnquiry('')
    } catch { setStatus('error') }
  }
  return (
    <section id="contact" className="relative overflow-hidden bg-green py-20 text-cream md:py-24">
      <Leaves />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <Reveal className="lg:pl-24">
          <h2 className="font-serif text-4xl md:text-5xl">Get in Touch</h2>
          <p className="mt-3 text-lg">We'd love to hear from you.</p>
          <ul className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-gold">
            <li><a href={`mailto:${LINKS.email}`} className="flex items-center gap-3 hover:text-cream"><Mail className="h-6 w-6" strokeWidth={1.25} aria-hidden="true" />{LINKS.email}</a></li>
            <li className="hidden h-10 w-px bg-gold/50 sm:block" aria-hidden="true" />
            <li><a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-cream"><Instagram className="h-6 w-6" strokeWidth={1.25} aria-hidden="true" />Follow us</a></li>
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <form onSubmit={submit} noValidate className="grid gap-3">
            <Field id="name" label="Your Name" error={err.name}><input id="name" placeholder="Your Name" autoComplete="name" value={v.name} onChange={set('name')} className={inp} {...a('name')} /></Field>
            <Field id="email" label="Your Email" error={err.email}><input id="email" type="email" placeholder="Your Email" autoComplete="email" value={v.email} onChange={set('email')} className={inp} {...a('email')} /></Field>
            <Field id="type" label="Enquiry Type" error={err.type}>
              <div className="relative"><select id="type" value={enquiry} onChange={(e) => setEnquiry(e.target.value)} className={`${inp} appearance-none ${enquiry ? '' : 'text-cream/70'}`} aria-invalid={!!err.type} aria-describedby={err.type ? 'type-e' : undefined}>
                <option value="" disabled className="bg-green">Enquiry Type</option>{TYPES.map((t) => <option key={t} className="bg-green text-cream">{t}</option>)}</select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2" aria-hidden="true" /></div>
            </Field>
            <Field id="message" label="Your Message" error={err.message}><textarea id="message" rows={3} placeholder="Your Message" value={v.message} onChange={set('message')} className={inp} {...a('message')} /></Field>
            <Btn type="submit" disabled={status === 'sending'} className="mt-1 w-full">{status === 'sending' ? 'Sending…' : 'Send Message'}</Btn>
            <p role="status" className="text-sm text-gold">{status === 'sent' && 'Thank you. Your message has been sent and we will reply shortly.'}{status === 'error' && 'Something went wrong. Please email us directly.'}</p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
