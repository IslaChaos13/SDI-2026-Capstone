import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Layout from '../components/Layout.jsx'
import '../styles/theme.css'
import './BaseDirectory.css'

const mapCenter = [32.50283298104374, -93.66312248601946]

function FacilityMap({ scrollWheelZoom, facilities }) {
  return (
    <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={scrollWheelZoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {facilities.map((facility) => (
        <Marker key={facility.id} position={[Number(facility.latitude), Number(facility.longitude)]}>
          <Popup>
            <strong>{facility.title}</strong><br />
            {facility.address}<br />
            {facility.phone}<br />
            <a href={facility.link} target="_blank" rel="noopener noreferrer">Visit site</a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

function BaseDirectory() {
  const [isOpen, setIsOpen] = useState(false)
  const [facilities, setFacilities] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/directory')
      .then(res => res.json())
      .then(data => setFacilities(data.directory || []))
      .catch(err => console.error('Failed to load facilities:', err))
  }, [])

  function handleSearch() {
    let results = facilities.filter(f =>
      f.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
  }

  return (
    <div className='page'>
      <h1 className='title'>Base Directory</h1>

      <div className="card directory-hero-search">
        <div className="search-bar">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            placeholder="Search offices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {searchResults.length > 0 && (
          <div className='search-results'>
            {searchResults.map(facility => (
              <div className='fac-item' key={facility.id}>
                <p>{facility.title} Phone: {facility.phone} <br/> Address: {facility.address}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="directory-row split">
        <div className="card directory-card">
          <div className="directory-card-header">
            <div>
              <h3>DEERS &amp; IDs</h3>
              <span className="tag">Personnel</span>
            </div>
          </div>
          <div className="directory-contact-row">☎ 318-456-3710</div>
          <div className="directory-contact-row">🏢 Bldg 801, Suite 1300</div>
          <div className="directory-contact-row">🕒 Mon–Fri, 0730–1530</div>
          <div className="directory-contact-row">✉ ids@barksdale.af.mil</div>
          <div className="directory-card-footer">
            <span className="task-due">0.6 mi away</span>
            <button className="btn btn-primary btn-sm" type="button">Quick Call</button>
          </div>
        </div>
      </div>

      <div className="directory-row split">
        <div className="card">
          <div className="card-header">
            <h2>Location Map</h2>
          </div>
          <div className="map-preview-wrapper" onClick={() => setIsOpen(true)}>
            <FacilityMap scrollWheelZoom={false} facilities={facilities} />
            <div className="expand-map">Click to Expand</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Frequently Contacted</h2>
          </div>
          <div className="frequent-chip-row">
            <span className="frequent-chip">Welcome Center</span>
            <span className="frequent-chip">DEERS &amp; IDs</span>
            <span className="frequent-chip">Finance</span>
            <span className="frequent-chip">Family Readiness</span>
            <span className="frequent-chip">Security Forces</span>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="map-modal">
          <button className="close-btn" onClick={() => setIsOpen(false)}>x</button>
          <FacilityMap scrollWheelZoom={true} facilities={facilities} />
        </div>
      )}

      <h2 className="section-label">Emergency Contacts</h2>
      <div className="grid grid-3" style={{ marginBottom: 'var(--space-xl)' }}>
        <div className="card emergency-card">
          <h3>Security Forces</h3>
          <div className="emergency-number">318-456-1911</div>
        </div>
        <div className="card emergency-card">
          <h3>Fire Department</h3>
          <div className="emergency-number">318-456-1912</div>
        </div>
        <div className="card emergency-card">
          <h3>Medical Emergency</h3>
          <div className="emergency-number">318-456-1913</div>
        </div>
      </div>

      <div className="section-divider">
        <hr />
        <span>Table View</span>
        <hr />
      </div>

      <div className="card">
        <div className="card-header">
          <h2>All Contacts</h2>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Office</th>
                <th>Building</th>
                <th>Phone</th>
                <th>Hours</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2nd Medical Group</td>
                <td>Bldg 243</td>
                <td>318-456-6555</td>
                <td>Mon–Fri, 0700–1630</td>
                <td>medgroup@barksdale.af.mil</td>
              </tr>
              <tr>
                <td>Barksdale Finance</td>
                <td>Bldg 801</td>
                <td>318-456-4333</td>
                <td>Mon–Fri, 0800–1600</td>
                <td>finance@barksdale.af.mil</td>
              </tr>
              <tr>
                <td>DEERS &amp; IDs</td>
                <td>Bldg 801</td>
                <td>318-456-3710</td>
                <td>Mon–Fri, 0730–1530</td>
                <td>ids@barksdale.af.mil</td>
              </tr>
              <tr>
                <td>Military and Family Readiness</td>
                <td>Bldg 801</td>
                <td>318-456-8400</td>
                <td>Mon–Fri, 0800-1630</td>
                <td>mfr@barksdale.af.mil</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default BaseDirectory
