import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route } from "react-router-dom";
import Main from '../pages/Main';
import Team from '../pages/Team';
import MyPage from '../pages/MyPage';
import NotFound from '../../common/NotFound';

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Switch>
      <Route exact path="/" component={() => <Main/>} />
      <Route exact path="/main" component={() => <Main/>} />
      <Route exact path="/team" component={() => <Team/>} />
      <Route exact path="/myPage" component={() => <MyPage/>} />
      <Route path="*" component={NotFound}/>
    </Switch>
  </Container>
);

export default Content;
