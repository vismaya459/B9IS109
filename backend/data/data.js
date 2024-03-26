import bcrypt from "bcryptjs";

const products = [{
    name: "Brush",
    qty: "3 Pieces",
    price: 4.99,
    type: "accessories",
    url: "brush",
    stockQty: 20,
}, {
    name: "Box",
    qty: "9 Pieces",
    price: 11.99,
    type: "accessories",
    url: "box",
    stockQty: 9,
}, {
    name: "Hair Dryer",
    qty: "4 Pieces",
    price: 12.99,
    type: "accessories",
    url: "dryer",
    stockQty: 4,
}, {
    name: "Cleanser",
    qty: "9 Pieces",
    price: 2.49,
    type: "skincare",
    url: "cleanser",
    stockQty: 9,
}, {
    name: "Moisturizer",
    qty: "9 Pieces",
    price: 9.49,
    type: "skincare",
    url: "moisturizer",
    stockQty: 9,
}, {
    name: "Sunscreen",
    qty: "4 Pieces",
    price: 6.49,
    type: "skincare",
    url: "sunscreen",
    stockQty: 4,
}, {
    name: "Foundation",
    qty: "20 Pieces",
    price: 12.99,
    type: "makeup",
    url: "foundation",
    stockQty: 20,
}, {
    name: "Mascara",
    qty: "15 Pieces",
    price: 3.99,
    type: "makeup",
    url: "mascara",
    stockQty: 15,
}, {
    name: "Lipstick",
    qty: "12 Pieces",
    price: 7.99,
    type: "makeup",
    url: "lipstick",
    stockQty: 12,
}];

const users = [{
    name: "Admin User",
    email: "admin@dbs.ie",
    gender: "male",
    password: bcrypt.hashSync("admin"),
    isAdmin: true
}, {
    name: "Vismaya S",
    email: "vismaya@mydbs.ie",
    gender: "female",
    password: bcrypt.hashSync("vismaya"),
    isAdmin: false
}];

const orders = [];

export default {
    products,
    users,
    orders
}