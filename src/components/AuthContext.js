import React, {useState} from "react";
import {createContext} from "react";
import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

const AuthContextProvider = ({children}) => {

    const [isAuth, setIsAuth] = useState({
        isAuth: false,
        user: null
    });
    const history = useHistory();

    async function getUserData(id, token) {
        // const decodedJwt = jwt_decode(jwtToken);
        try {
            const userData = await axios.get(`http://localhost:3000/600/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });



            setIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    id: userData.data.id,
                    username: userData.data.username,
                    email: userData.data.email,
                }});
            history.push('/profile');
            console.log("Na de toewijzing")
            console.log(isAuth);

        } catch (e) {
            console.error(e);
        }
    }

    function signIn(jwtToken) {
        localStorage.setItem('token', jwtToken);
        const decodedJwt = jwt_decode(jwtToken);
        console.log(decodedJwt);
        getUserData(decodedJwt.sub, jwtToken);
    }

    function signOut() {
        setIsAuth({...isAuth, isAuth: false, user: null});
        localStorage.clear();
        console.log('gebruiker is uitgelogd');
        history.push('/');
    }

    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: signIn,
        logout: signOut,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;