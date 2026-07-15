import { useNavigate } from 'react-router-dom';
import '../css/Navbar.css'


function Navbar() {
    let navigate = useNavigate()

    return(
        <nav>
            <div className='NavContainer'>
                <h3 className='HomeRoute' onClick={() => navigate('/')}>Page 1</h3>
                <h3 className='EncounterRoute' onClick={() => navigate('/')}>Page 2</h3>
                <h3 className='EquipmentRoute' onClick={() => navigate('/')}>Page 3</h3>
            </div>
        </nav>
    )
}

export default Navbar
