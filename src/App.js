import './App.css';
import React, { useState, useEffect }from 'react';
import { db, auth } from './firebase'
import FamilyList from './components/FamilyList';
import Menu from './components/Menu';
import Logout from './components/Logout';
import butsudan from './img/butsudan.png'

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
      背景はぶつだんで、登録した人の写真が並んでます<br />
      コンポーネント化したほうが良さそうではある<br />
      このぶつだんの画像の上にどうやって登録した人の写真のっけるんだろう・・・・・・<br />

      <div className="top-bgi" >
      <img src={butsudan} />
      </div>

      <a href="/namu-choice"><button>なむなむする</button></a>

      <Menu />
      <Logout />

    </div>
  );
}

export default App;
