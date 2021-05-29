import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Route, BrowserRouter } from "react-router-dom";
import Login from './components/Login';
import FamilyList from './components/FamilyList';
import Register from './components/Register';


ReactDOM.render(
  <BrowserRouter>
    {/* localhost:3000でアクセスしたらAppコンポーネントが表示される */}
    <Route exact path="/" component={App} />

    {/* localhost:3000/loginでアクセスしたらLoginコンポーネントが表示される */}
    <Route exact path="/login" component={Login} />

    {/* localhost:3000/listでアクセスしたらFamilyListコンポーネントが表示される */}
    <Route exact path="/list" component={FamilyList} />

    <Route exact path="/regi" component={Register} />

  </BrowserRouter>,
  document.getElementById('root')
);
