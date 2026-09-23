import { useEffect, useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

const programs = [
  { number: '01', title: 'Strength Lab', text: 'Build real-world power with coached compound lifts and progressive programming.', tag: 'Barbell / 60 min', tone: 'lime' },
  { number: '02', title: 'Engine Room', text: 'High-output conditioning that makes everyday movement feel effortless.', tag: 'Conditioning / 45 min', tone: 'orange' },
  { number: '03', title: 'Athletic Flow', text: 'Mobility, balance, and speed work for a body that moves with intent.', tag: 'Movement / 50 min', tone: 'blue' },
]

const trainers = [
  { name: 'Maya Chen', role: 'Strength coach', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=85' },
  { name: 'Luca Moretti', role: 'Performance coach', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85' },
  { name: 'Nia Brooks', role: 'Mobility coach', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85' },
]

const testimonials = [
  { quote: 'IronVibe made training feel like a ritual I actually look forward to. I am stronger, sharper, and more consistent.', name: 'Riley K.', detail: 'Member for 18 months' },
  { quote: 'No ego, no intimidation. Just smart coaching and a room full of people who want to get better.', name: 'Samira J.', detail: 'Member for 9 months' },
  { quote: 'The programming keeps me progressing without burning me out. It is the first gym routine that has stuck.', name: 'Jon Bell', detail: 'Member for 2 years' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleSectionClick = (event, sectionId) => {
    event.preventDefault()
    setOpen(false)

    if (window.location.pathname !== '/') {
      navigate(`/#${sectionId}`)
      return
    }

    window.history.replaceState({}, '', `/#${sectionId}`)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return <header className="site-header">
    <Link className="brand" to="/" onClick={() => setOpen(false)}><span>IV</span> IRONVIBE</Link>
    <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}><i /><i /></button>
    <nav className={open ? 'site-nav is-open' : 'site-nav'}>
      <NavLink to="/#programs" onClick={(event) => handleSectionClick(event, 'programs')}>Programs</NavLink>
      <NavLink to="/#coaches" onClick={(event) => handleSectionClick(event, 'coaches')}>Coaches</NavLink>
      <NavLink to="/#membership" onClick={(event) => handleSectionClick(event, 'membership')}>Membership</NavLink>
      <Link className="button button--small" to="/join" onClick={() => setOpen(false)}>Start training <b>↗</b></Link>
    </nav>
  </header>
}

function ScrollToHash() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return

    const sectionId = hash.slice(1)
    const scrollToSection = () => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    const frame = window.requestAnimationFrame(scrollToSection)

    return () => window.cancelAnimationFrame(frame)
  }, [hash])

  return null
}

function SectionHeading({ eyebrow, title, copy }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>
}

function Home() {
  const [billing, setBilling] = useState('monthly')
  const [testimonial, setTestimonial] = useState(0)
  const navigate = useNavigate()
  const activeTestimonial = testimonials[testimonial]
  return <>
    <Navbar />
    <main>
      <section className="hero" id="top">
        <div className="hero__copy"><span className="eyebrow">Train different / Since 2014</span><h1>Built for<br /><em>more.</em></h1><p>A focused training space for people who are done waiting for motivation.</p><Link className="button" to="/join">Claim your first week <b>↗</b></Link></div>
        <div className="hero__visual"><div className="hero__circle"><img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1100&q=85" alt="Athlete training with a battle rope" /></div><span className="hero__stamp">Stronger<br />by design</span></div>
        <div className="hero__footer"><span>Scroll to explore</span><span className="line" /><span>01 — 04</span></div>
      </section>

      <section className="intro section-pad"><div className="intro__mark">[ IV ]</div><div><span className="eyebrow">The IronVibe standard</span><h2>Discipline is not a mood.<br /><span>It is a place you go.</span></h2></div><p>We built IronVibe for people who want a better relationship with training. Expert coaching, considered programming, and a room that raises your standard every time you walk in.</p></section>

      <section className="programs section-pad" id="programs"><SectionHeading eyebrow="01 / The work" title="Find your edge." copy="Three ways in. One goal: leave better than you arrived." /><div className="program-grid">{programs.map((program) => <article className={`program-card program-card--${program.tone}`} key={program.number}><div className="program-card__top"><span>{program.number}</span><span>{program.tag}</span></div><div><h3>{program.title}</h3><p>{program.text}</p></div><Link to="/join" aria-label={`Join ${program.title}`}>Explore <b>↗</b></Link></article>)}</div></section>

      <section className="manifesto"><div className="manifesto__image"><img src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=85" alt="Athlete preparing for a lift" /></div><div className="manifesto__copy"><span className="eyebrow">02 / The mindset</span><h2>Make your<br /><em>ordinary</em><br />exceptional.</h2><p>Small choices compound. We give you the structure, the tools, and the people to make yours count.</p><Link className="text-link" to="/join">Meet us on the floor <b>↗</b></Link></div></section>

      <section className="coaches section-pad" id="coaches"><SectionHeading eyebrow="03 / The people" title="Good energy is contagious." /><div className="trainer-grid">{trainers.map((trainer) => <article className="trainer" key={trainer.name}><div className="trainer__image"><img src={trainer.image} alt={trainer.name} /></div><div><h3>{trainer.name}</h3><span>{trainer.role}</span></div></article>)}</div></section>

      <section className="membership section-pad" id="membership"><div className="membership__intro"><span className="eyebrow">04 / Membership</span><h2>Show up.<br /><em>Level up.</em></h2><p>Choose the rhythm that keeps you moving. Every membership includes unlimited classes, open gym access, and a community that notices when you are not there.</p></div><div className="pricing"><div className="billing"><button className={billing === 'monthly' ? 'active' : ''} onClick={() => setBilling('monthly')}>Monthly</button><button className={billing === 'annual' ? 'active' : ''} onClick={() => setBilling('annual')}>Annual <small>Save 20%</small></button></div><div className="price-card"><span className="eyebrow">All access</span><div className="price">${billing === 'monthly' ? '149' : '119'}<small>/ month</small></div><ul><li>Unlimited coached classes</li><li>Open gym, any time</li><li>Quarterly progress session</li></ul><Link className="button button--dark" to="/join">Choose all access <b>↗</b></Link></div></div></section>

      <section className="quote-section"><div className="quote-section__header"><span className="eyebrow">05 / The feeling</span><div className="slider-controls"><button type="button" aria-label="Previous testimonial" onClick={() => setTestimonial((testimonial + testimonials.length - 1) % testimonials.length)}>←</button><span>0{testimonial + 1} / 0{testimonials.length}</span><button type="button" aria-label="Next testimonial" onClick={() => setTestimonial((testimonial + 1) % testimonials.length)}>→</button></div></div><blockquote>“{activeTestimonial.quote}”</blockquote><div className="quote-section__by"><strong>{activeTestimonial.name}</strong><span>{activeTestimonial.detail}</span></div></section>

      <section className="join-banner"><div><span className="eyebrow">Your next chapter starts here</span><h2>Ready to<br /><em>get after it?</em></h2></div><button className="button" onClick={() => navigate('/join')}>Start your story <b>↗</b></button></section>
    </main><Footer />
  </>
}

function Join() {
  const [sent, setSent] = useState(false)
  return <><Navbar /><main className="join-page"><div className="join-page__heading"><span className="eyebrow">Start your story</span><h1>Make your<br /><em>move.</em></h1><p>Tell us a little about yourself and we will get you set up with a complimentary intro session.</p></div><form className="join-form" onSubmit={(event) => { event.preventDefault(); setSent(true) }}>{sent ? <div className="success"><span className="success__mark">✓</span><h2>You are on your way.</h2><p>We will be in touch within one business day to book your intro session.</p><Link className="text-link" to="/">Back to the home page <b>↗</b></Link></div> : <><label>Full name<input required type="text" placeholder="Your name" /></label><label>Email address<input required type="email" placeholder="you@email.com" /></label><label>What are you looking for?<select defaultValue=""><option value="" disabled>Select one</option><option>Strength training</option><option>Conditioning</option><option>General fitness</option></select></label><button className="button" type="submit">Book my intro <b>↗</b></button></>}</form></main><Footer /></>
}

function Footer() { return <footer className="footer"><Link className="brand" to="/"><span>IV</span> IRONVIBE</Link><p>Train with intent.<br />Live with energy.</p><div className="footer__links"><a href="mailto:hello@ironvibe.fit">hello@ironvibe.fit</a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://www.google.com/maps/search/?api=1&query=Seattle%2C%20WA" target="_blank" rel="noreferrer">Seattle, WA ↗</a></div><small>© 2026 IronVibe Athletics</small></footer> }

export default function App() { return <BrowserRouter><ScrollToHash /><Routes><Route path="/" element={<Home />} /><Route path="/join" element={<Join />} /><Route path="*" element={<Home />} /></Routes></BrowserRouter> }
