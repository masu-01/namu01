import React, { useState, useEffect }from 'react';
import { db, auth } from '../firebase'

const FamilyList = (props) => {
    useEffect(() => {
        const unSub = auth.onAuthStateChanged((user) => {
          !user && props.history.push("login");
        });
        return () => unSub();
      },[]);
    
      return (
        <div>
            家族のリスト
        </div>
      );

}

export default FamilyList
