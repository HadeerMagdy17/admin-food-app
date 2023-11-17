import React, { useState } from "react";
import logo from "../../../assets/images/4.png";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../ForgetPassModal/Modal";

export default function ForgetPass() {
  const [centredModal, setCentredModal] = useState(false);
  const toggleOpen = () => setCentredModal(!centredModal);
  const {
    register, //btsheel el values ui inputs
    handleSubmit, //integration
    formState: { errors }, //errors
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    axios
      .put(
        "http://upskilling-egypt.com:3002/api/v1/Users/ChangePassword",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(data);
        navigate("/login"); //to home screen
      })
      .catch((error) => {
        toast(
          error.response?.data?.message ||
            "An error occurred. Please try again."
        );
      });
  };
  return (
    <div className="Auth-container container-fluid">
      <ToastContainer />
      <div className="row bg-overlay vh-100 justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="bg-white rounded p-3">
            <div className="logo-cont  text-center">
              <img src={logo} alt="logo" />
            </div>

            <form className="w-75 m-auto" onSubmit={handleSubmit(onSubmit)}>
              <h2>Change Your Password</h2>
              <p>Enter your details below</p>

              <div className="form-group my-3">
                <input
                  placeholder="old password"
                  className="form-control my-3"
                  type="password"
                  {...register("oldPassword", {
                    required: true,
                  })}
                />
                {errors.oldPassword &&
                  errors.oldPassword.type === "required" && (
                    <span className="text-danger my-1">
                      old password is required
                    </span>
                  )}
              </div>

              <div className="form-group my-3">
                <input
                  placeholder="new password"
                  className="form-control my-3"
                  type="password"
                  {...register("newPassword", {
                    required: true,
                  })}
                />
                {errors.newPassword &&
                  errors.newPassword.type === "required" && (
                    <span className="text-danger my-1">
                      new password is required
                    </span>
                  )}
              </div>

              <div className="form-group my-3">
                <input
                  placeholder="confirm New Password"
                  className="form-control my-3"
                  type="password"
                  {...register("confirmNewPassword", {
                    required: true,
                  })}
                />
                {errors.confirmNewPassword &&
                  errors.confirmNewPassword.type === "required" && (
                    <span className="text-danger my-1">
                      confirm new password is required
                    </span>
                  )}
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <label className="form-check-label">Register now?</label>
                </div>
                <Modal centredModal={centredModal} setCentredModal={setCentredModal} toggleOpen={toggleOpen}>
                 
                  {/* <a onClick={toggleOpen} className="text-success">
                    Forgot password?
                  </a> */}
                </Modal>
              </div>
              <div className="form-group my-3">
                <button className="btn btn-success w-100">
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
