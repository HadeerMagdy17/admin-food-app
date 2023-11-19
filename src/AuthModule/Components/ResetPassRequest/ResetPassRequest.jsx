import React from "react";
import logo from "../../../assets/images/4.png";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ResetPassRequest() {
  const navigate = useNavigate();
  const {
    register, //btsheel el values ui inputs
    handleSubmit, //integration
    formState: { errors }, //errors
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("http://upskilling-egypt.com:3002/api/v1/Users/Reset/Request", data)
      .then((response) => {
        console.log(data);
        navigate("/reset-password");

        toast.success(
          response?.data?.message || "Code sent to your mail please check",
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
        toast.error(
          error.response?.data?.message ||
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
  return (
    <div className="Auth-container container-fluid">
      <div className="row bg-overlay vh-100  justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="bg-white rounded p-3">
            <div className="logo-cont  text-center">
              <img src={logo} alt="logo" />
            </div>
            <form className="w-75 m-auto" onSubmit={handleSubmit(onSubmit)}>
              <h2>Request Reset Password</h2>
              <p>Please Enter Your Email And Check Your Inbox</p>

              <div className="form-group my-3">
                <input
                  placeholder="Email"
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
                <button className="btn btn-success w-100">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
