import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import headerImg from "../../../assets/images/head1.png";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import noData from "../../../assets/images/nodata.png";
import recipeAlt from "../../../assets/images/recipe.png";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import PreLoader from "../../../SharedModule/Components/PreLoader/PreLoader";

export default function RecipesList() {
  // *************preloader*******************
  const [showLoading, setShowLoading] = useState(false);

  let [recipesList, setRecipesList] = useState([]);
  let [itemId, setItemId] = useState(0);
  let [categoriesList, setCategoriesList] = useState([]);
  let [tagList, setTagList] = useState([]);
  // let [file, setFile] = useState();
  //*****************validation using useform***********************
  let {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  // **********to use more than one modal in same component**********
  const [modalState, setModalState] = useState("close");
  // ********to show add modal*******************
  const showAddModal = () => {
    getCategoryList();
    getAllTags();
    reset();
    setValue("tagId", null);
    setValue("categoriesIds", null);
    setValue("recipeImage", null);
    setModalState("add-modal");
  };

  // **********image preview**********
  // function handleImgChange(e) {
  //   console.log(e.target.files);
  //   setFile(URL.createObjectURL(e.target.files[0]));
  // }

  // ********to show delete modal*******************

  const showDeleteModal = (id) => {
    setItemId(id);
    setModalState("delete-modal");
  };
  // ********to show update modal*******************
  const showUpdateModal = (item) => {
    console.log(item);
    getCategoryList();
    getAllTags();
    setValue("name", item?.name);
    setValue("price", item?.price);
    setValue("description", item?.description);
    setValue("tagId", item?.tag?.id);
    setValue("categoriesIds", item?.category[0]?.id);
    setValue("imagePath", item?.imagePath);

    setItemId(item.id);
    setModalState("update-modal");
  };
  // ********to close modal*******************
  const handleClose = () => setModalState("close");

  //************* to get categories list *******************
  const getCategoryList = () => {
    //get categ
    axios
      .get(
        "https://upskilling-egypt.com:443/api/v1/Category/?pageSize=10&pageNumber=1",
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
            theme: "colored",
          }
        );
      });
  };
  //************to get all tags*************************
  const getAllTags = () => {
    //get tags
    axios
      .get("https://upskilling-egypt.com:443/api/v1/tag/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        setTagList(response?.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message ||
            "An error occurred. Please try again.",
          {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          }
        );
      });
  };

  //****************delete Recipe****************************
  const deleteRecipe = () => {
    setShowLoading(true);
    axios
      .delete(`https://upskilling-egypt.com:443/api/v1/Recipe/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        console.log(response);
        handleClose();
        setShowLoading(false);
        getAllRecipes();
        toast.success(
          response?.data?.message || "Recipe deleted successfully",
          {
            position: "top-right",
            autoClose: 3000,
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
            theme: "colored",
          }
        );
        setShowLoading(false);
      });
  };
  // ************update recipe****************
  const updateRecipe = (data) => {
    console.log("update data", data);
    setShowLoading(true);
    axios
      .put(
        `https://upskilling-egypt.com:443/api/v1/Recipe/${itemId}`,
        { ...data, recipeImage: data?.recipeImage[0] },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response);
        handleClose();
        setShowLoading(false);
        getAllRecipes();
        toast.success(
          response?.data?.message || "Recipe updated successfully",
          {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          }
        );
      })
      .catch((error) => {
        console.log(response);

        toast.error(
          error?.response?.data?.message ||
            "An error occurred. Please try again.",
          {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          }
        );
        setShowLoading(false);
      });
  };

  //****************get all Recipe****************************
  const getAllRecipes = () => {
    setShowLoading(true);
    axios
      .get(
        "https://upskilling-egypt.com:443/api/v1/Recipe/?pageSize=30&pageNumber=1",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then((response) => {
        setRecipesList(response?.data?.data);
        setShowLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message ||
            "An error occurred. Please try again.",
          {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          }
        );
        setShowLoading(false);
      });
  };
  //****************add new Recipe****************************
  const addRecipe = (data) => {
    console.log("add recipe obj", data);
    setShowLoading(true);
    axios
      .post(
        "https://upskilling-egypt.com:443/api/v1/Recipe/",
        { ...data, recipeImage: data.recipeImage[0] },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response);
        handleClose();
        setShowLoading(false);
        getAllRecipes();
        toast.success(response?.data?.message || "Recipe added successfully", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.log(response);

        toast.error(
          error?.response?.data?.message ||
            "An error occurred. Please try again.",
          {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          }
        );
        setShowLoading(false);
      });
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  return showLoading ? (
    <PreLoader />
  ) : (
    <>
      <Header>
        <div className="header-content text-white rounded">
          <div className="row align-items-center  m-2 p-3">
            <div className="col-md-10">
              <h3 className="px-4">
                <strong>Recipes Items</strong>
              </h3>
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
          <h4>
            <strong>Recipes Table Details</strong>
          </h4>
          <p>You can check all details</p>
        </div>
        <div className="col-md-6 text-end">
          <button onClick={showAddModal} className="btn btn-success">
            Add new Recipe
          </button>
        </div>
        <div></div>
        {/* ******************** add modal ***************************/}
        <Modal show={modalState == "add-modal"} onHide={handleClose}>
          <Modal.Header closeButton>
            <h3>Add New Recipe</h3>
          </Modal.Header>
          <Modal.Body>
            <p>Welcome Back! Please enter your details</p>
            <form onSubmit={handleSubmit(addRecipe)}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Recipe name"
                  {...register("name", { required: true })}
                />
                {errors.name && errors.name.type === "required" && (
                  <span className="m-2 text-danger">field is required</span>
                )}
              </div>

              <select
                className="form-select my-1"
                aria-label="Default select example"
                {...register("tagId", { required: true, valueAsNumber: true })}
              >
                <option className="text-muted" value="">
                  Choose Tag
                </option>

                {tagList?.map((tag) => (
                  <option key={tag?.id} value={tag?.id}>
                    {tag?.name}
                  </option>
                ))}
              </select>

              {errors.tagId && errors.tagId.type === "required" && (
                <span className="m-2 text-danger">field is required</span>
              )}

              <select
                className="form-select my-1"
                aria-label="Default select example"
                {...register("categoriesIds", { valueAsNumber: true })}
              >
                <option className="text-muted" value="">
                  Choose Category
                </option>
                {categoriesList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.id}
                  </option>
                ))}
              </select>

              <div className="form-group">
                <input
                  className="form-control my-2"
                  type="number"
                  placeholder="Price"
                  {...register("price", { required: true })}
                />
                {errors.price && errors.price.type === "required" && (
                  <span className="m-2 text-danger">field is required</span>
                )}
              </div>

              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="description"
                  id="w3review"
                  name="w3review"
                  rows="4"
                  cols="50"
                  {...register("description", { required: true })}
                ></textarea>
                {errors.description &&
                  errors.description.type === "required" && (
                    <span className="m-2 text-danger">field is required</span>
                  )}
              </div>

              <div className="form-group ">
                <input
                  type="file"
                  className="form-control my-1 "
                  // onChange={handleImgChange}
                  {...register("recipeImage")}
                />
              </div>
              {/* <img className="w-50" src={file} /> */}
              <div className="text-end">
                <button className="btn btn-success  my-3">Add Recipe</button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
        {/* //*****************add modal******************** */}
        {/* **************** * delete modal *****************/}
        <Modal show={modalState == "delete-modal"} onHide={handleClose}>
          <Modal.Header closeButton>
            <h3>delete this Recipe?</h3>
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
                onClick={deleteRecipe}
                className="btn btn-outline-danger  my-3"
              >
                Delete this item
              </button>
            </div>
          </Modal.Body>
        </Modal>
        {/************************* * //delete modal*************** */}
        {/* ******************** update modal ***************************/}
        <Modal show={modalState == "update-modal"} onHide={handleClose}>
          <Modal.Header closeButton>
            <h3>Update Recipe</h3>
          </Modal.Header>
          <Modal.Body>
            <p>Welcome Back! Please enter your details</p>
            <form onSubmit={handleSubmit(updateRecipe)}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Recipe name"
                  {...register("name", { required: true })}
                />
                {errors.name && errors.name.type === "required" && (
                  <span className="m-2 text-danger">field is required</span>
                )}
              </div>
              <label>Tag</label>
              <select
                className="form-select"
                aria-label="Default select example"
                {...register("tagId", { required: true, valueAsNumber: true })}
              >
                {tagList?.map((tag) => (
                  <option key={tag?.id} value={tag?.id}>
                    {tag?.name}
                  </option>
                ))}
              </select>

              {errors.tagId && errors.tagId.type === "required" && (
                <span className="m-2 text-danger">field is required</span>
              )}

              <label>Category</label>
              <select
                className="form-select my-1"
                aria-label="Default select example"
                {...register("categoriesIds", { valueAsNumber: true })}
              >
                {categoriesList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.id}
                  </option>
                ))}
              </select>

              <div className="form-group">
                <input
                  className="form-control my-2"
                  type="number"
                  placeholder="Price"
                  {...register("price", { required: true })}
                />
                {errors.price && errors.price.type === "required" && (
                  <span className="m-2 text-danger">field is required</span>
                )}
              </div>

              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="description"
                  id="w3review"
                  name="w3review"
                  rows="4"
                  cols="50"
                  {...register("description", { required: true })}
                ></textarea>
                {errors.description &&
                  errors.description.type === "required" && (
                    <span className="m-2 text-danger">field is required</span>
                  )}
              </div>

              <div className="form-group ">
                <input
                  type="file"
                  className="form-control my-1 "
                  {...register("recipeImage")}
                />
                <img
                  className="w-25"
                  src={
                    `https://upskilling-egypt.com:443/` + recipesList?.imagePath
                  }
                  alt="recipe image"
                />
              </div>

              <div className="text-end">
                <button className="btn btn-success  my-3">update Recipe</button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
        {/* //*****************update modal******************** */}
        {recipesList?.length > 0 ? (
          <table className="table">
            <thead className="table-head table-success">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Recipe Name</th>
                <th scope="col">image</th>
                <th scope="col">price</th>
                <th scope="col">description</th>
                <th scope="col">Category</th>
                <th scope="col">Tag</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipesList.map((recipe, index) => (
                <tr key={recipe?.id} className="table-light">
                  <th scope="row">{index + 1}</th>
                  <td>{recipe?.name}</td>
                  <td>
                    <div className="rec-image-container">
                      {recipe.imagePath ? (
                        <img
                          className="w-100"
                          src={
                            `https://upskilling-egypt.com:443/` +
                            recipe?.imagePath
                          }
                        />
                      ) : (
                        <img className="w-100" src={recipeAlt} />
                      )}
                    </div>
                  </td>
                  <td>{recipe?.price}</td>
                  <td className="w-25">{recipe?.description}</td>
                  <td>{recipe?.category[0]?.name}</td>
                  <td>{recipe?.tag?.name}</td>
                  <td>
                    <i
                      onClick={() => showUpdateModal(recipe)}
                      className="fa fa-edit  text-success px-2"
                    ></i>
                    <i
                      onClick={() => showDeleteModal(recipe.id)}
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
    </>
  );
}
