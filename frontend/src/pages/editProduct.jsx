// importing from react
import { useState, useEffect, useReducer, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { delay } from "../config/utils";
import { Store, getError } from "../config/utils";
import { useForm } from "react-hook-form"

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

export default function EditProd() {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
      } = useForm()
    const navigate = useNavigate();
    const {id,add}=useParams()
    console.log('id',id)
    console.log('add',add)
    console.log(id)
    const { state } = useContext(Store);
    console.log(state)
    const { userInfo } = state;

    const [formData, setFormData] = useState({
        p_id: 0,
        new_name: "",
        cat: "",
        p_qty: "",
        p_price: null,
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
                const result = await axios.get('/api/products');
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
    const [categoryNames,setCategoryNames]=useState([])

    const getCategoryNames = () => {
        const uniqueCategories = new Set(categoryNames);
    
        products.forEach((prod) => {
            uniqueCategories.add(prod.type);
        });
    
        setCategoryNames(Array.from(uniqueCategories));
    };
    
    

    useEffect(()=>{
        if(products){

            getCategoryNames()
        }
    },[products])

    const printCat=()=>{
        console.log(categoryNames)
    }

    async function handleEditSubmit(event) {
        event.preventDefault();
        try {
            const { data } = await axios.post('/api/products/edit-prod', {
                id: formData.p_id,
                name: formData.new_name,
                qty: formData.p_qty,
                price: formData.p_price,
                type: formData.cat
            })
            console.log(data.message === "success");
            if (data) {
                localStorage.setItem("userInfo", JSON.stringify(data));
                setMsg("Edit Successful!");
                setColor("green");
                await delay(500);
                setMsg("Redirecting... wait");
                await delay(500);
                navigate("/admin-dashboard");
            }
        } catch (error) {
            setMsg("Edit Unsuccessful!");
            setColor("red");
        }
    }

    return (
        <>
            {
                id==='add'?(
                    <div className="admin-forms">
                    <div className="form">
                        <h1 className="title">Add Product</h1>

                        <form noValidate onSubmit={handleSubmit((data)=>{
                            console.log('ranm')

                            const addProduct=async()=>{
                                try {
                                    const res=await axios.post("/api/products",data)
                                    reset()
                                    navigate("/admin-dashboard")
                                } catch (error) {
                                    console.log(error)
                                }
                            }
                            console.log(data)
                            addProduct()
                        })}>
                            <div className="input-box">
                                <div className="input msg" id={color}>
                                    {msg}
                                </div>
                            </div>

                            {/* name */}
                            <div className="input-box">
                                <label
                                    htmlFor="p_id">
                                    Product Name
                                </label>
                                
                                <input {...register("name",{required:"name is required"})} className="input" type="text" placeholder="Eg. Beauty Sets" />
                            </div>

                            {/* quantity */}
                            <div className="input-box">
                                <label
                                    for="new_name">
                                    Quantity
                                </label>
    
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Eg: 2"
                                    autocomplete="off"
                                    required
                                    {...register("qty",{required:"qty is required"})}
                                />
                            </div>

                            {/* price */}
                            <div className="input-box">
                                <label
                                    htmlFor="cat">
                                    Price
                                </label>
    
                                <input {...register("price",{required:"price is required"})}t type="text" className="input" placeholder="Eg: 10.99"/>
                            </div>
                            
                            {/* type */}
                            <div className="input-box">
                                <label
                                    for="p_qty">
                                    Type
                                </label>
                                <select {...register("type",{required:"type is required"})} className="input">
                                        <option selected value="">--none--</option>
                                        <option value="skincare">Skincare</option>
                                        <option value="makeup">Accessories</option>
                                        <option value="accessories">Makeup</option>
                                </select>
                            </div>

                            {/* url */}
                            <div className="input-box">
                                <label
                                    for="p_price">
                                   Url
                                </label>
    
                                <input
                                    className="input"
                                    type="text"
                                    {...register("url",{required:"url is required"})}
                                    id="p_price"
                                    value={formData.p_price}
                                    onChange={handleChange}
                                    autocomplete="off"
                                    required
                                />
                            </div>

                            {/* qty */}
                            <div className="input-box">
                                <label
                                    for="p_price">
                                   Stock Qty
                                </label>
                                <input
                                    className="input"
                                    type="text"
                                    {...register("stockQty",{required:"stock quantity is required"})}
                                    id="p_price"
                                    autocomplete="off"
                                    required
                                    placeholder="Eg: 1"
                                />
                            </div>
    
                            <div className="input-box">
                                <button
                                    className="form-btn"
                                    type="submit">
                                    Add Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>  
                ):(
                    
            <div className="admin-forms">
                <div className="form">
                    <h1 className="title">Edit Product Details</h1>
                    <form onSubmit={handleEditSubmit}>
                        <div className="input-box">
                            <div className="input msg" id={color}>
                                {msg}
                            </div>
                        </div>

                        <div className="input-box">
                            <label
                                htmlFor="p_id">
                                Product Name to be edited:
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
                            <label
                                for="new_name">
                                New Name for the product selected above:
                            </label>

                            <input
                                className="input"
                                type="text"
                                name="new_name"
                                id="new_name"
                                value={formData.new_name}
                                onChange={handleChange}
                                placeholder="Eg: Beauty Sets"
                                autocomplete="off"
                                required
                            />
                        </div>

                        <div className="input-box">
                            <label
                                htmlFor="cat">
                                Update Product's Category:
                            </label>

                            <select
                                className="input"
                                name="cat"
                                id="cat"
                                value={formData.cat}
                                onChange={handleChange}
                                required>
                                <option value="">-- None --</option>
                                {categoryNames.map((cat) => (
                                    <option value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="input-box">
                            <label
                                for="p_qty">
                                Update Size:
                            </label>

                            <input
                                className="input"
                                type="text"
                                name="p_qty"
                                id="p_qty"
                                value={formData.p_qty}
                                onChange={handleChange}
                                placeholder="Eg: 2"
                                autocomplete="off"
                                required
                            />
                        </div>

                        <div className="input-box">
                            <label
                                for="p_price">
                                Update Price: (In €)
                            </label>

                            <input
                                className="input"
                                type="text"
                                name="p_price"
                                id="p_price"
                                value={formData.p_price}
                                onChange={handleChange}
                                placeholder="Eg: 10.99"
                                autocomplete="off"
                                required
                            />
                        </div>

                        <div className="input-box">
                            <button
                                className="form-btn"
                                type="submit">
                                Edit Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>                )
            }
        </>
    );
};
