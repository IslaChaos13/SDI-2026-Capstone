import {createContext} from 'react'

const UserContext = createContext({LoggedIn : {}, setLoggedIn : () => {}})

export default UserContext