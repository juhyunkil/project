import React, { Component } from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import AdminPage from "./admin/side/AdminPage";
import UsersPage from "./users/side/UsersPage";
import LoginPage from './common/login/LoginPage';


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" component={LoginPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/users" component={UsersPage} />
        </BrowserRouter>
        
      </div>
    );
  }
}

export default App;