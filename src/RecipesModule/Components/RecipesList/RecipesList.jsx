import React from 'react'
import Header from "../../../SharedModule/Components/Header/Header";
import headerImg from "../../../assets/images/head1.png";
export default function RecipesList() {
  return (
    <>
      <Header>
      <div className="header-content text-white rounded">
          <div className="row align-items-center  m-2 p-3">
            <div className="col-md-10">
              <h3>Recipes Items</h3>
              <p className="w-75">
              You can now add your items that any user can order it from the Application and you can edit
              </p>
            </div>
            <div className="col-md-2">
              <div>
                <img src={headerImg} className="img-fluid" alt="header" />
              </div>
            </div>
          </div>
        </div>
      </Header>
    </>
     
 
  )
}
