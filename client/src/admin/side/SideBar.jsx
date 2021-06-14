import React from "react";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

import SubMenu from "../../common/SubMenu";

const SideBar = ({ isOpen, toggle }) => (
  <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <h3>Quatro_H</h3>
    </div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-4">

        <NavItem>
          <NavLink tag={Link} to={"/adminMain"}>
            메인화면
          </NavLink>
        </NavItem>

        <SubMenu title="매장관리" items={submenus[0]} />
        <SubMenu title="직원관리" items={submenus[1]} />
      </Nav>
    </div>
  </div>
);

const submenus = [
  [
    {
      title: "전체매장",
      target: "totalShop"
    },
    {
      title: "매장분배",
      target: "shopDistribution"
    },
    {
      title: "매장영업내역",
      target: "shopAccumulate"
    }
  ],
  [
    {
      title: "직원영업현황",
      target: "workers1"
    },
    {
      title: "직원관리",
      target: "workers2"
    }
  ]
];

export default SideBar;
