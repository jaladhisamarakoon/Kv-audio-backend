import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    key : {
        type : String,
        required : true,
        unique : true
        },
    
    name : {
    type : String,
    required : true
    },

    price : {
        type : Number,
        required : true
        },

     category : {
        type : String,
        required : true,
        default :"uncategorized"
        },
        

    dimensions : {
        type : String,
        required : true
    },

    description : {
         type : String,
        required : true
    },
    availability : {
        type : Boolean,
        required : true,
        default : true
    },
    image :{
        type :[String],
        required : true,
        default : ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHICWZcFeQ7UuaU7N30-E4Vt1GaTYIU1DIEA&s"]
    }
    

    

})

const Product = mongoose.model("product",productSchema)

export default Product;
