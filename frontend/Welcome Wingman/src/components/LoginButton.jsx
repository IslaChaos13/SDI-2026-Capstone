import {useNavigate} from 'react-router-dom'
import Silloutte2 from '../assets/silloutte2.svg'


export default function LoginButton(){
console.log('We here!')
let navigate = useNavigate()

    return(
      <div className="LoginButton" onClick={()=>navigate('/')}>
        <img src={Silloutte2} alt='Silloutte' />


      </div>
    )
}



