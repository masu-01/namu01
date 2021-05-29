import React, { useState, useEffect }from 'react';
import { db, auth } from '../firebase'
import "./styles.css";
import Home from './Home';
import Logout from './Logout';
import Menu from './Menu';

const FamilyRegister = (props) => {
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
            },
        ]);

        // 登録する処理（inputタグに入力された情報を保持する）
        const [inputValueName, setInputValueName] = useState("");
        const [inputValueBirthday, setInputValueBirthday] = useState("");
        const [inputValueRelationship, setInputValueRelationship] = useState("");


        // inputタグのイベント処理
        // onchangeで「handleInputChange」という関数を使う
        const handleInputChange = (e) => {  //「e」はイベントっていう意味
            setInputValueName(e.target.value);
        }

        const handleInputChangeBd = (e) => {  //「e」はイベントっていう意味
            setInputValueBirthday(e.target.value);
        }

        const handleInputChangeRs = (e) => {  //「e」はイベントっていう意味
            setInputValueRelationship(e.target.value);
        }

        // 登録ボタンのイベント処理
        const addInputData = (e) => {
            // インプットのvalueをdbに送って
            db.collection("group").add({
            name:inputValueName,
            birthday:inputValueBirthday,
            relation:inputValueRelationship
            // todo:inputValue
            });

            // インプットの中身を空にする
            setInputValueName("");
            setInputValueBirthday(""); 
            setInputValueRelationship("");
        }


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
                }))
            );
            });

            return () => firebaseData();
        },[]);

    return (
        <div>
            登録画面
            <div className="input-area">
                {/* データを入力するところ */}
                <input type="text" value={inputValueName} onChange={handleInputChange} placeholder="なまえ"></input>
                <input type="text" value={inputValueRelationship} onChange={handleInputChangeRs} placeholder="かんけい"></input>
                <input type="date" value={inputValueBirthday} onChange={handleInputChangeBd} placeholder="生年月日"></input>

                {/* 登録ボタン */}
                <button disabled={!inputValueName}
                onClick={addInputData}
                >登録する</button>
            </div>

            <Menu />
            <Logout />
            <Home />
        </div>
    )
}

export default FamilyRegister
