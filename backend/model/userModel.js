import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        gender: { type: String, required: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean,default:false},
    }
);

const Users = mongoose.model('Users', userSchema);
export default Users;