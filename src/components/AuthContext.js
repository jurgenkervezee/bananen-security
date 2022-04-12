import React, {useState} from "react";
import {createContext} from "react";
import {useHistory} from "react-router-dom";

export const AuthContext = createContext({});


const AuthContextProvider = ({children}) => {

    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: ''
    });
    const history = useHistory();

    function signIn() {
        toggleIsAuth(true);
        console.log('gebruiker is ingelogd');
        history.push('/profile');
    }

    function signOut() {
        toggleIsAuth(false);
        console.log('gebruiker is uitgelogd');
        history.push('/');
    }

    const data = {
        auth: isAuth,
        login: signIn,
        logout: signOut,

        username: "username",
        password: "password"
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;