import React from "react";

import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

import SubMenu from "../../common/SubMenu";

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
          <NavLink tag={Link} to={"/main"}>
            메인화면
          </NavLink>
        </NavItem>

        <SubMenu title="영업" items={submenus} />
        
        <NavItem>
          <NavLink tag={Link} to={"/myPage"}>
            내 정보 수정
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);

const submenus = [
    {
      title: "팀현황",
      target: "team"
    }
];

export default SideBar;
