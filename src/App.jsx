import { useState } from 'react'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState('Explore')

  function handleLogin(event) {
    event.preventDefault()
    if (email && password) setIsLoggedIn(true)
  }

  if (!isLoggedIn) {
    return (
      <main className="auth-page">
        <section className="auth-visual" aria-label="Travel inspiration">
          <div className="brand brand-light"><span className="brand-mark">✦</span> roamly</div>
          <div className="visual-copy"><p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p><h1>Go somewhere<br /><em>worth remembering.</em></h1><p>Curated stays, local experiences, and little moments that make a trip feel like yours.</p></div>
          <div className="photo-credit">SANTORINI, GREECE <span>●</span> 36.39° N, 25.46° E</div>
        </section>
        <section className="auth-panel">
          <div className="brand brand-dark"><span className="brand-mark">✦</span> roamly</div>
          <div className="auth-form-wrap"><p className="eyebrow">WELCOME BACK</p><h2>Let’s get you<br />back out there.</h2><p className="form-intro">Sign in to pick up where you left off.</p>
            <form onSubmit={handleLogin}><label htmlFor="email">Email address</label><input id="email" type="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required /><div className="label-row"><label htmlFor="password">Password</label><a href="#forgot">Forgot password?</a></div><input id="password" type="password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} required /><button className="primary-button" type="submit">Sign in <span>↗</span></button></form>
            <p className="signup-prompt">New to roamly? <a href="#signup">Create an account</a></p><div className="or-divider"><span>or continue with</span></div><div className="social-buttons"><button type="button">G <span>Google</span></button><button type="button"> <span>Apple</span></button></div>
          </div><p className="legal">By continuing, you agree to our <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</p>
        </section>
      </main>
    )
  }

  return (
    <main className="app-shell">
      <header className="topbar"><div className="brand brand-dark"><span className="brand-mark">✦</span> roamly</div><nav>{['Explore', 'Trips', 'Saved'].map((tab) => <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>{tab}</button>)}</nav><button className="profile-button" onClick={() => setIsLoggedIn(false)}><span>HA</span><strong>Harper Allen</strong><small>⌄</small></button></header>
      <div className="home-content"><section className="welcome-row"><div><p className="eyebrow">WEDNESDAY, JUNE 18, 2025</p><h1>Where to next, <em>Harper?</em></h1><p className="subheading">The world is waiting. Let’s find your way into it.</p></div><div className="weather"><span>☀</span><div><strong>24°</strong><small>Lisbon, Portugal</small></div></div></section><section className="search-bar"><span>⌕</span><input placeholder="Search destinations, stays, or experiences" /><button>Search <span>↗</span></button></section><section className="section-heading"><div><p className="eyebrow">HANDPICKED FOR YOU</p><h2>Find your next feeling</h2></div><a href="#all">View all <span>→</span></a></section><section className="destination-grid"><article className="destination-card tall card-algarve"><div className="card-tag">SLOW TRAVEL</div><div className="card-copy"><h3>Algarve,<br /><em>Portugal</em></h3><p>Cliffside mornings & saltwater afternoons</p></div></article><article className="destination-card card-kyoto"><div className="card-tag">IN SEASON</div><div className="card-copy"><h3>Kyoto,<br /><em>Japan</em></h3><p>Find stillness in the details</p></div></article><article className="destination-card card-patagonia"><div className="card-tag">FOR THE WILD</div><div className="card-copy"><h3>Patagonia,<br /><em>Chile</em></h3><p>Further than you’ve been before</p></div></article></section><section className="bottom-row"><div><p className="eyebrow">YOUR TRAVEL NOTEBOOK</p><h2>Keep exploring</h2></div><div className="note-card"><span className="note-icon">✦</span><div><strong>“Not all those who wander are lost.”</strong><small>— J.R.R. Tolkien</small></div><span className="arrow">↗</span></div></section></div>
    </main>
  )
}

export default App
