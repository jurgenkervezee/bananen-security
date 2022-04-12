import React, {useContext} from 'react';
import {Switch, Route, useHistory} from 'react-router-dom';
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';
import {AuthContext} from "./components/AuthContext";

function App() {

    const {auth} = useContext(AuthContext);
    const history = useHistory();

    return (
        <>
            <NavBar/>
            <div className="content">
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    {auth ?
                        <Route path="/profile">
                            <Profile/>
                        </Route>
                        :
                        history.push('/signin')
                    }
                    <Route exact path="/signin">
                        <SignIn/>
                    </Route>
                    <Route exact path="/signup">
                        <SignUp/>
                    </Route>
                </Switch>
            </div>
        </>
    );
}

export default App;
