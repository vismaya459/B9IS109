// importing from react
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// importing stylesheet
import "../style/shop.css";
// importing components
import Product from "../components/Product";
// importing contexts
import { Store } from "../config/utils";

export default function Cart() {
    const navigate = useNavigate();

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems },
        userInfo
    } = state;

    useEffect(() => {
        if (!userInfo) {
            navigate('/');
        }
    }, []);

    console.log(cartItems);

    return (
        <>
            <h1 className="category-title txt-ctr">Cart</h1>
            {cartItems.length ? (
                <>
                    <div className="store">
                        {cartItems.map((prod) => (
                            <div key={prod._id}>
                                <Product
                                    productId={prod.productId}
                                    prodName={prod.prodName}
                                    prodQty={prod.prodQty}
                                    prodPrice={prod.prodPrice}
                                    prodType={prod.prodType}
                                    prodURL={prod.prodURL}
                                    prodQuantity={prod.quantity}
                                    page={"cart"}
                                />
                            </div>
                        ))}
                    </div>

                    <div onClick={() => { navigate("/checkout") }} className="my-btn">PLACE ORDER</div>
                </>
            ) : (
                <div className="sub-title txt-ctr">No items in the cart. Go shopping!</div>
            )}
        </>
    );
};
