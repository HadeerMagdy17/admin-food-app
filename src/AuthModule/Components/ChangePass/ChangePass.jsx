import React,{useState} from "react";
import logo from "../../../assets/images/4.png";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function ChangePass({ handleClose }) {
  // *************control show password***************************
  const [showPass, setShowPass] = useState(false);
  const clickHandler = () => {
    setShowPass(!showPass);
  };
  // ********************************

  //****************use form to validate**********
  const {
    register, //btsheel el values ui inputs
    handleSubmit, //integration
    formState: { errors }, //errors
  } = useForm();
  //****************to change password******************
  const onSubmit = (data) => {
    console.log(data);
    axios
      .put(
        "https://upskilling-egypt.com:443/api/v1/Users/ChangePassword",
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
          error?.response?.data?.message ||
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
              <h4 className="my-2">Change Your Password</h4>
              <p>Enter your details below</p>

              {/* <div className="form-group my-3">
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
              </div> */}
              {/*old password input */}
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <i className="fa-solid fa-key"></i>
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Old Password"
                  aria-label="password"
                  aria-describedby="password-input"
                  {...register("oldPassword", {
                    required: true,
                  })}
                />

                <InputGroup.Text onClick={clickHandler}>
                  {showPass ? (
                    <i className="fa-regular fa-eye-slash"></i>
                  ) : (
                    <i className="fa-regular fa-eye"></i>
                  )}
                </InputGroup.Text>
              </InputGroup>
              {errors.oldPassword && errors.oldPassword.type === "required" && (
                <span className="text-danger my-1">
                  old password is required
                </span>
              )}
              {/*//password input*/}
              {/* new password input */}
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <i className="fa-solid fa-key"></i>
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="new password"
                  aria-label="password"
                  aria-describedby="password-input"
                  {...register("newPassword", {
                    required: true,
                  })}
                />

                <InputGroup.Text onClick={clickHandler}>
                  {showPass ? (
                    <i className="fa-regular fa-eye-slash"></i>
                  ) : (
                    <i className="fa-regular fa-eye"></i>
                  )}
                </InputGroup.Text>
              </InputGroup>
              {errors.newPassword &&
                  errors.newPassword.type === "required" && (
                    <span className="text-danger my-1">
                      new password is required
                    </span>
                  )}
              {/* //new password input */}

{/* confirm new password */}
<InputGroup className="mb-3">
                <InputGroup.Text>
                  <i className="fa-solid fa-key"></i>
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="confirm New Password"
                  aria-label="password"
                  aria-describedby="password-input"
                  {...register("confirmNewPassword", {
                    required: true,
                  })}
                />

                <InputGroup.Text onClick={clickHandler}>
                  {showPass ? (
                    <i className="fa-regular fa-eye-slash"></i>
                  ) : (
                    <i className="fa-regular fa-eye"></i>
                  )}
                </InputGroup.Text>
              </InputGroup>
              {errors.confirmNewPassword &&
                  errors.confirmNewPassword.type === "required" && (
                    <span className="text-danger my-1">
                      confirm new password is required
                    </span>
                  )}
{/* //confirm new password */}
              {/* <div className="form-group my-3">
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
              </div> */}

              {/* <div className="form-group my-3">
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
              </div> */}

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
