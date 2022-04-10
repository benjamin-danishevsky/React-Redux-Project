import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  let userId


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
      );
    } else {
      sessionLinks = (
        <>
        <LoginFormModal />
        {/* <NavLink to="/signup">Sign Up</NavLink> */}
      </>
    );
  }
  if(sessionUser){
    userId = sessionUser.id;
  }

  return (
    <ul>
      <li>
        {sessionUser && (

          <NavLink exact to={`/users/${userId}`} className="link-home">
            Go Back Home

          </NavLink>
        )}
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
