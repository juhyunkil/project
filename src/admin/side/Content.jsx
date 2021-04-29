import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route } from "react-router-dom";
import Main from '../pages/Main';

import Shop1 from '../pages/Shop1';
import ShopDistribution from '../pages/ShopDistribution';

import Shop_accumulate from '../pages/Shop_accumulate';
import Workers1 from '../pages/Workers1';
import Workers2 from '../pages/Workers2';
import NotFound from '../../common/NotFound';

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Switch>
      <Route exact path="/" component={() => <Main/>} />
      <Route exact path="/main" component={() => <Main/>} />
      <Route exact path="/shop1" component={() => <Shop1/>} />
      <Route exact path="/ShopDistribution" component={() => <ShopDistribution/>} />

      <Route exact path="/shop_accumulate" component={() => <Shop_accumulate/>} />
      <Route exact path="/workers1" component={() => <Workers1/>} />
      <Route exact path="/workers2" component={() => <Workers2/>} />
      <Route path="*" component={NotFound}/>
    </Switch>
  </Container>
);

export default Content;
