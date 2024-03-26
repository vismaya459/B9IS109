// importing from react
import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// importing stylesheet
import "../style/shop.css";
// importing components
import Product from "../components/Product";
import LoadingBox from "../components/loadingBox";
import ErrorBox from "../components/errorBox";
// importing contexts
import { getError } from "../config/utils";

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

export default function Shop() {
    const navigate = useNavigate();

    const [searchValue,setSearchValue]=useState("")
    const [productsState,setProductsState]=useState([])

    const [{ loading, error, products }, dispatch] = useReducer((reducer), {
        loading: true,
        error: "",
        products: [],
    });

    useEffect(() => {
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
    useEffect(() => {
        // getCategoryNames();
        setProductsState(
            products.filter((prod) =>
            prod.name.toLowerCase().includes(searchValue.toLowerCase())
        )
    );
    }, [searchValue, products]);

    getCategoryNames();

    console.log(products)

    return (
        <>

            <input value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} style={{width:"20rem",height:'3rem',marginRight:'7rem'}} type="text" className="input" placeholder="Search Products" />
            {categoryNames.map(cat => (
                <div key={cat}>
                    <h1 className="category-title txt-ctr">{cat} Products</h1>
                    <div className="store">
                        {
                            loading
                                ? <LoadingBox />
                                : error
                                    ? <ErrorBox message={error} />

                                    :searchValue!==''?

                                    productsState.map(prod => (
                                        prod.type == cat &&
                                        <div key={prod._id}>
                                            <Product
                                                productId={prod._id}
                                                prodName={prod.name}
                                                prodQty={prod.qty}
                                                prodPrice={prod.price}
                                                prodType={prod.type}
                                                prodURL={prod.url}
                                                prodStockQty={prod.stockQty}
                                                prodQuantity={0}
                                            />
                                        </div>
                                    ))
                                    
                                    :products.map(prod => (
                                        prod.type == cat &&
                                        <div key={prod._id}>
                                            <Product
                                                productId={prod._id}
                                                prodName={prod.name}
                                                prodQty={prod.qty}
                                                prodPrice={prod.price}
                                                prodType={prod.type}
                                                prodURL={prod.url}
                                                prodStockQty={prod.stockQty}
                                                prodQuantity={0}
                                            />
                                        </div>
                                    ))
                        }
                    </div>
                </div>
            ))}

            <div onClick={() => { navigate("/cart") }} className="my-btn">GO TO CART</div>
        </>
    );
};
