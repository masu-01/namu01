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

            <h1>なむろぐもやめましょうか</h1>
            カレンダー表示とかしなかったらできるかな？<br />
            なぜならば、１日に２回とかなむったときどうしたらいいかわからないから<br />
            普通にリスト表示する場合は、
            どういうアイテムを選択したかを記録しておくfirebaseのコレクション（table）を用意すればいけるかなぁ・・・


            <Menu />
            <Logout />
            <Home />
        </div>
    )
}

export default NamuLog
