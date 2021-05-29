import React, { useState, useEffect } from "react";
import { auth } from "../firebase";

const Login = (props) => {
    // ログイン状態の保持
    const [isLogin, setIsLogin] = useState(true);

    // メールアドレスの状態を保持
    const [email, setEmail] = useState("");

    // パスワードの状態を保持
    const [password,setPassword] = useState("");

    useEffect(() => {
        // 認証関係に対して何かしらの変更があったときに実行されるfirebaseの機能
        // onAuthStateChangedは、ログインしていたとか、ログアウトしたとかで呼び出される
        // userというパラメーターがあり、これには「ログインが成功したときに」この部分に全部格納される
        // userに何らかの情報が入っていればログインに成功、入ってなければログイン失敗、ログインしていない
        const unSub = auth.onAuthStateChanged((user) => {
            // 判定の条件は何らかの情報がはいっていたとき→ルートの画面（App）に遷移させる
            // （逆にuserにない場合は常にこの画面にとどまり続ける）
            user && props.history.push("/");
        });
        return () => unSub();
    },[props.history]);

    return (
        // デザインはこのページから　https://material-ui.com/ja/components/text-fields/
        <div>
            {/*  */}
            <h1>
                {isLogin ? "Login" : "Register"}
            </h1>

            <hr />
            {/* ログインフォーム */}
            <input
                type="text"
                name="email"
                value={email}   // useStateのemailに保持した文字列が入ってくる
                // 画面上で入力された文字がonChangeで更新されて{email}に入る
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
                type="password"
                name="password" // html5に用意されている入力された文字を隠せる機能
                value={password}   // useStateのemailに保持した文字列が入ってくる
                // 画面上で入力された文字がonChangeで更新されて{email}に入る
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            {/* ログイン情報を送信するボタン */}
            <button
                onClick={
                    // クリックされたときの処理
                    isLogin ? 
                        async () => {
                            try{
                                await auth.signInWithEmailAndPassword(email,password);
                                props.history.push("/")
                            } catch(error){
                                alert(error.message)
                            }
                        }
                        :
                        async () => {
                            try{
                                await auth.createUserWithEmailAndPassword(email,password);
                                props.history.push("/")
                            } catch(error){
                                alert(error.message)
                            }
                        }
                    }
            >
                {/* isLoginの情報を元に、表示するテキストを変更する */}
                {isLogin ? "ログインする" : "登録する"}

            </button>

            <hr />
            {/* 最初はisLoginがtrue担ってしまって「ログインする」になってしまうので */}
            {/* ここでisLoginを切り替えるonClickを作成する */}
            <div onClick={()=> setIsLogin(!isLogin)}>
                {isLogin ? "アカウントを作成する" : "ログインする"}
            </div>

        </div>
    )
};

export default Login;