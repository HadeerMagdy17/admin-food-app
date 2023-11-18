import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./AuthModule/Components/Login/Login";
import Home from "./HomeModule/Components/Home/Home";
import MasterLayout from "./SharedModule/Components/MasterLayout/MasterLayout";
import NotFound from "./SharedModule/Components/NotFound/NotFound";
import UsersList from "./UsersModule/Components/UsersList/UsersList";
import RecipesList from "./RecipesModule/Components/RecipesList/RecipesList";
import CategoriesList from "./CategoriesModule/Components/CategoriesList/CategoriesList";
import AuthLayout from "./SharedModule/Components/AuthLayout/AuthLayout";
import ForgetPass from "./AuthModule/Components/ForgetPas/ForgetPass";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import PotectedRoute from "./SharedModule/Components/ProtectedRoute/PotectedRoute";
import ResetPass from "./AuthModule/Components/ResetPass/ResetPass";
import ResetPassRequest from "./AuthModule/Components/ResetPassRequest/ResetPassRequest";

function App() {
  const [adminData, setAdminData] = useState(null);

  let saveAdminData = () => {
    let encodedToken = localStorage.getItem("adminToken");
    let decodedToken = jwtDecode(encodedToken);
    setAdminData(decodedToken);
  };
  // to handle click refresh in browser 3shan myzharsh null
  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      //3ndy data feha w da m3nah eny admin
      saveAdminData(); //call
    }
  }, []);

  const routes = createBrowserRouter([
    {
      path: "dashboard",
      element: (
        <PotectedRoute  adminData={adminData}>
          <MasterLayout adminData={adminData} />
        </PotectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "users", element: <UsersList /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "categories", element: <CategoriesList /> },
      ],
    },
    {
      path: "/",
      element:<AuthLayout /> ,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveAdminData={saveAdminData} /> },
        { path: "login", element: <Login saveAdminData={saveAdminData} /> },
        { path: "forget-password", element: <ForgetPass /> },
        { path: "reset-password", element: <ResetPass /> },
        // { path: "reset-password-request", element: <ResetPassRequest /> },
        
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
