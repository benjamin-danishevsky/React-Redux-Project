import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';
import './LoginForm.css'

function LoginForm () {

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const demoLogin = async e => {
    e.preventDefault();
    await dispatch(
        sessionActions.login({
            credential: "Demo-lition",
            password: "password",
        })
    ).then((user) => history.push(`/users/${user.user.id}`))

    //return history.push(`/`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
    .then((user) => history.push(`/users/${user.user.id}`))
    .catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );

  };

  if (sessionUser) {
    return <Redirect to='/' />
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div className="login-form">
        <label className="login-label">
          Username or Email
          <input
            className="login-input"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className="login-label">
          Password
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className='login-submit' type="submit">Log In</button>
        <button className='login-demo' onClick={demoLogin}>DEMO LOGIN</button>
      </div>
    </form>
  );
}

export default LoginForm;
