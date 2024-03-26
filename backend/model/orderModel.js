import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user_id: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
        purchase: { type: JSON, required: true },
    }
);

const Orders = mongoose.model('Orders', orderSchema);
export default Orders;