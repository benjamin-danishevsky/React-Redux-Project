import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './HomePage.css'
import Notebooks from '../Notebooks'

function HomePage () {

    const sessionUser = useSelector(state => state.session.user);
    

    if(!sessionUser) return <Redirect to='/'/>

    return (
        <div className='page-container'>
            <h1 className='home-heading'>Welcome {sessionUser.username}!</h1>
            <Notebooks />
        </div>

    )
}

export default HomePage;
