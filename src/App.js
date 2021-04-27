import React, { Component } from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AdminPage from "./admin/side/AdminPage";//관리자 페이지
import UsersPage from "./users/side/UsersPage";//영업자 페이지
import LoginPage from './common/login/LoginPage';//로그인페이지(구현전)


class App extends Component {
  /*로그인 하려고 하는곳인데 아직...
    render() {
      return (
          <BrowserRouter>
            <Route exact path="/" component={LoginPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/admin" component={AdminPage} />
            <Route path="/users" component={UsersPage} />
          </BrowserRouter>
      );
  }
  */
  render() {
    return (
      <div className="App">
        {/*관리자 페이지 컴포넌트<Adminage/>*/}
        {/*영업자 페이지 컴포넌트<UsersPage/>*/}
        <AdminPage/>
      </div>
    );
  }
}

export default App;