import './App.css';
import React, { useState, useEffect }from 'react';
import { db, auth } from './firebase'
import FamilyList from './components/FamilyList';
import Menu from './components/Menu';
import Logout from './components/Logout';

function App(props) {
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && props.history.push("login");
    });
    return () => unSub();
  },[]);

  return (
    <div>
      <p>ここがtopページだよ</p>
      <p>仏壇背景で、登録した人の写真が並んでます</p>

      <Menu />
      <Logout />
      
    </div>
  );
}

export default App;
