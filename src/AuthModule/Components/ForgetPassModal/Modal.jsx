import React, { useState } from "react";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
} from "mdb-react-ui-kit";
import { useForm } from "react-hook-form";

export default function Modal({ centredModal, setCentredModal, toggleOpen }) {
  const {
    register, //btsheel el values ui inputs
    handleSubmit, //integration
    formState: { errors }, //errors
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <a onClick={toggleOpen} className="text-success">
        Forgot password?
      </a>

      <MDBModal tabIndex="-1" open={centredModal} setOpen={setCentredModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalBody className="my-4">
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
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
