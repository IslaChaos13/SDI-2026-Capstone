import {useNavigate} from 'react-router-dom'
import Silloutte2 from '../assets/silloutte2.svg'
import {useContext} from 'react'
import UserContext from '../context/UserContext'


export default function LoginButton(){

  const {LoggedIn} = useContext(UserContext)

  let navigate = useNavigate()



  return(
    <div className="LoginButton" onClick={() => navigate('/login')}>
      <img src={Silloutte2} alt='Silloutte' />


    </div>
  )
}



