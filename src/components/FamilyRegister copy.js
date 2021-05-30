import React, { useState, useEffect }from 'react';
import firebase from "firebase/app";
import { db, auth, storage } from '../firebase'
import "./styles.css";
import Home from './Home';
import Logout from './Logout';
import Menu from './Menu';

const FamilyRegisterTest = (props) => {
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
    const [inputImage, setInputImage] = useState(null);     // これは画像

    // ファイル選択→画像を選ぶ　画像を保持する
    const onChangeImageHandler = (e) => {
        if (e.target.files[0]) {
        console.log(e.target.files[0], "画像");
        // 画像
        setInputImage(e.target.files[0]);
        // 入力部分をからにする
        e.target.value = "";
        }
    };

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

    // formタグを使うと送信の際にリフレッシュされます（画面がリロードされるということ）
    // formタグを使う時は必須！絶対入ります！
    e.preventDefault();

    if (inputImage) {
        // 画像 + テキストを登録させる
                // 記述6
        // firebaseの仕様で同じファイル名の画像を複数回アップしてしまうと元々あったファイルが削除される
        // そのためにファイル名をランダムなファイル名を作る必要がある、それが下
        const S =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; //ランダムな文字列を作るための候補、62文字
        const N = 16; //16文字の文字列を作るという意味　生成したい文字数が１６の文字列になる
        const randomMoji = Array.from(crypto.getRandomValues(new Uint32Array(N))) //乱数を生成してくれるもので0からランダムな数字が１６こ選ばれる
            .map((n) => S[n % S.length])
            .join("");
        const fileName = randomMoji + "_" + inputImage.name;
        // firebase storageに登録する処理
        const uploadTweetImg = storage.ref(`images/${fileName}`).put(inputImage);
        
        // 記述7
        // firebaseのDBに登録する処理
        uploadTweetImg.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            // 3つ設定できる
            // 進捗度合い = プログレス
            // エラーに関する = アップロードがうまくいかないなどのエラーを管理する
            // 成功した時 今回でいうと async（非同期＝何かを実行した後に次のことをするためのもの）
            () => {}, //進捗度合いの管理するもの、
            (err) => {
            //エラーに関する処理
            alert(err.message);
            },
            async () => {
            //成功したとき
            await storage
                .ref("images")
                .child(fileName)
                .getDownloadURL()
                .then(async (url) => {
                await db.collection("group").add({
                    image: url,
                    name:inputValueName,
                    birthday:inputValueBirthday,
                    relation:inputValueRelationship,
                //   text: message,
                //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });
                });
            }
        );
    
        } else {
        // テキストだけ（input="text" だけ）
        db.collection("posts").add({
            image: "",
            name:inputValueName,
            birthday:inputValueBirthday,
            relation:inputValueRelationship,
        //  text: message,
        // import でimport firebase from "firebase/app";を上に書いてください
        //  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        }
                // ここに登録完了の処理を書くのかな？？
        // どういう処理？「登録完了しました」で入力した内容を表示する
        alert("登録完了しました")
    };


        // インプットの中身を空にする
        // setInputValueName("");
        // setInputValueBirthday(""); 
        // setInputValueRelationship("");





        // ページが表示されるときにuseEffectを使ってfirebaseのデータにアクセスする
        useEffect(() => {
            const firebaseData = db.collection("group").onSnapshot((snapshot) => {
            // useStateのsetDataを更新する
            setData(
                snapshot.docs.map((dbData) => ({
                id: dbData.id,
                image: dbData.data().image,
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
                <form onSubmit={addInputData}> 

                    {/* データを入力するところ */}
                    <input type="text" value={inputValueName} onChange={handleInputChange} placeholder="なまえ"></input>
                    <input type="text" value={inputValueRelationship} onChange={handleInputChangeRs} placeholder="かんけい"></input>
                    <input type="date" value={inputValueBirthday} onChange={handleInputChangeBd} placeholder="生年月日"></input>
                    <input type="file" onChange={onChangeImageHandler} />

                    {/* 登録ボタン */}
                    <button type="submit" disabled={!inputValueName}>
                        登録する
                    </button>
                </form>
            </div>

            <Menu />
            <Logout />
            <Home />
        </div>
    )
}

export default FamilyRegisterTest
