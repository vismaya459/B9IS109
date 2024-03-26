// Importing react
import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { redirect, useNavigate } from "react-router-dom";
// Importing stylesheet
import "../style/navbar.css";
// Importing Font Awesome components and icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench, faStore, faUser, faShoppingCart, faSignOut } from '@fortawesome/free-solid-svg-icons';

import { TiUser } from "react-icons/ti"; // For user icon

import { Store } from "../config/utils";

export default function Navbar(props) {
    // Creating variable responsible for web navigation
    const navigate = useNavigate();
    // Context for storing information like session details
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart,
        userInfo
    } = state;

    const [userInformation, setUserInformation] = useState(userInfo);

    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        try {
            userInfo.isAdmin && setAdmin(true);
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    function signOutHandler() {
        ctxDispatch({
            type: 'USER_SIGNOUT'
        })
        navigate("/");
    }

    return (
        <>
            <nav>
                <div className="logo">
                    <label><div onClick={() => { navigate("/") }}>BeautyBasket</div></label>
                </div>
                <div className="nav-actions">
                    {admin && (
                        <button className="nav-btn" onClick={() => { navigate("/admin-dashboard") }}>
                            <div>
                                {/* Font Awesome wrench icon */}
                                <FontAwesomeIcon icon={faWrench} size="xl" />
                                <p className="nav-action-label">Admin</p>
                            </div>
                        </button>
                    )}

                    <button className="nav-btn" onClick={() => { navigate("/shop") }}>
                        <div>
                            {/* Font Awesome store icon */}
                            <FontAwesomeIcon icon={faStore} size="xl" />
                            <p className="nav-action-label">Shop</p>
                        </div>
                    </button>

                    <button className="nav-btn" onClick={() => { navigate("/cart") }}>
                        <div>
                            {/* Font Awesome shopping cart icon */}
                            <FontAwesomeIcon icon={faShoppingCart} size="xl" />
                            <p className="nav-action-label">Cart</p>
                            {cart.cartItems.length > 0 && (
                                <span className="cart-count" id="red">
                                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                                </span>
                            )}
                        </div>
                    </button>

                    {userInfo ? (
                        <>
                            <button className="nav-btn" onClick={() => { navigate(`/profile/${userInformation._id}`) }}>
                                <div>
                                    {/* Font Awesome user icon */}
                                    <FontAwesomeIcon icon={faUser} size="xl" />
                                    <p className="nav-action-label">Profile</p>
                                </div>
                            </button>

                            <button className="nav-btn" onClick={signOutHandler}>
                                <div>
                                    {/* Font Awesome sign-out icon */}
                                    <FontAwesomeIcon icon={faSignOut} size="xl" />
                                    <p className="nav-action-label">Sign Out</p>
                                </div>
                            </button>
                        </>
                    ) : (
                        <button className="nav-btn" onClick={() => { navigate("/signin") }}>
                            <div>
                                {/* React-icons user icon */}
                                <TiUser size={25} />
                                <p className="nav-action-label">Sign In</p>
                            </div>
                        </button>
                    )}
                </div>
            </nav>
        </>
    );
};
