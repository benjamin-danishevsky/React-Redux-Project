import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
       dispatch(sessionActions.signup({ email, username, password }))
        .then((user) => history.push(`/users/${user.user.id}`))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });

    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="signup-title">Sign Up</h2>
      <ul className="signup-errors">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div className='signup-form'>
        <label className='signup-label'>
          Email
          <input
            className='signup-input'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

          />
        </label>
        <label className='signup-label'>
          Username
          <input
            className='signup-input'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}

          />
        </label>
        <label className='signup-label'>
          Password
          <input
            className='signup-input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

          />
        </label>
        <label className='signup-label'>
          Confirm Password
          <input
            className='signup-input'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}

          />
        </label>
        <button className='signup-submit' type="submit">Sign Up</button>
      </div>
    </form>
  );
}

export default SignupFormPage;
