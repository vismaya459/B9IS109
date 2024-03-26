// importing from react
import { useState, useEffect, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { delay } from "../config/utils";
import { Store, getError } from "../config/utils";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export default function DelProd() {
    const navigate = useNavigate();

    const { state } = useContext(Store);
    const { userInfo } = state;

    const [formData, setFormData] = useState({
        p_id: 0,
    });

    const [{ loading, error, products }, dispatch] = useReducer((reducer), {
        loading: true,
        error: "",
        products: [],
    });

    useEffect(() => {
        if (!userInfo) {
            navigate("/");
        }

        if (userInfo) {
            if (!userInfo.isAdmin)
                navigate("/");
        }
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('api/products');
                dispatch({
                    type: 'FETCH_SUCCESS',
                    payload: result.data,
                })
            } catch (err) {
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: getError(err),
                })
            }
        }
        fetchData();
    }, []);

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
        try {
            const { data } = await axios.post('api/products/delete-prod', {
                id: formData.p_id,
            })
            console.log(data.message === "success");
            if (data) {
                localStorage.setItem("userInfo", JSON.stringify(data));
                setMsg("Delete Successful!");
                setColor("green");
                await delay(500);
                setMsg("Redirecting... wait");
                await delay(500);
                navigate("/admin-dashboard");
            }
        } catch (error) {
            setMsg("Delete Unsuccessful!");
            setColor("red");
        }
    }

    return (
        <>
            <div className="admin-forms">
                <div className="form">
                    <h1 className="title">Delete Product</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <div className="input msg" id={color}>
                                {msg}
                            </div>
                        </div>

                        <div className="input-box">
                            <label
                                htmlFor="p_id">
                                Select Item to be deleted
                            </label>

                            <select
                                className="input"
                                name="p_id"
                                id="p_id"
                                value={formData.p_id}
                                onChange={handleChange}
                                required>
                                <option value="">-- None --</option>
                                {products.map((prod) => (
                                    <option value={prod._id}>{prod.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="input-box">
                            <button
                                className="form-btn"
                                type="submit">
                                Delete Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
