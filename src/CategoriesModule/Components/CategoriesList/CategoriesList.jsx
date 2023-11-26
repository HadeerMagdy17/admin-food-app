import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import headerImg from "../../../assets/images/head1.png";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import noData from "../../../assets/images/nodata.png";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import {  toast } from "react-toastify";
import { useForm } from "react-hook-form";
export default function CategoriesList() {
  let [categoriesList, setCategoriesList] = useState([]);
  let [itemId, setItemId] = useState(0);

  // //**************** to use more than one modal in same component**********
  const [modalState, setModalState] = useState("close");

  const showAddModal = () => {
    setValue("name",null)
    setModalState("add-modal");
  };

  const showDeleteModal = (id) => {
    setItemId(id);
    setModalState("delete-modal");
  };
  const showUpdateModal = (categoryObj) => {
    setItemId(categoryObj.id);
    setValue("name",categoryObj.name)
    setModalState("update-modal");
  };
  const handleClose = () => setModalState("close");

 //****************delete category ***************************

  const deleteCategory = () => {
    axios.delete(`http://upskilling-egypt.com:3002/api/v1/Category/${itemId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    }
    ).then((response)=>{
      console.log(response);
      handleClose();
      getCategoryList();
      toast.success(
        response?.data?.message || "category deleted successfully",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    
    }).catch((error)=>{console.log(error)
      toast.error(
        error?.response?.data?.message ||
          "An error occurred. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    })
  };
 //****************update category**********************
  const updateCategory=(data)=>{
    axios.put(`http://upskilling-egypt.com:3002/api/v1/Category/${itemId}`,data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    }
    ).then((response)=>{
      console.log(response);
      handleClose();
      getCategoryList();
      toast.success(
        response?.data?.message || "category updated successfully",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    
    }).catch((error)=>{console.log(error)
      toast.error(
        error?.response?.data?.message ||
          "An error occurred. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );})
  }

  // //****************validation using useform**************
  let {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  // //****************api integration add categ*************
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
        getCategoryList();
        toast.success(
          response?.data?.message || "category added successfully",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message ||
            "An error occurred. Please try again.",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      });
  };
 //****************get all category************************
  const getCategoryList = () => {
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
        toast.error(
          error?.response?.data?.message ||
            "An error occurred. Please try again.",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      });
  };
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
          <button onClick={showAddModal} className="btn btn-success">
            Add new Category
          </button>
        </div>
        {/* **************** add modal************************** */}
        <Modal show={modalState == "add-modal"} onHide={handleClose}>
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
        {/* //add modal */}

           {/* ****************update modal *****************/}
           <Modal show={modalState == "update-modal"} onHide={handleClose}>
          <Modal.Header closeButton>
            <h3>Update Category</h3>
          </Modal.Header>
          <Modal.Body>
            <p>Welcome Back! Please enter your details</p>
            <form onSubmit={handleSubmit(updateCategory)}>
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
              <button className="btn btn-success w-100 my-3">update</button>
            </form>
          </Modal.Body>
        </Modal>
        {/***************** //update modal *****************/}
        {/* ****************delete modal **************** */}
        <Modal show={modalState == "delete-modal"} onHide={handleClose}>
          <Modal.Header closeButton>
            <h3>delete this Category?</h3>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <img src={noData} />
              <p>
                are you sure you want to delete this item ? if you are sure just
                click on delete it
              </p>
            </div>
            <div className="text-end">
              <button
                onClick={deleteCategory}
                className="btn btn-outline-danger  my-3"
              >
                Delete this item
              </button>
            </div>
          </Modal.Body>
        </Modal>
        {/* ****************delete modal *****************/}

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
                    <th scope="row">{category?.id}</th>
                    <td>{category.name}</td>
                    <td>
                      <i onClick={()=>showUpdateModal(category)}
                       className="fa fa-edit fa-2x text-warning px-2"></i>
                      <i
                        onClick={()=>showDeleteModal(category.id)}
                        className="fa fa-trash fa-2x text-danger"
                      ></i>
                    </td>
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
