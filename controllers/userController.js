import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function registerUser(req,res){

    const data = req.body;

    data.password = bcrypt.hashSync(data.password,10)

    const newUser = new User(data)

    newUser.save().then(()=>{
        res.json({message : "user registered succesfully"})
    }).catch((error)=>{
        res.status(500).json(error , "user registration failed")
    })
}

export function loginUser(req,res){

    const data = req.body;

    User.findOne({
        email : data.email
    }).then(
        (user)=>{
           
                
                
                if(user == null){
                    res.status(404).json({error:"user not found"});

                }else {
                   

                    if (bcrypt.compareSync(data.password,user.password)){
                        const token = jwt.sign({
                            firstName :user.firstName,
                            lastname: user.lastName,
                            email:user.email,
                            role:user.role,
                            profilePicture : user.profilePicture

                        },process.env.JWT_SECRET)
                        res.json({message:"login successful", token:token})

                    }else{
                        res.status(401).json({error:"login failed"})
                    }
                }
            
        }
    )
}