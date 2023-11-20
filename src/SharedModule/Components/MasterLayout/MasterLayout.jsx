import React from "react";
import SideBar from "./../SideBar/SideBar";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";
import Header from "../Header/Header.jsx";
import headerImg from "../../../assets/images/head1.png"

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
            <Header>
            <div className="bg-info  p-3 rounded">
      <div className="row align-items-center">
        <div className="col-md-10">
          <h3>Recipes Items</h3>
          <p className="w-75">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,
            recusandae natus? Nobis incidunt vitae nesciunt culpa cum laboriosam
            nam harum, voluptates laudantium delectus sed qui ipsa mollitia hic
            illo fugiat quo eveniet. At dicta aliquam culpa dolore esse
            consectetur nobis.
          </p>
        </div>
        <div className="col-md-2">
          <div><img src={headerImg} className="img-fluid" alt="header"/></div>
        </div>
      </div>
    </div>
            </Header>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
