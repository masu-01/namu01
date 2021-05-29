import React, { useState, useEffect }from 'react';
import { db, auth } from '../firebase'
import Home from './Home';
import Logout from './Logout';
import Menu from './Menu';

const NamuLog = (props) => {
    useEffect(() => {
        const unSub = auth.onAuthStateChanged((user) => {
          !user && props.history.push("login");
        });
        return () => unSub();
      },[]);

    return (
        <div>
            なむログのページ

            <Menu />
            <Logout />
            <Home />
        </div>
    )
}

export default NamuLog
