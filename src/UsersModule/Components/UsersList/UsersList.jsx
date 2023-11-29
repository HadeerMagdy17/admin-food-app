import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import headerImg from "../../../assets/images/head1.png";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import noData from "../../../assets/images/nodata.png";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import { toast } from "react-toastify";
import PreLoader from "../../../SharedModule/Components/PreLoader/PreLoader";

export default function UsersList() {
  let [usersList, setUsersList] = useState([]);
  let [itemId, setItemId] = useState(0);
   // *************preloader*******************
   const [showLoading, setShowLoading] = useState(false);

  // //**************** to use more than one modal in same component**********
  const [modalState, setModalState] = useState("close");
  const showDeleteModal = (id) => {
    setItemId(id);
    setModalState("delete-modal");
  };

  const handleClose = () => setModalState("close");

  //****************delete user ***************************

  const deleteUser = () => {
    setShowLoading(true);
    axios
      .delete(`https://upskilling-egypt.com:443/api/v1/Users/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        console.log(response);
        handleClose();
        setShowLoading(false);
        getAllUsers();
        toast.success(response?.data?.message || "user deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
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
        setShowLoading(false);
      });
  };

  //****************get all user************************
  const getAllUsers = () => {
    setShowLoading(true);
    //get user
    axios
      .get(
        "https://upskilling-egypt.com:443/api/v1/Users/?pageSize=10&pageNumber=1",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then((response) => {
        console.log("userslist", response?.data?.data);
        setShowLoading(false);
        setUsersList(response?.data?.data);
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
        setShowLoading(false);
      });
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return showLoading ? (
    <PreLoader/>
  ) : (
    <>
      <Header>
        <div className="header-content text-white rounded">
          <div className="row align-items-center  m-2 p-3">
            <div className="col-md-10">
              <h3 className="px-4"><strong>Users Items</strong></h3>
              <p className="w-75 px-4">
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
          <h4><strong>Users Table Details</strong></h4>
          <p>You can check all details</p>
        </div>

        {/* ****************delete modal **************** */}
        <Modal show={modalState == "delete-modal"} onHide={handleClose}>
          <Modal.Header closeButton>
            <h3>delete this user?</h3>
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
                onClick={deleteUser}
                className="btn btn-outline-danger  my-3"
              >
                Delete this item
              </button>
            </div>
          </Modal.Body>
        </Modal>
        {/* //****************delete modal *****************/}

        <div>
          {usersList.length > 0 ? (
            <table className="table">
              <thead className="table-head table-success">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((user, index) => (
                  <tr key={user?.id} className="table-light">
                    <th scope="row">{index + 1}</th>
                    <td>{user?.userName}</td>

                    <td>
                      <div className="image-container">
                        {user?.imagePath ? (
                          <img
                            className="w-100"
                            src={
                              `https://upskilling-egypt.com/` + user?.imagePath
                            }
                          />
                        ) : (
                          <img className="w-100" src={noData} />
                        )}
                      </div>
                    </td>

                    <td>{user?.phoneNumber}</td>
                    <td>
                      <i
                        onClick={() => showDeleteModal(user.id)}
                        className="fa fa-trash  text-danger"
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
