import React from "react";
import logo from "../../../assets/images/4.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "../ForgetPassModal/Modal";

export default function Login({saveAdminData}) {
  const navigate = useNavigate();
  const {
    register, //btsheel el values ui inputs
    handleSubmit, //integration
    formState: { errors }, //errors
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("http://upskilling-egypt.com:3002/api/v1/Users/Login", data)
      .then((response) => {
        localStorage.setItem("adminToken",response.data.token);
        saveAdminData();
        navigate("/dashboard"); //to home screen
      })
      .catch((error) => {
        toast(error.response.data.message);
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
              <h2>Log In</h2>
              <p>Welcome Back! Please enter your details</p>
              <div className="form-group my-3">
                <input
                  placeholder="enter your email"
                  className="form-control "
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  })}
                />
                {errors.email && errors.email.type === "required" && (
                  <span className=" text-danger my-1">email is required</span>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <span className=" text-danger my-1">invalid email</span>
                )}
              </div>
              <div className="form-group my-3">
                <input
                  placeholder="password"
                  className="form-control my-3"
                  type="password"
                  {...register("password", {
                    required: true,
                  })}
                />
                {errors.password && errors.password.type === "required" && (
                  <span className="text-danger my-1">password is required</span>
                )}
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <label className="form-check-label" for="form2Example3">
                    Register now?
                  </label>
                </div>
                <a href="#!" className="text-success">
                  Forgot password?
                </a>
              </div>
              <div className="form-group my-3">
                <button className="btn btn-success w-100">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
