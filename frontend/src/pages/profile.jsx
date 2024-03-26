// importing from react
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Store } from "../config/utils";
// importing stylesheet
import "../style/profile.css";

export default function Profile() {
    const [orders, setOrders] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const order = await axios.get(`http://localhost:5003/api/orders/${id}`);
                if (order.data.message === "success") {
                    setOrders(order.data.orders);
                }
            } catch (err) {
                console.log(err.message);
            }
        }
        fetchData();
    }, []);

    const { state } = useContext(Store);
    const { userInfo } = state;

    return (
        <>
            <div className="profile">
                <h1 className="title txt-ctr">User Details</h1>
                <div className="flex profile-info">
                    <h1 className="profile-bar">Name : </h1>
                    <h1 className="profile-bar">{userInfo.name}</h1>
                </div>

                <div className="flex profile-info">
                    <h1 className="profile-bar">Email : </h1>
                    <h1 className="profile-bar">{userInfo.email}</h1>
                </div>
                <hr className="profile-hr" />
                <hr className="profile-hr" />
            </div>

            <div className="profile">
                <h1 className="title txt-ctr">Recent Orders</h1>
                {orders ? (
                    orders.map((order) => (
                        <div className="order" key={order._id}>
                            <h1 className="subtitle">Order Id: <span className="order-id">{order._id}</span></h1>
                            <h1 className="subtitle">Delivered to: {order.name}</h1>
                            <h1 className="subtitle">Email: {order.email}</h1>
                            <h1 className="subtitle">Delivery address: {order.address}</h1>
                            <div className="flex gap-5">
                                <h1 className="subtitle">Products: </h1>
                                <h1 className="subtitle order-id">
                                    {order.purchase.map((ord) => (
                                        Object.entries(ord).map(([key, val]) =>
                                            <span key={key}>{key}: {val},&nbsp;</span>
                                        )
                                    )
                                    )}
                                </h1>
                            </div>

                        </div>
                    ))
                ) : (
                    <div>-- No Orders --</div>
                )}
            </div>
        </>
    );
};
