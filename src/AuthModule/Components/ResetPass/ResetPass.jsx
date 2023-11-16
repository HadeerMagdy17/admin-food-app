import React from "react";
import logo from "../../../assets/images/4.png";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';

export default function ResetPass() {
    const {
        register, //btsheel el values ui inputs
        handleSubmit, //integration
        formState: { errors }, //errors
      } = useForm();
    
      const onSubmit = (data) => {
        console.log(data);
        // axios
        //   .put(
        //     "http://upskilling-egypt.com:3002/api/v1/Users/ChangePassword",
        //     data,
        //     {
        //       headers:{
        //         Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
        //       },
        //     }
        //   ) 
        //   .then((response) => {
        //     console.log(data);
        //     navigate("/login"); //to home screen
        //   })
        //   .catch((error) => {
        //     toast(error.response?.data?.message || 'An error occurred. Please try again.');
        //   });
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
         <h2>Reset Password</h2>
         <p>Please Enter Your Otp or Check Your Inbox</p>
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
           <input
             placeholder="OTP"
             className="form-control my-3"
             type="text"
             {...register("seed", {
               required: true,
             })}
           />
           {errors.seed &&
             errors.seed.type === "required" && (
               <span className="text-danger my-1">
                 otp is required
               </span>
             )}
         </div>

         <div className="form-group my-3">
           <input
             placeholder="new password"
             className="form-control my-3"
             type="password"
             {...register("password", {
               required: true,
             })}
           />
           {errors.password &&
             errors.password.type === "required" && (
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
             {...register("confirmPassword", {
               required: true,
             })}
           />
           {errors.confirmPassword &&
             errors.confirmPassword.type === "required" && (
               <span className="text-danger my-1">
                 confirm new password is required
               </span>
             )}
         </div>
       
         <div className="form-group my-3">
           <button className="btn btn-success w-100">
            Reset Password
           </button>
         </div>
       </form>
     </div>
   </div>
 </div>
</div>
  )
}
