import express from "express";
import expressAsyncHandler from "express-async-handler";
import Users from "../model/userModel.js";
import bcrypt from "bcryptjs";

const userRouter = express.Router();

userRouter.post(
    '/signin',
    expressAsyncHandler(async (req, res) => {
        const user = await Users.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send(user);
                return;
            }
        }
        res.status(401).send({ message: "Invalid login details" })
    })
);

userRouter.post(
    '/signup',
    expressAsyncHandler(async (req, res) => {
        const name = req.body.name;
        const email = req.body.email;
        const gender = req.body.gender;
        const password = req.body.password;
        const isAdmin = req.body.isAdmin;
        if (await Users.findOne({ email: req.body.email })) {
            res.send(
                { message: "User already exists" }
            );
        }
        else {
            if (await Users.create({ name, email, gender, password: bcrypt.hashSync(password), isAdmin })) {
                const user = await Users.findOne({ email: req.body.email });
                res.send(
                    {
                        user: {
                            _id: user._id,
                            name: name,
                            email: email,
                            gender: gender,
                            password: bcrypt.hashSync(password)
                        }
                    }
                );
            }
        }
    })
);

userRouter.post("/createUserAdmin",async(req,res)=>{
    try {
        const newUser=new Users(req.body)
        await newUser.save()

        res.status(201).json(newUser)

    } catch (error) {
        console.log(error)
        return res.status(500).json({"message":"error while creating user"})
    }
})

userRouter.get("/",async(req,res)=>{
    try {
        const users=await Users.find({})
        return res.status(200).json(users)
    } catch (error) {
        console.log(error)
        return res.status(500).json({"message":"error occured"})
    }
})

userRouter.delete("/:id",async(req,res)=>{
    try {
        const deleted=await Users.findByIdAndDelete(req.params.id)
        return res.status(200).json(deleted)
    } catch (error) {
        console.log(error)
        return res.status(500).json({"message":"error occured"})
    }
})
userRouter.patch("/:id",async(req,res)=>{
    try {
        const updated=await Users.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.status(200).json(updated)
    } catch (error) {
        console.log(error)
        return res.status(500).json({"message":"error occured"})
    }
})

export default userRouter;