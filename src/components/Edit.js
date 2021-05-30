import React from 'react'
import Home from './Home';
import Logout from './Logout';
import Menu from './Menu';

const Edit = () => {
    return (
        <div>
           ここで編集するよ<br />
           新規登録と見た目は似てるよね <br />
           <h1>基本、削除して登録する方向で！（余裕があれば）</h1>
           <h1>予想</h1>
           新規登録と同じようにinputタグを用意して、デフォルト値に情報をsetするのかな<br />
           PHPのときは、変更するときにたしか「?」とかをつけてデータを保持？したけど<br />
           それどうやってやるんだろう♪

        <Menu />
        <Logout />
        <Home />
        </div>
    )
}

export default Edit
