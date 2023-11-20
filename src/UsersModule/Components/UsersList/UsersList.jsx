import React from 'react'
import Header from "../../../SharedModule/Components/Header/Header";
import headerImg from "../../../assets/images/head1.png";
export default function UsersList() {
  return (
    <>
  <Header>
  <div className="header-content text-white rounded">
          <div className="row align-items-center  m-2 p-3">
            <div className="col-md-10">
              <h3>users Items</h3>
              <p className="w-75">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,
                recusandae natus? Nobis incidunt vitae nesciunt culpa cum
                laboriosam nam harum, voluptates laudantium delectus sed qui
                ipsa mollitia hic illo fugiat quo eveniet. At dicta aliquam
                culpa dolore esse consectetur nobis.
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
    users list  
    </>
  )
}
