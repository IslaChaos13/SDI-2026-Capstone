import { useContext } from "react";
import UserContext from "../context/UserContext";
import ErrorPage from "../pages/ErrorPage";

function RequireAuth({ children }) {
    const { LoggedIn, authChecked } = useContext(UserContext);

    if (!authChecked) {
        return null;
    }

    if (!LoggedIn) {
        return (
            <ErrorPage message="You need to be logged in to view this page." />
        );
    }

    return children;
}

export default RequireAuth;
