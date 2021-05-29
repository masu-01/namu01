import './App.css';
import React, { useState, useEffect }from 'react';
import { db, auth } from './firebase'
import FamilyList from './components/FamilyList';
import Menu from './components/Menu';

function App(props) {
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && props.history.push("login");
    });
    return () => unSub();
  },[]);

  return (
    <div>
      <FamilyList />
      <Menu />
  
      {/* ログアウト用のボタン */}
      <button
        onClick={
          async() => {
            try {
              await auth.signOut();
              props.history.push("login");
            } catch (error) {
              alert(error.message);
            }
          }
        }
     
     >ログアウト</button>
    </div>
  );
}

export default App;
