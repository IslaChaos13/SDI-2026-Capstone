import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/Logon.css'

function Logon() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = () => {
        fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                navigate('/')
            }
        })
        .catch(() => setError('Server error, try again'))
    }

    return (
        <div className='LogonWrapper'>
            <div className='LogonContainer'>
                <h2>Welcome Wingman</h2>
                <input
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className='LogonError'>{error}</p>}
                <button onClick={handleLogin}>Enter</button>
            </div>
        </div>
    )
}

export default Logon
