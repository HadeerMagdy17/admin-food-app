import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import headerImg from "../../../assets/images/head1.png";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import { useForm } from "react-hook-form";
export default function CategoriesList() {
  let [categoriesList, setCategoriesList] = useState([]);

  // modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //validation using useform
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //api integration add categ
  let onSubmit = (data) => {
    console.log(data);
    axios
      .post("http://upskilling-egypt.com:3002/api/v1/Category/", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        handleClose();
        getCategoryList()
      })
      .catch((error) => {
        console.log(error);
      });
  };
  ///////////////////////
  const getCategoryList=()=>{
        //get categ
        axios
        .get(
          "http://upskilling-egypt.com:3002/api/v1/Category/?pageSize=10&pageNumber=1",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }
        )
        .then((response) => {
          setCategoriesList(response?.data?.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }
  useEffect(() => {
    //btcall data of categories
    getCategoryList();
  }, []);
  return (
    <>
      <Header>
        <div className="header-content text-white rounded">
          <div className="row align-items-center  m-2 p-3">
            <div className="col-md-10">
              <h3 className="mb-4">categories Items !</h3>
              <p className="w-75">
                You can now add your items that any user can order it from the
                Application and you can edit
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

      <div className="row justify-content-between mx-4 p-3 ">
        <div className="col-md-6 px-4">
          <h6>Categories Table Details</h6>
          <p>You can check all details</p>
        </div>
        <div className="col-md-6 text-end">
          <button onClick={handleShow} className="btn btn-success">
            Add new Category
          </button>
        </div>
        {/* modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <h3>Add Category</h3>
          </Modal.Header>
          <Modal.Body>
            <p>Welcome Back! Please enter your details</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter category name"
                  {...register("name", { required: true })}
                />
                {errors.name && errors.name.type === "required" && (
                  <span className="m-2 text-danger">field is required</span>
                )}
              </div>
              <button className="btn btn-success w-100 my-3">Save</button>
            </form>
          </Modal.Body>
        </Modal>
        {/* //modal */}

        <div>
          {categoriesList.length > 0 ? (
            <table className="table">
              <thead className="table-head">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categoriesList.map((category) => (
                  <tr key={category?.id}>
                    <th scope="row">{category.id}</th>
                    <td>{category.name}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <NoData />
          )}
        </div>
      </div>
    </>
  );
}
