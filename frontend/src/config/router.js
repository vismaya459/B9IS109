import { createBrowserRouter } from "react-router-dom";

import Layout from "../pages/layout";
import Home from "../pages/home";
import Shop from "../pages/shop";
import Cart from "../pages/cart";
import Checkout from "../pages/checkout";
import Profile from "../pages/profile";
import AdminDashboard from "../pages/adminDashboard";
import EditCat from "../pages/editCategory";
import DelCat from "../pages/delCategory";
import EditProd from "../pages/editProduct";
import DelProd from "../pages/deleteProduct";
import SignIn from "../pages/signin";
import SignUp from "../pages/signup";
import ErrorBox from "../components/errorBox";
import { AddUser } from "../pages/addUser";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            }, {
                path: "/shop",
                element: <Shop />,
            }, {
                path: "/cart",
                element: <Cart />,
            }, {
                path: "/checkout",
                element: <Checkout />,
            }, {
                path: "/profile/:id",
                element: <Profile />
            }, {
                path: "/admin-dashboard",
                element: <AdminDashboard />,
            }, {
                path: "/edit-cat",
                element: <EditCat />,
            }, {
                path: "/del-cat",
                element: <DelCat />,
            }, {
                path: "/edit-prod/:id",
                element: <EditProd />,
            }, 
            {
                path: "/add-user",
                element: <AddUser/>,
            }, 
            {
                path: "/del-prod",
                element: <DelProd />,
            }, {
                path: "*",
                element: <ErrorBox />,
            }
        ],
    }, {
        path: "/signin",
        element: <SignIn />,
    }, {
        path: "/signup",
        element: <SignUp />,
    }, {
        path: "*",
        element: <ErrorBox />,
    }
]);

export default router;