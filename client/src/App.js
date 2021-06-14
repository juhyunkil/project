import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AdminPage from "./admin/side/AdminPage";//관리자 페이지
import UsersPage from "./users/side/UsersPage";//영업자 페이지
import LoginPage from './common/LoginPage';//로그인페이지(구현전)

class App extends Component {
  render() {
    return (
      <div className="App">
        <UsersPage/>
      </div>
    );
  }
}

export default App;