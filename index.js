import bodyParser from "body-parser";
import express from "express";
import mongoose  from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken";





let app = express()

app.use(bodyParser.json())
app.use((req,res,next)=>{
   let token = req.header("Authorization")
   

   if(token != null){
    token = token.replace("Bearer ","");
    

    jwt.verify(token,"Kv-secret-89!",(err,decoded)=>{
        if(!err){
            req.user = decoded;
        }    
    })

   }
 next();
})

let mongoUrl = "mongodb+srv://admin:123@cluster0.wzkmc.mongodb.net/prods?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl)

let connection = mongoose.connection
connection.once("open",()=>{
    console.log("mongodb connection established succesfully")
})


app.use("/api/users",userRouter)
app.use("/api/products",productRouter)

app.delete("/",
    (req,res)=>{
        console.log("this is a delete request")
    }
)

app.listen(3000,()=>{
    console.log("server is running on on port 3000")
})