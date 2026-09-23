import { useState } from 'react'
import './App.css'

const initialDestinations = [
  { id: 1, name: 'Algarve', location: 'Portugal', category: 'Slow travel', description: 'Cliffside mornings and saltwater afternoons.', image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=900&q=85' },
  { id: 2, name: 'Kyoto', location: 'Japan', category: 'Culture', description: 'Find stillness in the details.', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=85' },
  { id: 3, name: 'Patagonia', location: 'Chile', category: 'Adventure', description: 'Further than you have been before.', image: 'https://images.unsplash.com/photo-1478827387698-1527781a4887?auto=format&fit=crop&w=900&q=85' },
  { id: 4, name: 'Amalfi Coast', location: 'Italy', category: 'Coastal', description: 'A bright escape above the Mediterranean.', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=85' },
]

function DestinationForm({ destination, onSave, onClose }) {
  const [form, setForm] = useState(destination || { name: '', location: '', category: 'City break', description: '', image: '' })

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function submitForm(event) {
    event.preventDefault()
    onSave({ ...form, image: form.image || 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85' })
  }

  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="destination-modal" role="dialog" aria-modal="true" aria-labelledby="destination-form-title"><div className="modal-heading"><div><p className="eyebrow">DESTINATION MANAGER</p><h2 id="destination-form-title">{destination ? 'Edit destination' : 'Add a destination'}</h2></div><button className="close-button" type="button" onClick={onClose} aria-label="Close">×</button></div><form className="destination-form" onSubmit={submitForm}><div className="form-grid"><label>Name<input name="name" value={form.name} onChange={updateField} placeholder="e.g. Ubud" required /></label><label>Location<input name="location" value={form.location} onChange={updateField} placeholder="e.g. Indonesia" required /></label></div><label>Category<select name="category" value={form.category} onChange={updateField}><option>City break</option><option>Slow travel</option><option>Culture</option><option>Adventure</option><option>Coastal</option></select></label><label>Description<textarea name="description" value={form.description} onChange={updateField} placeholder="What makes this place special?" rows="3" required /></label><label>Image URL <span className="optional">optional</span><input name="image" value={form.image} onChange={updateField} placeholder="https://..." /></label><div className="modal-actions"><button className="secondary-button" type="button" onClick={onClose}>Cancel</button><button className="primary-button" type="submit">{destination ? 'Save changes' : 'Add destination'} <span>↗</span></button></div></form></section></div>
}

function DestinationsPage({ destinations, onAdd, onEdit, onDelete }) {
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState(null)
  const filteredDestinations = destinations.filter((destination) => `${destination.name} ${destination.location}`.toLowerCase().includes(search.toLowerCase()))

  function saveDestination(destination) {
    if (editing?.id) onEdit(destination)
    else onAdd({ ...destination, id: Date.now() })
    setEditing(null)
  }

  return <div className="destination-page"><section className="destination-page-header"><div><p className="eyebrow">TRAVELGO LIBRARY</p><h1>Destinations</h1><p className="subheading">Curate the places that make your journey worth remembering.</p></div><button className="primary-button add-button" type="button" onClick={() => setEditing({})}>+ Add destination</button></section><section className="destination-toolbar"><div className="destination-search"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name or location" /></div><span className="result-count">{filteredDestinations.length} {filteredDestinations.length === 1 ? 'destination' : 'destinations'}</span></section>{filteredDestinations.length ? <section className="managed-destination-grid">{filteredDestinations.map((destination) => <article className="managed-card" key={destination.id}><img src={destination.image} alt={destination.name} /><div className="managed-card-body"><div className="managed-card-top"><span className="card-tag light-tag">{destination.category}</span><button className="more-button" type="button" aria-label={`Actions for ${destination.name}`}>•••</button></div><div><h2>{destination.name}</h2><p className="managed-location">⌖ {destination.location}</p><p className="managed-description">{destination.description}</p></div><div className="card-actions"><button type="button" onClick={() => setEditing(destination)}>Edit</button><button className="delete-action" type="button" onClick={() => onDelete(destination.id)}>Delete</button></div></div></article>)}</section> : <div className="empty-state"><span>⌕</span><h2>No destinations found</h2><p>Try another name or location, or add a new destination.</p></div>}{editing && <DestinationForm destination={editing.id ? editing : null} onSave={saveDestination} onClose={() => setEditing(null)} />}</div>
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState('Explore')
  const [destinations, setDestinations] = useState(initialDestinations)

  function handleLogin(event) { event.preventDefault(); if (email && password) setIsLoggedIn(true) }
  function handleSaveDestination(destination) { setDestinations((current) => [...current, destination]) }
  function handleEditDestination(destination) { setDestinations((current) => current.map((item) => item.id === destination.id ? destination : item)) }
  function handleDeleteDestination(id) { if (window.confirm('Delete this destination?')) setDestinations((current) => current.filter((destination) => destination.id !== id)) }

  if (!isLoggedIn) return <main className="auth-page"><section className="auth-visual" aria-label="Travel inspiration"><div className="brand brand-light"><span className="brand-mark">✦</span> TravelGo</div><div className="visual-copy"><p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p><h1>Go somewhere<br /><em>worth remembering.</em></h1><p>Curated stays, local experiences, and little moments that make a trip feel like yours.</p></div><div className="photo-credit">SANTORINI, GREECE <span>●</span> 36.39° N, 25.46° E</div></section><section className="auth-panel"><div className="brand brand-dark"><span className="brand-mark">✦</span> TravelGo</div><div className="auth-form-wrap"><p className="eyebrow">WELCOME BACK</p><h2>Let’s get you<br />back out there.</h2><p className="form-intro">Sign in to pick up where you left off.</p><form onSubmit={handleLogin}><label htmlFor="email">Email address</label><input id="email" type="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required /><div className="label-row"><label htmlFor="password">Password</label><a href="#forgot">Forgot password?</a></div><input id="password" type="password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} required /><button className="primary-button" type="submit">Sign in <span>↗</span></button></form><p className="signup-prompt">New to TravelGo? <a href="#signup">Create an account</a></p><div className="or-divider"><span>or continue with</span></div><div className="social-buttons"><button type="button">G <span>Google</span></button><button type="button"> <span>Apple</span></button></div></div><p className="legal">By continuing, you agree to our <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</p></section></main>

  return <main className="app-shell"><header className="topbar"><div className="brand brand-dark"><span className="brand-mark">✦</span> TravelGo</div><nav>{['Explore', 'Destinations', 'Trips', 'Saved'].map((tab) => <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>{tab}</button>)}</nav><button className="profile-button" onClick={() => setIsLoggedIn(false)}><span>HA</span><strong>Harper Allen</strong><small>⌄</small></button></header>{activeTab === 'Destinations' ? <DestinationsPage destinations={destinations} onAdd={handleSaveDestination} onEdit={handleEditDestination} onDelete={handleDeleteDestination} /> : <div className="home-content"><section className="welcome-row"><div><p className="eyebrow">WEDNESDAY, JUNE 18, 2025</p><h1>Where to next, <em>Harper?</em></h1><p className="subheading">The world is waiting. Let’s find your way into it.</p></div><div className="weather"><span>☀</span><div><strong>24°</strong><small>Lisbon, Portugal</small></div></div></section><section className="search-bar"><span>⌕</span><input placeholder="Search destinations, stays, or experiences" /><button onClick={() => setActiveTab('Destinations')}>Search <span>↗</span></button></section><section className="section-heading"><div><p className="eyebrow">HANDPICKED FOR YOU</p><h2>Find your next feeling</h2></div><button className="link-button" onClick={() => setActiveTab('Destinations')}>View all <span>→</span></button></section><section className="destination-grid">{destinations.slice(0, 3).map((destination, index) => <article className={`destination-card ${index === 0 ? 'tall' : ''}`} style={{ backgroundImage: `url(${destination.image})` }} key={destination.id}><div className="card-tag">{destination.category.toUpperCase()}</div><div className="card-copy"><h3>{destination.name},<br /><em>{destination.location}</em></h3><p>{destination.description}</p></div></article>)}</section><section className="bottom-row"><div><p className="eyebrow">YOUR TRAVEL NOTEBOOK</p><h2>Keep exploring</h2></div><div className="note-card"><span className="note-icon">✦</span><div><strong>“Not all those who wander are lost.”</strong><small>— J.R.R. Tolkien</small></div><span className="arrow">↗</span></div></section></div>}</main>
}

export default App