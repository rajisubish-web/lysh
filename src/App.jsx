import { useEffect, useState } from 'react'
import { initMotion } from './motion/animations'
import Header from './components/Header'
import Hero from './components/Hero'
import Split from './components/Split'
import About from './components/About'
import Approach from './components/Approach'
import Properties from './components/Properties'
import Contact from './components/Contact'
import Footer from './components/Footer'
export default function App() {
  const [enquiry, setEnquiry] = useState('')
  useEffect(() => {
    let off = () => {}, gone = false
    ;(document.fonts?.ready || Promise.resolve()).then(() => { if (!gone) off = initMotion() })
    return () => { gone = true; off() }
  }, [])
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:bg-gold focus:px-4 focus:py-2">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <div className="relative z-10">
          <Split onEnquire={setEnquiry} /><About /><Approach /><Properties onEnquire={setEnquiry} /><Contact enquiry={enquiry} setEnquiry={setEnquiry} />
        </div>
      </main>
      <div className="relative z-10"><Footer /></div>
    </>
  )
}
