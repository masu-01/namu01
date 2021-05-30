import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Route, BrowserRouter } from "react-router-dom";
import Login from './components/Login';
import FamilyList from './components/FamilyList';
import FamilyRegister from './components/FamilyRegister';
import Mypage from './components/Mypage';
import NamuLog from './components/NamuLog';
import NamuItemChoice from './components/NamuItemChoice';
import Edit from './components/Edit';
import NamuItemtCheck from './components/NamuItemtCheck';


ReactDOM.render(
  <BrowserRouter>
    {/* localhost:3000でアクセスしたらAppコンポーネントが表示される */}
    <Route exact path="/" component={App} />

    {/* localhost:3000/loginでアクセスしたらLoginコンポーネントが表示される */}
    <Route exact path="/login" component={Login} />

    {/* localhost:3000/listでアクセスしたらFamilyListコンポーネントが表示される */}
    <Route exact path="/list" component={FamilyList} /> 


    <Route exact path="/regi" component={FamilyRegister} />
    {/* <Route exact path="/regi" component={FamilyRegister} /> */}
    <Route exact path="/mypage" component={Mypage} />
    <Route exact path="/log" component={NamuLog} />
    <Route exact path="/namu-choice" component={NamuItemChoice} />
    <Route exact path="/edit" component={Edit} />
    <Route exact path="/check" component={NamuItemtCheck} />


  </BrowserRouter>,
  document.getElementById('root')
);
