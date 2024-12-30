import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AboutUs from "./AboutUs"; 
import SignIn from "./sign_in";
import Login from "./login";
import WaterIntake from "./add_water";
import WaterIntakeList from "./dashboard";

const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: "AboutUs", element:<AboutUs/>},
    { path:'sign_in', element:<SignIn/>},
    { path:'login',element:<Login/>},
    { path:'add_water',  element:<WaterIntake/>},
    { path:'dashboard',  element:<WaterIntakeList/>}
]);

export default router;