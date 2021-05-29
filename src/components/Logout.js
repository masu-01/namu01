import React, { useState, useEffect }from 'react';
import { db, auth } from '../firebase'

const Logout = (props) => {
    return (
        <div>
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
    )
}

export default Logout
