import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route } from "react-router-dom";
import AdminMain from '../pages/AdminMain';

import TotalShop from '../pages/TotalShop';
import ShopDistribution from '../pages/ShopDistribution';
import ShopAccumulate from '../pages/ShopAccumulate';
import Workers1 from '../pages/Workers1';
import Workers2 from '../pages/Workers2';
import NotFound from '../../common/NotFound';

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Switch>
      <Route exact path="/" component={() => <AdminMain/>} />
      <Route exact path="/adminMain" component={() => <AdminMain/>} />
      <Route exact path="/totalShop" component={() => <TotalShop/>} />
      <Route exact path="/shopDistribution" component={() => <ShopDistribution/>} />
      <Route exact path="/shopAccumulate" component={() => <ShopAccumulate/>} />
      <Route exact path="/workers1" component={() => <Workers1/>} />
      <Route exact path="/workers2" component={() => <Workers2/>} />
      <Route path="*" component={NotFound}/>
    </Switch>
  </Container>
);

export default Content;
