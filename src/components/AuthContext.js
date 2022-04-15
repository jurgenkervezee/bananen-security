import React, {useState} from "react";
import {createContext} from "react";
import {useHistory} from "react-router-dom";

export const AuthContext = createContext({});


const AuthContextProvider = ({children}) => {

    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null
    });
    const history = useHistory();

    function signIn(jwtToken) {
        localStorage.setItem('token', jwtToken);
        toggleIsAuth({...isAuth, isAuth: true});

        // console.log('gebruiker is ingelogd');
        history.push('/profile');
    }

    function signOut() {
        toggleIsAuth({...isAuth, isAuth: false, user: null});
        console.log('gebruiker is uitgelogd');
        history.push('/');
    }

    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: signIn,
        logout: signOut,

        username: "username",
        password: "password"
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;