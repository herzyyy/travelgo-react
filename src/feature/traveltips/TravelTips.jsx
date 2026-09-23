import { useState } from 'react'

const travelTips = [
  { id: 1, category: 'Before you go', title: 'Pack for the day you will actually have', description: 'Build a small, flexible capsule around the weather and the activities on your itinerary.', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85', readTime: '4 min read' },
  { id: 2, category: 'On the move', title: 'Make your first morning local', description: 'Skip the familiar chain and start with a neighborhood coffee shop or market near your stay.', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85', readTime: '3 min read' },
  { id: 3, category: 'Slow travel', title: 'Leave room for the unplanned', description: 'A little white space in your itinerary makes room for the street, story, or view you could not search for.', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85', readTime: '5 min read' },
  { id: 4, category: 'Travel smart', title: 'Keep your important details together', description: 'Save your booking references, emergency contacts, and offline maps somewhere easy to reach.', image: 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?auto=format&fit=crop&w=900&q=85', readTime: '2 min read' },
  { id: 5, category: 'On the move', title: 'Choose the scenic route once', description: 'Trade one fast transfer for a train, ferry, or walk that lets you understand the landscape.', image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=900&q=85', readTime: '4 min read' },
  { id: 6, category: 'Travel smart', title: 'Spend with intention', description: 'Set a simple daily rhythm for food, transport, and experiences so the best moments do not feel expensive.', image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=900&q=85', readTime: '3 min read' },
]

const categories = ['All tips', ...new Set(travelTips.map((tip) => tip.category))]

export function TravelTipsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All tips')
  const filteredTips = travelTips.filter((tip) => {
    const matchesCategory = activeCategory === 'All tips' || tip.category === activeCategory
    const searchableText = `${tip.title} ${tip.description} ${tip.category}`.toLowerCase()
    return matchesCategory && searchableText.includes(search.toLowerCase())
  })

  return <div className="travel-tips-page"><section className="travel-tips-header"><div><p className="eyebrow">THE TRAVELGO NOTEBOOK</p><h1>Travel <em>well.</em></h1><p className="subheading">Small ideas for lighter bags, better days, and journeys that stay with you.</p></div><div className="travel-tips-stamp"><span>✦</span><strong>FIELD<br />NOTES</strong><small>NO. 01</small></div></section><section className="travel-tips-toolbar"><div className="travel-tips-search"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search travel tips" aria-label="Search travel tips" /></div><div className="travel-tips-filters" role="group" aria-label="Filter travel tips">{categories.map((category) => <button key={category} type="button" className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}</div></section>{filteredTips.length ? <section className="travel-tips-grid">{filteredTips.map((tip, index) => <article className={`travel-tip-card ${index === 0 ? 'featured' : ''}`} key={tip.id}><img src={tip.image} alt="" /><div className="travel-tip-card-body"><div className="travel-tip-meta"><span>{tip.category}</span><small>{tip.readTime}</small></div><h2>{tip.title}</h2><p>{tip.description}</p><button className="read-tip-button" type="button">Read note <span>↗</span></button></div></article>)}</section> : <div className="empty-state"><span>⌕</span><h2>No tips found</h2><p>Try another search or choose a different category.</p></div>}</div>
}
