import React from 'react'
import Home from './Home';
import Logout from './Logout';
import Menu from './Menu';

const NamuItemChoice = () => {
    return (
        <div>
            <div>
                アイテムを選ぶページ
                <hr />

                {/* アイテムをセットしたら押せる */}
                <a href="/check">
                <button>セットする</button>
                </a>


            </div>
        <Menu />
        <Logout />
        <Home />
        </div>
    )
}

export default NamuItemChoice
