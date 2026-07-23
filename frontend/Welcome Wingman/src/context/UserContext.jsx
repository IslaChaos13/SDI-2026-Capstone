import { createContext } from "react";

// const UserContext = createContext({LoggedIn : {}, setLoggedIn : () => {}})
const UserContext = createContext({
	LoggedIn: null,
	setLoggedIn: () => { },
	logout: () => { },
});

export default UserContext;
