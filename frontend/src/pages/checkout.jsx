import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/checkout.css";
import "../style/shop.css";
import "../style/form.css";
import Product from "../components/Product";
import { Store } from "../config/utils";
import axios from "axios";
import { delay } from "../config/utils";

export default function Checkout() {
    const navigate = useNavigate();

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart: { cartItems }, userInfo } = state;

    function roundToTwo(num) {
        return +(Math.round(num + "e+2") + "e-2");
    }

    const subtotal = roundToTwo(cartItems.reduce((a, c) => a + (c.prodPrice * c.quantity), 0));
    const tax = roundToTwo(subtotal * 0.135);

    const [msg, setMsg] = useState("");
    const [color, setColor] = useState("");

    useEffect(() => {
        if (!userInfo) {
            navigate('/signin');
        }
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: 0,
        card_name: "",
        card_no: "",
        card_exp: "",
        cvv: "",
    });

    function handleChange(event) {
        const { name, value, type, checked } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const sendCart = [];
        try {
            await cartItems.map((item) => {
                const { prodName, quantity } = item;
                console.log(item);
                sendCart.push({ [prodName]: quantity });
            });

            console.log(sendCart);

            const { data } = await axios.post('/api/orders/place', {
                id: userInfo._id,
                name: formData.name,
                email: formData.email,
                address: formData.address + ", " + formData.city + ", " + formData.state + ", " + formData.zip,
                purchase: sendCart
            });
            if (data.message === "Order placed!") {
                ctxDispatch({
                    type: 'CART_CLEAR',
                });
                setMsg(data.message);
                setColor("green");
                await delay(1000);
                setMsg("Redirecting... wait");
                await delay(500);
                navigate("/");
            }
        } catch (error) {
            setMsg(error.message);
            setColor("red");
        }
    }

    return (
        <>
            <div className="checkout flex">
                <div className="checkout-form">
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <div className="input-box">
                                <div className="input msg" id={color}>
                                    {msg}
                                </div>
                            </div>

                            <h1 className="title">Your Details:</h1>

                            <div className="input-box">
                                <label
                                    for="fullname">
                                    <i className="fa fa-user"></i> Full Name:
                                </label>

                                <input
                                    className="input"
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Eg: John Doe"
                                    autocomplete="off"
                                    required
                                />
                            </div>

                            <div className="input-box">
                                <label
                                    for="email">
                                    <i className="fa fa-envelope"></i> Email:
                                </label>

                                <input
                                    className="input"
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Eg: johndoe@outlook.com"
                                    autocomplete="off"
                                    required
                                />
                            </div>

                            <div className="input-box">
                                <label
                                    for="name">
                                    <i className="fa fa-address-card-o"></i> Address:
                                </label>

                                <input
                                    className="input"
                                    type="text"
                                    name="address"
                                    id="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Eg: D01D283, Dublin"
                                    autocomplete="off"
                                    required
                                />
                            </div>

                            <div className="input-box">
                                <label
                                    for="city">
                                    <i className="fa fa-institution"></i> City:
                                </label>

                                <input
                                    className="input"
                                    type="text"
                                    name="city"
                                    id="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Eg: Dublin"
                                    autocomplete="off"
                                    required
                                />
                            </div>

                            <div className="input-box">
                                <label
                                    for="state">
                                    <i className="fa-solid fa-mountain-city"></i> State:
                                </label>

                                <input
                                    className="input"
                                    type="text"
                                    name="state"
                                    id="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="Eg: Dublin"
                                    autocomplete="off"
                                    required
                                />
                            </div>

                            <div className="input-box">
                                <label
                                    for="zip">
                                    <i className="fa-solid fa-location-crosshairs"></i> EIR Code:
                                </label>

                                <input
                                    className="input"
                                    type="number"
                                    name="zip"
                                    id="zip"
                                    value={formData.zip}
                                    onChange={handleChange}
                                    placeholder="Eg: 000000"
                                    autocomplete="off"
                                    required
                                />
                                <br></br>
                            </div>
                            <h1 className="title">Payment Details:</h1>
                            <div className="input-box">
                                <label
                                    for="city">
                                    <i className="fa-solid fa-signature"></i> Name on the card:
                                </label>

                                <input
                                    className="input"
                                    type="text"
                                    name="card_name"
                                    id="card_name"
                                    value={formData.card_name}
                                    onChange={handleChange}
                                    placeholder="Eg: John Doe"
                                    autocomplete="off"
                                    required
                                />
                            </div>

                            <div className="input-box">
                                <label
                                    for="card-no">
                                    <i className="fa-solid fa-list-ol"></i> Card Number:
                                </label>

                                <input
                                    className="input"
                                    type="text"
                                    name="card_no"
                                    id="card_no"
                                    value={formData.card_no}
                                    onChange={handleChange}
                                    placeholder="Eg: 1234-5678-1011-1213"
                                    autocomplete="off"
                                    required
                                />
                            </div>

                            <div className="input-box">
                                <label
                                    for="card-exp">
                                    <i className="fa-solid fa-calendar-days"></i> Expiry Date:
                                </label>

                                <input
                                    className="input"
                                    type="month"
                                    name="card_exp"
                                    id="card_exp"
                                    value={formData.card_exp}
                                    onChange={handleChange}
                                    autocomplete="off"
                                    required
                                />
                            </div>

                            <div className="input-box">
                                <label
                                    for="card-cvv">
                                    <i className="fa-solid fa-key"></i> CVV:
                                </label>

                                <input
                                    className="input"
                                    type="password"
                                    name="cvv"
                                    id="cvv"
                                    value={formData.cvv}
                                    onChange={handleChange}
                                    autocomplete="off"
                                    placeholder="Eg: ***"
                                    required
                                />
                            </div>

                            <div className="input-box">
                                <button
                                    className="form-btn"
                                    type="submit">
                                    Complete Purchase
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="checkout-store">
                    <h1 className="title">Cart Items</h1>

                    <div className="store" id="cart-items">
                        {cartItems.map(prod => (
                            <div key={prod._id}>
                                <Product
                                    productId={prod.productId}
                                    prodName={prod.prodName}
                                    prodQty={prod.prodQty}
                                    prodPrice={prod.prodPrice}
                                    prodType={prod.prodType}
                                    prodURL={prod.prodURL}
                                    prodQuantity={prod.quantity}
                                    page={"checkout"}
                                />
                            </div>
                        ))}
                    </div>
                    <br />
                    <hr />
                    <div className="checkout-total flex">
                        <h1 className="subtitle">Subtotal&emsp;&nbsp;: </h1>
                        <h1 className="subtitle">{subtotal}</h1>
                    </div>
                    <div className="checkout-total flex">
                        <h1 className="subtitle">Vat (13.5%)&nbsp;&nbsp;&nbsp;: </h1>
                        <h1 className="subtitle">€{tax}</h1>
                    </div>
                    <hr />
                    <div className="checkout-total flex">
                        <h1 className="title">Grand Total: </h1>
                        <h1 className="title">€{roundToTwo(subtotal + (tax * 2))}</h1>
                    </div>
                </div>
            </div>
        </>
    );
};
