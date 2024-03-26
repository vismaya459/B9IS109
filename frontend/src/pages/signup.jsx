// importing from react
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// importing stylesheet
import "../style/form.css";
import { Store } from "../config/utils";
import { delay } from "../config/utils";

export default function SignUp() {
    const navigate = useNavigate();

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        gender: "",
        password: "",
        cpassword: "",
    });

    function handleChange(event) {
        const { name, value, type, checked } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const [msg, setMsg] = useState("");
    const [color, setColor] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        if (formData.cpassword !== formData.password) {
            setMsg("Passwords don't match!");
            setColor("red");
        }
        else {
            // signup & sign up operation
            try {
                const { data } = await axios.post('http://localhost:5003/api/users/signup', {
                    name: formData.name,
                    email: formData.email,
                    gender: formData.gender,
                    password: formData.password,
                    isAdmin: false
                })
                if (data.message === "Email Already Exists") {
                    setMsg(data.message);
                    setColor("red");
                }
                else {
                    ctxDispatch({
                        type: 'USER_SIGNIN',
                        payload: data
                    });
                    localStorage.setItem("userInfo", JSON.stringify(data.user));
                    setMsg("New Account Created!");
                    setColor("green");
                    await delay(500);
                    setMsg("Redirecting... wait");
                    await delay(500);
                    navigate("/shop");
                    window.location.reload();
                }
            } catch (error) {
                setMsg("Unexpected error occured. Try again!");
                setColor("red");
            }
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
                                "/images/store-name.png"
                            }
                            alt="home main img"
                        />
                        <h1 className="title txt-ctr">Welcome to BeautyBasket!</h1>
                    </div>

                    <div className="form-right flex sign-in">
                        <div className="form">
                            <h1 className="title">Create Account</h1>

                            <form onSubmit={handleSubmit}>
                                <div className="input-box">
                                    <div className="input msg" id={color}>
                                        {msg}
                                    </div>
                                </div>

                                <div className="input-box">
                                    <label
                                        for="name">
                                        Full Name:
                                    </label>

                                    <input
                                        className="input"
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        autocomplete="off"
                                        required
                                    />
                                </div>

                                <div className="input-box">
                                    <label
                                        for="email">
                                        Email Address:
                                    </label>

                                    <input
                                        className="input"
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="johndoe@gmail.com"
                                        autocomplete="off"
                                        required
                                    />
                                </div>

                                <div className="input-box">
                                    <label
                                        for="gender">
                                        Gender:
                                    </label>

                                    <select
                                        className="input"
                                        name="gender"
                                        id="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        required>
                                        <option value="">-- None --</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>

                                <div className="input-box">
                                    <label
                                        for="password">
                                        Password:
                                    </label>

                                    <input
                                        className="input"
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        autocomplete="off"
                                        required
                                    />
                                </div>

                                <div className="input-box">
                                    <label
                                        for="c-password">
                                        Retype Password:
                                    </label>

                                    <input
                                        className="input"
                                        type="password"
                                        name="cpassword"
                                        id="cpassword"
                                        value={formData.cpassword}
                                        onChange={handleChange}
                                        autocomplete="off"
                                        required
                                    />
                                </div>

                                <div className="input-box">
                                    <button
                                        className="form-btn"
                                        type="submit">
                                        Sign Up
                                    </button>
                                </div>
                            </form>

                            <div className="below-form flex">
                                <span className="flex gap-5">Already have an account? <div onClick={() => { navigate("/signin") }}>Sign In</div></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
