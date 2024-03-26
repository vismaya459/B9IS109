import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        qty: { type: String, required: true },
        price: { type: Number, required: true },
        type: { type: String, required: true },
        url: { type: String, required: true },
        stockQty: { type: String, required: true },
    }
);

const Products = mongoose.model('Products', productSchema);
export default Products;