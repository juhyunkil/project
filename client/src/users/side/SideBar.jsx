import React from "react";

import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

const SideBar = ({ isOpen, toggle }) => (
  <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      <h3>Quatro_H</h3>
    </div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-4">
        <NavItem>
          <NavLink tag={Link} to={"/userMain"}>
            메인화면
          </NavLink>
        </NavItem>
        
        <NavItem>
          <NavLink tag={Link} to={"/myPage"}>
            내 정보 수정
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);


export default SideBar;
