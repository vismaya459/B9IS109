// importing from react
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// importing stylesheet
import "../style/form.css";
// importing context
import { Store } from "../config/utils";
import { delay } from "../config/utils";

export default function SignIn() {
    const navigate = useNavigate();

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, []);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    function handleChange(event) {
        const { name, value, type, checked } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    const [msg, setMsg] = useState("");
    const [color, setColor] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const { data } = await axios.post('http://localhost:5003/api/users/signin', {
                email: formData.email,
                password: formData.password
            });

            console.log(data);
            if (data) {
                ctxDispatch({
                    type: 'USER_SIGNIN',
                    payload: data
                });
                localStorage.setItem("userInfo", JSON.stringify(data));
                setMsg("Login Successful!");
                setColor("green");
                await delay(500);
                setMsg("Redirecting... wait");
                await delay(500);
                navigate("/shop");
                window.location.reload();
            }
        } catch (error) {
            setMsg("Login Unsuccessful!");
            setColor("red");
        }
    }

    return (
        <>
            <div className="home">
                <div className="form-page flex">
                    <div className="form-left flex">
                        <img
                            className="home-main"
                            src={
                                process.env.PUBLIC_URL +
                                "/images/store-banner.png"
                            }
                            alt="home main img"
                        />
                        <h1 className="title txt-ctr">Welcome to Beauty Basket</h1>
                    </div>

                    <div className="form-right flex">
                        <div className="form">
                            <h1 className="title">Welcome!</h1>
                            <h1 className="subtitle">Discover Your Beauty Essentials at Beauty Basket</h1>

                            <form onSubmit={handleSubmit}>
                                <div className="input-box">
                                    <div className="input msg" id={color}>
                                        {msg}
                                    </div>
                                </div>

                                <div className="input-box">
                                    <label
                                        htmlFor="email">
                                        Email Address:
                                    </label>

                                    <input
                                        className="input"
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="abc@gmail.com"
                                        autoComplete="off"
                                        required
                                    />
                                </div>

                                <div className="input-box">
                                    <label
                                        htmlFor="password">
                                        Password:
                                    </label>

                                    <input
                                        className="input"
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Pass****"
                                        autoComplete="off"
                                        required
                                    />
                                </div>

                                <div className="input-box">
                                    <button
                                        className="form-btn"
                                        type="submit">
                                        Sign In
                                    </button>
                                </div>
                            </form>

                            <div className="below-form flex">
                                <span className="flex gap-5">Don't have an account? <div onClick={() => { navigate("/signup") }}>Sign Up</div></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};