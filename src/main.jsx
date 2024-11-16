import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import "./index.css";
import Example from "./component/Home";
import Show from "./component/Show";
import Mybids from "./component/Mybids";
import Login from "./component/login";
import Myproduct from "./component/Myproduct";
import DeleteProduct from "./component/Deleteproduct";
import Update from "./component/Update"
import Myprofile from "./component/Myprofile";
import Showbids from "./component/showbids";
import Products from "./component/Products";
import Approve from "./component/Approve";
import Reject from "./component/Reject";
import Users from "./component/Users";
import Block from "./component/Block";
import Resister from "./component/Resister";
import Logout from "./component/logout";
import Error from "./component/error";
import Unblock from "./component/unblock";
import Forgot from "./component/forgot";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />

  },
  {
    path: "/home",
    element: <Example />

  },
  {
    path: "/resister",
    element: <Resister />

  },
  {
    path: "/logout",
    element: <Logout />

  },
  {
    path: "/forgot",
    element: <Forgot />

  },
  {
    path: "/Myproduct",
    element: <Myproduct />

  },
  {
    path: "/show/:productid",
    element: <Show />

  },
  {
    path: "/mybids",
    element: <Mybids />

  },
  {
    path: "/showbids/:productid",
    element: <Showbids />

  },
  {
    path: "/myprofile",
    element: <Myprofile />

  },
  {
    path: "/delete/:productid",
    element: <DeleteProduct />

  },
  {
    path: "/edit/:productid",
    element: <Update />

  },
  {
    path: "/approve/:productid",
    element: <Approve />

  },
  {
    path: "/reject/:productid",
    element: <Reject />

  },
  {
    path: "/block/:userid",
    element: <Block />

  },
  {
    path: "/unblock/:userid",
    element: <Unblock/>

  },
  {
    path: "/admin/Products",
    element: <Products />

  },
  {
    path: "/admin/Users",
    element: <Users />

  },
  {
    path: "/error",
    element: <Error />

  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);