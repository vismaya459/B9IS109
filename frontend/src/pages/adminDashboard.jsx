// importing from react
import { useEffect, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// importing stylesheets
import "../style/shop.css";
// importing icons
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
// importing components
import LoadingBox from "../components/loadingBox";
import ErrorBox from "../components/errorBox";
// importing contexts
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

export default function AdminDashboard() {
    const navigate = useNavigate();

    const { state } = useContext(Store);
    const { userInfo } = state;

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
        products.map((prod) => {
            prod = { ...prod, quantity: 0 }
        })
    }, []);

    const categoryNames = [];
    let flag = false;
    function getCategoryNames() {
        flag = false;
        products.map((prod) => {
            const itemExists = categoryNames.find((cat) => cat === prod.type);
            if (!itemExists) {
                categoryNames.push(prod.type);
            }
        })
    }

    getCategoryNames();

    return (
        <>
            <div className="admin-page">
                <div style={{display:"flex",flexDirection:"column"}}>

                <h1 className="title txt-ctr">Admin Dashboard</h1>
                <div style={{display:"flex",columnGap:"1rem",justifyContent:'center',alignItems:"center"}}>
                    <button  className="item add item-btn gap-5" onClick={() => { navigate(`/edit-prod/add`) }} style={{alignSelf:"center",marginTop:'1rem'}}>Add Product</button>
                </div>
                </div>


                <div className="store">
                    {categoryNames.map(cat => (
                        <div className="store-item category" key={cat}>
                            <h1 className="store-item-title txt-ctr">{cat} PRODUCTS</h1>
                            <div className="edit-category flex gap-5">
                                <div className="item add item-btn gap-5 w-100" id="edit" onClick={() => { navigate("/edit-cat/") }}>
                                    <BiEditAlt size={25} />
                                    Edit
                                </div>
                                <div className="item add item-btn gap-5 w-100" id="delete" onClick={() => { navigate("/del-cat") }}>
                                    <AiOutlineDelete size={25} />
                                    Delete
                                </div>
                            </div>
                            {products.map(prod => (
                                prod.type == cat &&
                                (
                                    <div className="item" key={prod._id}>
                                        <div className="item-name">
                                            {prod.name}
                                        </div>
                                        <div className="item-amt">
                                            €{prod.price}
                                        </div>
                                        <div className="flex">
                                            <div className="item-btn item-btn-2" id="edit" onClick={() => { navigate(`/edit-prod/${prod._id}`) }}>
                                                <BiEditAlt size={25} />
                                            </div>
                                            <div className="item-btn item-btn-2" id="delete" onClick={() => { navigate("/del-prod") }}>
                                                <AiOutlineDelete size={25} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
