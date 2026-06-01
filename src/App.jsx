import React, { useState } from 'react'

const navLinks = [
  { label: 'About SST', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'NSET Guide', href: '#guide' },
  { label: 'FAQ', href: '#faq' },
]

const experienceCards = [
  {
    mini: 'Learning environment',
    title: 'Coding-first peer group',
    text: 'Many students spend time on coding, projects, and development. That makes the peer environment feel more aligned with software engineering.',
  },
  {
    mini: 'Campus life',
    title: 'Campus and hostel',
    text: 'The campus is smaller than large traditional universities, but the surrounding area is calm and green. Hostel accommodation is nearby, and students also get access to gym options.',
  },
  {
    mini: 'Things to weigh',
    title: 'Important tradeoffs',
    text: 'SST is still relatively new compared to older engineering colleges, and the fees are higher than many traditional options. Those are valid concerns and should be part of the decision.',
  },
]

const guideCards = [
  {
    title: 'What is in NSET?',
    bullets: ['Mathematics', 'Logical Reasoning'],
    body: 'The maths section can be fairly difficult, so it should not be ignored. Logical reasoning is also important because it helps maximize the overall score.',
  },
  {
    title: 'How to think about preparation',
    bullets: ['Practice mathematics consistently', 'Work on logical reasoning speed and accuracy', 'Remember there is an individual cutoff for mathematics', 'Be ready for interview rounds after the written exam'],
  },
  {
    title: 'Interview flow',
    body: 'After the written test, candidates usually go through multiple interview rounds. A common pattern is 2 to 3 interviews, depending on performance and process flow.',
    body2: 'Treat the exam as one part of the process. The interviews are where communication, curiosity, and fundamentals start to matter just as much.',
  },
]

const faqs = [
  {
    q: 'Is Scaler School of Technology worth it?',
    a: 'It depends on your priorities. If you want a software-first environment, active peer learning, and are comfortable with the fees and format, SST can be a strong option. If you want a broader traditional engineering route, a standard BTech may fit better.',
  },
  {
    q: 'Is NSET difficult?',
    a: 'It is manageable with preparation, but the maths portion is not something to take lightly. Strong fundamentals, speed, and accuracy matter.',
  },
  {
    q: 'Is there an interview after NSET?',
    a: 'Yes. Candidates who clear the written round usually move into interview rounds before a final decision is made.',
  },
  {
    q: 'What is the Scaler NSET referral code?',
    a: 'The code on this page is DEEP6F37. Use it during registration to claim the discount shown in the referral card above.',
  },
]

export default function App() {
  const [copied, setCopied] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText('DEEP6F37')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch (error) {
      window.prompt('Copy the referral code:', 'DEEP6F37')
    }
  }

  return (
    <>
      <div className="top-bar" />
      <header className="nav">
        <div className="nav-inner">
          <a className="brand" href="#home"><span className="brand-dot" />Scaler NSET Guide</a>
          <nav className="nav-links" aria-label="Primary">
            {navLinks.map((link, index) => (
              <a key={link.href} className={index === 0 ? 'active' : ''} href={link.href}>{link.label}</a>
            ))}
            <a className="cta" href="#code">Get Code</a>
          </nav>
        </div>
      </header>

      <main className="page" id="home">
        <section className="section hero">
          <div>
            <div className="chip">Official-style SST guide</div>
            <div className="eyebrow">Student-written guide</div>
            <h1 className="title">Scaler NSET Guide<br /><span className="accent">+ Referral Code</span></h1>
            <p className="lede">This page is for students researching Scaler School of Technology, the NSET exam, and whether SST makes sense compared to more traditional college paths.</p>
            <div className="hero-actions-row">
              <button className="primary-btn" onClick={() => document.getElementById('code').scrollIntoView({ behavior: 'smooth' })}>Get referral code</button>
              <button className="ghost-btn" onClick={() => document.getElementById('guide').scrollIntoView({ behavior: 'smooth' })}>Read NSET guide</button>
            </div>
            <div className="tabs-strip" aria-label="Quick section navigation">
              <button className="tab-pill active">Highlights</button>
              <button className="tab-pill">Programmes</button>
              <button className="tab-pill">Outcomes</button>
              <button className="tab-pill">Why SST</button>
              <button className="tab-pill">Campus Life</button>
              <button className="tab-pill">Admissions</button>
              <button className="tab-pill">FAQs</button>
            </div>
          </div>

          <div className="hero-media" aria-label="Campus visual">
            <div className="hero-media-overlay">
              <div className="hero-media-meta">
                <span>Scaler School of Technology</span>
                <span>Campus View</span>
              </div>
              <p className="hero-media-title">Use the campus image here once it is added to the repo as <span style={{ color: 'var(--accent-2)' }}>assets/scaler-campus.jpg</span>.</p>
              <p className="subcopy">This panel is intentionally styled to feel like a Scaler editorial section, not a generic marketing card.</p>
            </div>
          </div>
        </section>

        <section className="section" id="code">
          <div className="story-band">
            <article className="story-card">
              <div className="story-visual" />
              <div className="story-body">
                <h3>NSET referral code</h3>
                <div className="code-row">
                  <p className="code">DEEP6F37</p>
                  <button className="copy-btn" aria-label={copied ? 'Copied referral code' : 'Copy referral code'} onClick={copyCode}>
                    <span className="copy-icon" aria-hidden="true" />
                  </button>
                </div>
                <p className="subcopy">Use during registration for a <strong style={{ color: 'var(--accent)' }}>₹500 off</strong> the exam fee.</p>
              </div>
            </article>

            <article className="story-card">
              <div className="story-body">
                <h3>Quick facts</h3>
                <div className="stats" style={{ borderTop: 'none', paddingTop: 0, marginTop: 0 }}>
                  <div className="stat"><div className="kicker">Subjects</div><p className="value">Maths + LR</p></div>
                  <div className="stat"><div className="kicker">Interviews</div><p className="value">2-3 rounds</p></div>
                  <div className="stat"><div className="kicker">Campus</div><p className="value">Bengaluru</p></div>
                  <div className="stat"><div className="kicker">Focus</div><p className="value">Software Dev</p></div>
                </div>
                <div className="muted-box" style={{ marginTop: '22px' }}>This section can be swapped to the exact attached image if you drop that file into <strong>assets/scaler-campus.jpg</strong>.</div>
              </div>
            </article>
          </div>
        </section>

        <section className="section" id="about">
          <div className="eyebrow">01.</div>
          <h2 className="title">What is Scaler School of Technology?</h2>
          <div className="grid-2">
            <article className="card">
              <h3>Built for software-first learning</h3>
              <p className="subcopy">Scaler School of Technology is a software-focused undergraduate path based in Bengaluru. The big difference from a traditional BTech route is the curriculum focus: more software development, computer science fundamentals, and problem solving early on.</p>
              <div className="muted-box">For many students, the real comparison is not just whether SST is "good" or "bad", but whether they want a deeper software-oriented environment from the start.</div>
            </article>

            <article className="card">
              <h3>What stands out in practice</h3>
              <ul className="bullets">
                <li>Software-focused learning environment</li>
                <li>Bengaluru-based campus with hostel accommodation nearby</li>
                <li>Peer group that is generally more coding-oriented</li>
                <li>Alternative route for students comparing JEE, CUET, private entrances, and other college options</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="section" id="experience">
          <div className="eyebrow">02.</div>
          <h2 className="title">Student Experience</h2>
          <div className="grid-3">
            {experienceCards.map((card) => (
              <article className="card" key={card.title}>
                <div className="mini">{card.mini}</div>
                <h3>{card.title}</h3>
                <p className="subcopy">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="guide">
          <div className="eyebrow">03.</div>
          <h2 className="title">NSET Exam Guide</h2>
          <div className="grid-3">
            {guideCards.map((card) => (
              <article className="card" key={card.title}>
                <h3>{card.title}</h3>
                {card.bullets ? <ul className="bullets">{card.bullets.map((item) => <li key={item}>{item}</li>)}</ul> : null}
                {card.body && <div className="muted-box">{card.body}</div>}
                {card.body2 && <div className="muted-box">{card.body2}</div>}
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="faq">
          <div className="eyebrow">04.</div>
          <h2 className="title">FAQ</h2>
          <div className="faq" role="list">
            {faqs.map((item, index) => {
              const open = openFaq === index
              return (
                <div className={`faq-item ${open ? 'open' : ''}`} role="listitem" key={item.q}>
                  <button className="faq-question" onClick={() => setOpenFaq(open ? -1 : index)}>
                    <span>{item.q}</span>
                    <span aria-hidden="true">⌄</span>
                  </button>
                  <div className="faq-answer">{item.a}</div>
                </div>
              )
            })}
          </div>
        </section>

        <p className="footer-note">Vite React app — preview migrated. Add the campus image at <strong>assets/scaler-campus.jpg</strong> to show the photo.</p>
      </main>
    </>
  )
}
