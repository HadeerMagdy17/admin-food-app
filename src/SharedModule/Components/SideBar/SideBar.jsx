import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../../assets/images/3.png";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

export default function SideBar() {
  let [isCollapsed, setIsCollapsed] = useState(false);
  let handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  let navigate = useNavigate();
  let logOut = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };
  return (
    <div className="sidebar-container">
 <Sidebar className="vh-100" collapsed={isCollapsed}>
  <div>
          <img  onClick={handleToggle} className="w-75" src={logo} alt="" /></div>
      <Menu>
      
        <MenuItem
          icon={<i className="fa fa-home"></i>}
          component={<Link to="/dashboard" />}
        >
          Home
        </MenuItem>
        <MenuItem
          icon={<i className="fa fa-users"></i>}
          component={<Link to="/dashboard/users" />}
        >
          Users
        </MenuItem>
        <MenuItem
          icon={<i className="fa fa-home"></i>}
          component={<Link to="/dashboard/recipes" />}
        >
          Recipes
        </MenuItem>
        <MenuItem
          icon={<i className="fa fa-home"></i>}
          component={<Link to="/dashboard/categories" />}
        >
          Categories
        </MenuItem>
        <MenuItem
          icon={<i className="fa fa-home"></i>}
          component={<Link to="change-password" />}
        >
          Change Password
        </MenuItem>
        <MenuItem
          icon={<i className="fa fa-home"></i>}
          component={<Link to="login" />}
        >
          Logout
        </MenuItem>
      </Menu>
    </Sidebar>
    </div>
   
    // <div>
    //   sidebar
    //   <button className="btn btn-danger" onClick={logOut}>Logout</button>
    // </div>
  );
}
