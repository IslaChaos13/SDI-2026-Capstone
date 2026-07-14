import Layout from '../components/Layout.jsx'
import '../styles/theme.css'
import './BaseDirectory.css'

// Static mockup only — no data, no logic, no routing.
function BaseDirectory() {
  return (
    <Layout>
      <div className="page">
        <div className="page-header">
          <h1>Base Directory</h1>
          <p>Points of contact and offices you'll need during in-processing.</p>
        </div>

        <div className="card directory-hero-search">
          <div className="search-bar">
            <span className="search-icon">⌕</span>
            <input type="text" placeholder="Search offices, phone, or address..." readOnly />
          </div>
        </div>

        <h2 className="section-label">Offices</h2>
        <div className="grid grid-3" style={{ marginBottom: 'var(--space-xl)' }}>
          <div className="card directory-card">
            <div className="directory-card-header">
              <div>
                <h3>2nd Medical Group</h3>
                <span className="tag">Medical</span>
              </div>
            </div>
            <div className="directory-contact-row">☎ 318-456-6555</div>
            <div className="directory-contact-row">🏢 Bldg 243, Suite 100</div>
            <div className="directory-contact-row">🕒 Mon–Fri, 0700–1630</div>
            <div className="directory-contact-row">✉ medgroup@barksdale.af.mil</div>
            <div className="directory-card-footer">
              <span className="task-due">0.4 mi away</span>
              <button className="btn btn-primary btn-sm" type="button">Quick Call</button>
            </div>
          </div>

          <div className="card directory-card">
            <div className="directory-card-header">
              <div>
                <h3>Barksdale Finance</h3>
                <span className="tag">Finance</span>
              </div>
            </div>
            <div className="directory-contact-row">☎ 318-456-4333</div>
            <div className="directory-contact-row">🏢 Bldg 801, Suite 1400</div>
            <div className="directory-contact-row">🕒 Mon–Fri, 0800–1600</div>
            <div className="directory-contact-row">✉ finance@barksdale.af.mil</div>
            <div className="directory-card-footer">
              <span className="task-due">0.6 mi away</span>
              <button className="btn btn-primary btn-sm" type="button">Quick Call</button>
            </div>
          </div>

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
            <div className="map-placeholder">
              <span className="map-pin" style={{ top: '30%', left: '40%' }}>📍</span>
              <span className="map-pin" style={{ top: '55%', left: '62%' }}>📍</span>
              <span className="map-pin" style={{ top: '68%', left: '30%' }}>📍</span>
              <span className="map-label">Map integration coming soon</span>
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
                  <td>Mon–Fri, 0800–1630</td>
                  <td>mfr@barksdale.af.mil</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BaseDirectory
