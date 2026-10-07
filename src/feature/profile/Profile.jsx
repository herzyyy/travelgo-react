export function ProfilePage({ onLogout }) {
  return (
    <div className="profile-page">
      <section className="profile-heading">
        <div>
          <p className="eyebrow">YOUR TRAVELGO ACCOUNT</p>
          <h1>Your <em>profile.</em></h1>
          <p className="subheading">A little home for all the places that feel like you.</p>
        </div>
        <span className="profile-member-since">MEMBER SINCE 2023</span>
      </section>

      <section className="profile-overview">
        <div className="profile-identity">
          <img
            className="profile-portrait"
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=85"
            alt="Harper Allen"
          />
          <div>
            <p className="eyebrow">THE CURIOUS COLLECTOR</p>
            <h2>Harper Allen</h2>
            <p className="profile-location">⌖ Brooklyn, New York</p>
            <p className="profile-bio">Always looking for the long way around, a good bookshop, and a table by the window.</p>
          </div>
        </div>
        <div className="profile-stats" aria-label="Travel statistics">
          <div><strong>12</strong><span>Countries</span></div>
          <div><strong>28</strong><span>Places saved</span></div>
          <div><strong>06</strong><span>Trips taken</span></div>
        </div>
      </section>

      <section className="profile-details-grid">
        <article className="profile-detail-section">
          <div className="profile-section-heading">
            <div><p className="eyebrow">ABOUT YOU</p><h2>Personal details</h2></div>
            <span className="profile-detail-mark">01</span>
          </div>
          <dl className="profile-detail-list">
            <div><dt>Full name</dt><dd>Harper Allen</dd></div>
            <div><dt>Email address</dt><dd>harper.allen@example.com</dd></div>
            <div><dt>Home base</dt><dd>Brooklyn, New York</dd></div>
            <div><dt>Travel style</dt><dd>Slow travel · Culture · Coastal</dd></div>
          </dl>
        </article>

        <article className="profile-detail-section profile-next-trip">
          <div className="profile-section-heading">
            <div><p className="eyebrow">ON YOUR HORIZON</p><h2>Next up</h2></div>
            <span className="profile-detail-mark">02</span>
          </div>
          <div className="profile-trip-card">
            <img src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=85" alt="Colorful coastal village in Cinque Terre" />
            <div className="profile-trip-copy">
              <span className="profile-trip-date">SEP 12 — 19, 2025</span>
              <h3>Cinque Terre</h3>
              <p>Italy <span>·</span> 7 days</p>
            </div>
          </div>
          <button className="profile-logout" type="button" onClick={onLogout}>Sign out <span>↗</span></button>
        </article>
      </section>
    </div>
  )
}