import {useNavigate} from 'react-router-dom'
import Silloutte from '../assets/siloutte.png'
function LoginButton(){
console.log('We here!')
let navigate = useNavigate()

    return(
        < img src={Silloutte} alt='Silloutte'
        onClick={() => } />
        <button>Click Me</button>
    )
}

export default LoginButton

