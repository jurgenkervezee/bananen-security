import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function SignUp() {

    const [email, username, password] = useState("");
    function handlesubmit(e){
        e.preventDefault();

    }
  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
      <form onSubmit={handlesubmit}>
          <label htmlFor="emailadres">Emailadres
              <input type="email" id="emailadres"/>
          </label>
          <label htmlFor="username">Username
              <input type="text" id="username"/>
          </label>
          <label htmlFor="password">Password
              <input type="password" id="password"/>
          </label>
          <button
              type="submit"
          >Inloggen
          </button>
      </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;