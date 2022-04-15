import React, {useEffect, useState} from "react";
import {createContext} from "react";
import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

const AuthContextProvider = ({children}) => {

    const [isAuth, setIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwt_decode(token);
            getUserData(decodedToken.sub, token);

        }else{
            setIsAuth({
                ...isAuth,
                status: 'done',
            });
        }

    }, []);

    async function getUserData(id, token) {
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
                },
                status: 'done',
            });
            history.push('/profile');

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
        // console.log('gebruiker is uitgelogd');
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
            {isAuth.status === 'done' ? children : <p>Loading...</p> }
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;