import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import Notebooks from '../Notebooks'

function HomePage () {

    const sessionUser = useSelector(state => state.session.user);

    if(!sessionUser) return <Redirect to='/'/>

    return (
        <div>

            <h1>Home Page</h1>
            <Notebooks />
        </div>

    )
}

export default HomePage;
