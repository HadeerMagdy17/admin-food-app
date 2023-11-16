import React from "react";
import SideBar from "./../SideBar/SideBar";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";
import Header from "../Header/Header.jsx";

export default function MasterLayout({adminData}) {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <SideBar />
          </div>
          <div className="col-md-10">
            <Navbar adminData={adminData}/>
            <Header/>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
