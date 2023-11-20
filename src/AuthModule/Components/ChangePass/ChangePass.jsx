import React from "react";
import logo from "../../../assets/images/4.png";
import axios from "axios";
import { useForm } from "react-hook-form";
import {  toast } from "react-toastify";

export default function ChangePass({handleClose}) {
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
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(data);
        handleClose();
        toast.success(
          response?.data?.message || "password changed successfully",
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
        toast(
          error.response?.data?.message ||
            "An error occurred. Please try again."
        );
      });
  };
  return (
    <div className=" container-fluid">
      
      <div className="row  justify-content-center align-items-center">
        <div className="col-md-10">
          <div className="bg-white rounded ">
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
