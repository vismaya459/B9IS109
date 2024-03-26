// importing from react
import { useState, useContext } from "react";
// importing icons
import { BiPlus, BiMinus } from "react-icons/bi";
// importing cart
import { Store } from "../config/utils";
import axios from "axios";

export default function Product(props) {
    const { state, dispatch: ctxDispatch } = useContext(Store);

    const { cart } = state;

    const [product, setProduct] = useState(props);

    const [qty, setQty] = useState(props.prodQuantity);

    function addToCartHandler() {
        const existItem = cart.cartItems.find((x) => x.productId === product.productId);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        setQty(prevQty => ++prevQty);
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product, quantity }
        });
    }

    function removeFromCart() {
        if (qty !== 0) {
            const existItem = cart.cartItems.find((x) => x.productId === product.productId);
            if (existItem) {
                if (existItem.quantity <= 1) {
                    ctxDispatch({
                        type: 'CART_REMOVE_ITEM',
                        payload: product
                    })
                }
                else {
                    const quantity = existItem.quantity - 1;
                    ctxDispatch({
                        type: 'CART_ADD_ITEM',
                        payload: { ...product, quantity }
                    });
                }
            }
            setQty(prevQty => --prevQty);
        }
    }


    return (
        <>
            <div className="store-item" key={props.productId}>
                <div className="flex">
                    <div className="store-item-img">
                        <img
                            src={
                                process.env.PUBLIC_URL +
                                `/images/store/${props.prodURL}.png`
                            }
                            alt="store-item"
                        />
                    </div>

                    <div className="store-item-text">
                        <p className="store-item-title">
                            {props.prodName} ({props.prodQty})
                        </p>
                        <p className="store-item-price">
                            €{props.prodPrice}
                        </p>
                        {props.prodStockQty <= 5 && props.prodStockQty > 0 && <div class="out-of-stock yellow">Selling Fast</div>}
                        {props.prodStockQty <= 0 && <div class="out-of-stock" id="red">Out of Stock</div>}
                    </div>
                </div>

                <div className="quantity">
                    {props.page != "checkout" && (
                        <button className="minus" onClick={removeFromCart} disabled={qty === 0}>
                            <BiMinus size={20} />
                        </button>
                    )}
                    <div className="qty">{qty}</div>
                    {props.page != "checkout" && (
                        <button className="plus" onClick={addToCartHandler} disabled={qty === props.prodStockQty}>
                            <BiPlus size={20} />
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};
