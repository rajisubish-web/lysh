// One motion system for the whole site: GSAP + ScrollTrigger + SplitText, with Lenis for smooth scrolling.
// Components only add data-attributes (data-split, data-reveal, data-mask, data-speed...). All logic lives here.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'
gsap.registerPlugin(ScrollTrigger, SplitText)

const q = (s, r = document) => r.querySelector(s)
const qa = (s, r = document) => gsap.utils.toArray(s, r)
const EXPO = 'expo.out'
const safe = (fn) => { try { fn() } catch (e) { console.warn('[motion]', e) } }

export function initMotion() {
  const root = document.documentElement
  const done = () => root.classList.remove('anim-pending')
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { done(); return () => {} }

  const phone = innerWidth < 768, k = phone ? 0.5 : 1
  const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (t) => lenis.raf(t * 1000)
  gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0)
  const onClick = (e) => {
    const a = e.target.closest('a[href^="#"]'); if (!a) return
    const id = a.getAttribute('href'); const t = id.length > 1 && q(id); if (!t) return
    e.preventDefault()
    lenis.scrollTo(t, { offset: ['#home', '#properties'].includes(id) ? 0 : -70, duration: 1.8, easing: (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x)) })
  }
  document.addEventListener('click', onClick)

  /* ---------- 1. Cinematic hero ---------- */
  const hero = () => {
    if (!q('#home')) return
    lenis.stop()
    const s1 = SplitText.create('[data-hero-l1]', { type: 'lines,chars', mask: 'lines' })
    const s2 = SplitText.create('[data-hero-l2]', { type: 'lines,words', mask: 'lines' })
    s2.words.forEach((w) => w.classList.add('gold-text'))
    gsap.timeline({ defaults: { ease: EXPO }, onComplete: () => { done(); lenis.start() } })
      .fromTo('#curtain', { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.5, ease: 'expo.inOut' }, 0.2)
      .fromTo('[data-hero-zoom]', { scale: 1.4 }, { scale: 1.08, duration: 3.4 }, 0.2)
      .from('[data-header]', { yPercent: -100, opacity: 0, duration: 1.3 }, 1.1)
      .from(s1.chars, { yPercent: 120, rotate: 7, opacity: 0, duration: 1.4, stagger: 0.035 }, 0.95)
      .from(s2.words, { xPercent: 70, opacity: 0, duration: 1.6, stagger: 0.18 }, 1.35)
      .from('[data-hero-rule]', { scaleX: 0, duration: 1.3 }, 2)
      .from('[data-hero-p]', { y: 30, opacity: 0, duration: 1.2 }, 2.05)
      .from('[data-hero-cta]', { y: 30, opacity: 0, scale: 0.92, duration: 1.2 }, 2.3)
      .from('[data-hero-scroll]', { opacity: 0, duration: 1 }, 2.8)
      .to('[data-hero-zoom]', { scale: 1.02, duration: 20, ease: 'none' }, 3.6)
    // Crossfade between two interior photographs
    const b = q('[data-hero-b]')
    if (b) gsap.timeline({ repeat: -1, delay: 5 }).to(b, { opacity: 1, duration: 2.8, ease: 'sine.inOut' }).to(b, { opacity: 0, duration: 2.8, ease: 'sine.inOut' }, '+=6')
    // Scroll-linked depth: image scales and drifts, text lines travel in opposite directions
    const st = { trigger: '#home', start: 'top top', end: 'bottom top', scrub: true }
    gsap.to('[data-hero-bg]', { yPercent: 8, scale: 1.25, ease: 'none', scrollTrigger: st })
    gsap.to('[data-hero-dim]', { opacity: 0.85, ease: 'none', scrollTrigger: st })
    gsap.to('[data-hero-l1]', { xPercent: -9, ease: 'none', scrollTrigger: st })
    gsap.to('[data-hero-l2]', { xPercent: 9, ease: 'none', scrollTrigger: st })
    gsap.to('[data-hero-content]', { yPercent: -18, opacity: 0, ease: 'none', scrollTrigger: { ...st, end: '70% top' } })
  }

  /* ---------- 6. Typography ---------- */
  const texts = () => qa('[data-split]').forEach((el) => {
    const type = el.dataset.split || 'lines'
    const kind = type === 'chars' ? 'lines,chars' : type === 'words' ? 'lines,words' : 'lines'
    SplitText.create(el, {
      type: kind, mask: 'lines', autoSplit: true,
      onSplit(self) {
        const targets = type === 'chars' ? self.chars : type === 'words' ? self.words : self.lines
        return gsap.from(targets, { yPercent: 115, rotate: type === 'chars' ? 4 : 0, duration: 1.3, ease: EXPO, stagger: type === 'chars' ? 0.03 : 0.09, scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
      },
    })
  })

  /* ---------- 2. Scroll-triggered reveals ---------- */
  const reveals = () => {
    qa('[data-reveal]').forEach((el) => {
      const v = el.dataset.reveal
      gsap.from(el, { opacity: 0, y: v === 'up' ? 60 : 0, x: v === 'left' ? -90 : v === 'right' ? 90 : 0, duration: 1.5, ease: EXPO, delay: +el.dataset.delay || 0, scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
    })
    qa('[data-stagger]').forEach((c) => gsap.from(c.children, { opacity: 0, y: 50, duration: 1.2, ease: EXPO, stagger: 0.12, scrollTrigger: { trigger: c, start: 'top 85%', once: true } }))
    qa('[data-line]').forEach((el) => {
      const x = el.dataset.line === 'x'
      gsap.fromTo(el, x ? { scaleX: 0 } : { scaleY: 0 }, { scaleX: 1, scaleY: 1, duration: 1.6, ease: 'expo.inOut', delay: +el.dataset.delay || 0, scrollTrigger: { trigger: el, start: 'top 92%', once: true } })
    })
    qa('[data-draw]').forEach((p) => gsap.fromTo(p, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2, ease: 'power2.inOut', delay: +p.dataset.delay || 0, scrollTrigger: { trigger: p, start: 'top 95%', once: true } }))
  }

  /* ---------- 4. Image masks, zoom and depth ---------- */
  const maskIn = (el, st, axis = 'y') => {
    gsap.fromTo(el, { clipPath: axis === 'x' ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.7, ease: 'expo.inOut', scrollTrigger: st })
    gsap.fromTo(q('img', el), { scale: 1.55 }, { scale: 1.18, duration: 2.4, ease: EXPO, scrollTrigger: st })
  }
  const images = () => qa('[data-mask]:not([data-stays-img])').forEach((el) => {
    const img = q('img', el)
    if (el.dataset.mask === 'expand') { // full-width image that opens up as you scroll
      const st = { trigger: el, start: 'top 95%', end: 'top 25%', scrub: true }
      gsap.fromTo(el, { clipPath: 'inset(14% 18% 14% 18%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: st })
      gsap.fromTo(img, { scale: 1.45 }, { scale: 1.15, ease: 'none', scrollTrigger: st })
    } else maskIn(el, { trigger: el, start: 'top 85%', once: true })
    gsap.fromTo(img, { yPercent: -8 * k }, { yPercent: 8 * k, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
  })

  /* ---------- 5. Layers, drift, colour shifts ---------- */
  const layers = () => {
    qa('[data-speed]').forEach((el) => { const s = +el.dataset.speed * k; gsap.fromTo(el, { yPercent: -s }, { yPercent: s, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }) })
    qa('[data-drift]').forEach((el) => { const d = +el.dataset.drift * k; gsap.fromTo(el, { x: d }, { x: -d, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } }) })
    gsap.fromTo('#about', { backgroundColor: '#F6EBDD' }, { backgroundColor: '#F1E4D4', ease: 'none', scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'top 30%', scrub: true } })
  }

  /* ---------- 7. Contact enters as an expanding panel ---------- */
  const contact = () => {
    const c = q('[data-contact]'); if (!c) return
    const st = { trigger: c, start: 'top bottom', end: 'top 25%', scrub: true }
    gsap.fromTo(c, { clipPath: phone ? 'inset(5% 3% 0% 3%)' : 'inset(12% 6% 0% 6%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: st })
    gsap.fromTo('[data-contact-inner]', { yPercent: 8 }, { yPercent: 0, ease: 'none', scrollTrigger: st })
  }

  /* ---------- Ambient loops and scroll progress ---------- */
  const loops = () => {
    qa('[data-float]').forEach((el, i) => gsap.to(el, { y: '+=10', duration: 3 + (i % 3), ease: 'sine.inOut', yoyo: true, repeat: -1 }))
    qa('[data-sway]').forEach((g, i) => gsap.to(g, { rotation: 4, transformOrigin: '0% 50%', duration: 5 + i, ease: 'sine.inOut', yoyo: true, repeat: -1 }))
    qa('[data-dust]').forEach((d) => {
      const dur = +d.dataset.dur
      gsap.timeline({ repeat: -1, delay: +d.dataset.delay }).set(d, { opacity: 0, y: 0 }).to(d, { y: '-75vh', duration: dur, ease: 'none' }, 0).to(d, { opacity: 0.7, duration: dur * 0.2 }, 0).to(d, { opacity: 0, duration: dur * 0.2 }, dur * 0.8)
    })
    const cue = q('[data-cue]')
    if (cue) gsap.timeline({ repeat: -1 }).fromTo(cue, { scaleY: 0, transformOrigin: 'top' }, { scaleY: 1, duration: 1.1, ease: 'power2.inOut' }).to(cue, { scaleY: 0, transformOrigin: 'bottom', duration: 1.1, ease: 'power2.inOut' })
    gsap.to('[data-progress]', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } })
  }

  /* ---------- 1 + 3. Desktop only: hero curtain and horizontal property showcase ---------- */
  const heroPin = () => { if (q('#home')) ScrollTrigger.create({ trigger: '#home', start: 'top top', end: 'bottom top', pin: true, pinSpacing: false }) }
  const stayText = (p, st) => {
    const t = q('[data-stays-title]', p)
    if (t) { const s = SplitText.create(t, { type: 'lines,chars', mask: 'lines' }); gsap.from(s.chars, { yPercent: 115, duration: 1.2, ease: EXPO, stagger: 0.03, scrollTrigger: st }) }
    gsap.from(qa('[data-stays-text] > :not([data-stays-title])', p), { y: 36, opacity: 0, duration: 1.2, ease: EXPO, stagger: 0.1, delay: 0.25, scrollTrigger: st })
  }
  const staysH = () => {
    const sec = q('[data-stays]'); if (!sec) return
    const pin = q('[data-stays-pin]', sec), track = q('[data-stays-track]', sec)
    sec.classList.add('stays-h')
    const dist = () => Math.max(0, track.scrollWidth - innerWidth)
    const base = { trigger: pin, start: 'top top', end: () => '+=' + dist(), invalidateOnRefresh: true }
    const tween = gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { ...base, pin: true, scrub: 0.8, anticipatePin: 1 } })
    gsap.to('[data-stays-progress]', { scaleX: 1, ease: 'none', scrollTrigger: { ...base, scrub: true } })
    gsap.fromTo(sec, { backgroundColor: '#F6EBDD' }, { backgroundColor: '#EDE0CE', ease: 'none', scrollTrigger: { ...base, scrub: true } })
    qa('[data-stays-panel]', sec).forEach((p, i) => {
      const st = i === 0 ? { trigger: sec, start: 'top 55%', once: true } : { trigger: p, containerAnimation: tween, start: 'left 85%', once: true }
      maskIn(q('[data-mask]', p), st, 'x')
      stayText(p, st)
      gsap.fromTo(q('[data-mask] img', p), { xPercent: -9 }, { xPercent: 9, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } })
    })
    return () => sec.classList.remove('stays-h')
  }
  const staysV = () => qa('[data-stays-panel]').forEach((p) => {
    const st = { trigger: p, start: 'top 82%', once: true }
    maskIn(q('[data-mask]', p), st); stayText(p, st)
    gsap.fromTo(q('[data-mask] img', p), { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: p, start: 'top bottom', end: 'bottom top', scrub: true } })
  })

  /* ---------- 5 + 8. Mouse-driven 3D tilt and magnetic buttons (fine pointers only) ---------- */
  const pointerFx = () => {
    const off = []
    qa('[data-tilt]').forEach((el) => {
      const zoom = q('[data-zoom]', el)
      gsap.set(el, { transformPerspective: 1100 })
      const rx = gsap.quickTo(el, 'rotationX', { duration: 0.9, ease: 'power3' }), ry = gsap.quickTo(el, 'rotationY', { duration: 0.9, ease: 'power3' })
      const zx = gsap.quickTo(zoom, 'x', { duration: 1, ease: 'power3' }), zy = gsap.quickTo(zoom, 'y', { duration: 1, ease: 'power3' })
      const move = (e) => { const r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5; ry(px * 9); rx(-py * 9); zx(-px * 26); zy(-py * 26) }
      const enter = () => gsap.to(zoom, { scale: 1.08, duration: 1.4, ease: EXPO })
      const leave = () => { rx(0); ry(0); zx(0); zy(0); gsap.to(zoom, { scale: 1, duration: 1.2, ease: EXPO }) }
      el.addEventListener('mousemove', move); el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave)
      off.push(() => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave) })
    })
    qa('[data-magnetic]').forEach((el) => {
      const xt = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' }), yt = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' })
      const move = (e) => { const r = el.getBoundingClientRect(); xt((e.clientX - r.left - r.width / 2) * 0.22); yt((e.clientY - r.top - r.height / 2) * 0.3) }
      const leave = () => { xt(0); yt(0) }
      el.addEventListener('mousemove', move); el.addEventListener('mouseleave', leave)
      off.push(() => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave) })
    })
    return () => off.forEach((f) => f())
  }

  const onLoad = () => ScrollTrigger.refresh()
  addEventListener('load', onLoad)
  const mm = gsap.matchMedia()
  mm.add('(prefers-reduced-motion: no-preference)', () => { [hero, texts, reveals, images, layers, contact, loops].forEach(safe) })
  mm.add('(min-width: 1024px)', () => { safe(heroPin); let off; safe(() => { off = staysH() }); return off })
  mm.add('(max-width: 1023px)', () => safe(staysV))
  mm.add('(hover: hover) and (pointer: fine)', () => pointerFx())
  ScrollTrigger.sort(); ScrollTrigger.refresh()
  const failsafe = setTimeout(() => { done(); lenis.start() }, 6000)

  return () => { removeEventListener('load', onLoad); clearTimeout(failsafe); mm.revert(); document.removeEventListener('click', onClick); gsap.ticker.remove(tick); lenis.destroy() }
}
