import { useState } from 'react';
import baseMap from './assets/FSS-Facilities-Map-PUBLIC-2024-01-scaled-1.jpg'
import home from './assets/home_150dp_000000_FILL0_wght400_GRAD0_opsz48.svg'
import medical from './assets/emergency_150dp_000000_FILL0_wght400_GRAD0_opsz48.svg'
import security from './assets/crisis_alert_150dp_000000_FILL0_wght400_GRAD0_opsz48.svg'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './App.css'

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1>Base Directory</h1>
      <div className="map-preview" onClick={() => setIsOpen(true)}>
        <img src={baseMap} alt="base map" className="preview-img" />
        <div className="expand-hint">Click to zoom</div>
      </div>
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

      {isOpen && (
        <div className="map-modal">
          <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
          <TransformWrapper
            initialScale={1}
            minScale={1}
            maxScale={8}
            centerOnInit={true}
            wheel={{ step: 0.2 }}
            pinch={{ step: 5 }}
            doubleClick={{ mode: 'zoomIn' }}
            click={{mode: 'zoomOut'}}

          >
            <TransformComponent wrapperClass="zoom-wrapper" contentClass="zoom-content">
              <img src={baseMap} alt="base map" className="base-map" />
            </TransformComponent>
          </TransformWrapper>
        </div>
      )}
    </div>
  )
}

export default App