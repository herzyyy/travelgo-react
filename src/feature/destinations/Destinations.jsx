import { useState } from 'react'

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

export function DestinationsPage({ destinations, onAdd, onEdit, onDelete }) {
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
