import React, { useState, useEffect }from 'react';
import { db, auth } from '../firebase'
import "./styles.css";
import Home from './Home';
import Logout from './Logout';
import Menu from './Menu';
import FamilyItem from './FamilyItem';
import { makeStyles, createStyles } from '@material-ui/core/styles'


const FamilyList = (props) => {
    useEffect(() => {
        const unSub = auth.onAuthStateChanged((user) => {
          !user && props.history.push("login");
        });
        return () => unSub();
      },[]);


        // firebaseのデータを保持するためにuseStateを使う
        const [data, setData] = useState([
            {
            id:"",
            name:"",
            relation:"",
            image:"",
            },
        ]);

        // ページが表示されるときにuseEffectを使ってfirebaseのデータにアクセスする
        useEffect(() => {
            const firebaseData = db.collection("group").onSnapshot((snapshot) => {
            // useStateのsetDataを更新する
            setData(
                snapshot.docs.map((dbData) => ({
                id: dbData.id,
                name: dbData.data().name,
                birthday: dbData.data().birthday,
                relation: dbData.data().relation,
                image: dbData.data().image,
                }))
            );
            });
            console.log("データ！",firebaseData)

            return () => firebaseData();

        },[]);
    
      return (
        <div>
            <div className="conplete-area">
                {/* ｄｂのデータを表示させているところ */}
                <p className="title">★Familyリスト★</p>
                <ul>
                <div className="list-row">
                    <li className="li-title">
                    <span className="span-head01" style={{ color: '#808080' }}>なまえ</span>
                    <span className="span-head04" style={{ color: '#808080' }}>かんけい</span>
                    <span className="span-head02" style={{ color: '#808080' }}>誕生日</span>
                    </li>
                </div>
                </ul>

                {data.map((data) => (
                <FamilyItem id={data.id} name={data.name} birthday={data.birthday} relation={data.relation} image={data.image} />
                ))}

            </div>

            <Menu />
            <Logout />
            <Home />
        </div>
      )
}


export default FamilyList