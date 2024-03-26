import express from "express";
import data from "../data/data.js";
import Products from "../model/productModel.js";
import Users from "../model/userModel.js";
import Orders from "../model/orderModel.js";

const seedRouter = express.Router();

seedRouter.get('/products', async (req, res) => {
    await Products.deleteMany({});
    const createProducts = await Products.insertMany(data.products);
    res.send({ createProducts });
});

seedRouter.get('/users', async (req, res) => {
    await Users.deleteMany({});
    const createUsers = await Users.insertMany(data.users);
    res.send({ createUsers });
});

seedRouter.get('/orders', async (req, res) => {
    await Orders.deleteMany({});
    const createOrders = await Orders.insertMany(data.orders);
    res.send({ createOrders });
});

export default seedRouter;