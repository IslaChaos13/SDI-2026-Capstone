import { useState } from 'react';
// import baseMap from './assets/FSS-Facilities-Map-PUBLIC-2024-01-scaled-1.jpg'
// import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import home from './assets/home_150dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg'
import medical from './assets/medical_services_150dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg'
import security from './assets/crisis_alert_150dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg'
import { MapContainer, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import './App.css'

function FacilityMap({scrollWheelZoom}) {
  return (
      <MapContainer center={[32.50283298104374, -93.66312248601946]} zoom={13} scrollWheelZoom={scrollWheelZoom}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                     attribution='&copy; OpenStreetMap contributors' />
      </MapContainer>
  )
}

function App() {

  const [isOpen, setIsOpen] = useState(false)

  return (

    <div className='page'>
      <h1 className='title'>Base Directory</h1>
      <div className='map-preview' onClick={() => setIsOpen(true)}>
        <FacilityMap scrollWheelZoom={false} />
        <div className='expand-map'>Click to Expand</div>
      </div>
      {isOpen && (
        <div className='map-modal'>
        <button className='close-btn' onClick={() => setIsOpen(false)}>x</button>
        <FacilityMap scrollWheelZoom={true}/>
        </div>
      )}
      <div className='important-items'>
          <div className='link-item'>
              <img className='link-img' src={security}/>
              <p className='link-name'>Security Forces</p>
          </div>
          <div className='link-item'>
              <img className='link-img' src={home}/>
              <p className='link-name'>Housing</p>
          </div>
          <div className='link-item'>
              <img className='link-img' src={medical}/>
              <p className='link-name'>Medical</p>
          </div>
      </div>
    </div>
  )
}

export default App



//need coordinates to put in markers on map.
//work on styling
