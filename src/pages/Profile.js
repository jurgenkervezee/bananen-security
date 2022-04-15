import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../components/AuthContext";
import axios from "axios";

function Profile() {

    const {user} = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        async function fetchProfileData() {
            const token = localStorage.getItem('token');
            try {
                const result = await axios.get('http://localhost:3000/660/private-content',
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                setTitle(result.data.title);
                setContent(result.data.content);
            } catch (e) {
                console.error(e);
            }
        }

        fetchProfileData();
    }, []);

    return (
        <>
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                <p><strong>Gebruikersnaam:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </section>
            <section>
                <h2>{title}</h2>
                <p>{content}</p>
            </section>
            <p>Terug naar de <Link to="/">Homepagina</Link></p>
        </>
    );
}

export default Profile;