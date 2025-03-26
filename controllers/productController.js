import Product from "../models/product.js";
import { isitAdmin } from "./userController.js";

export async function addProduct(req,res){
    

    if(req.user == null){
        res.status(401).json({
            message:"please login and try again"
        })
        return
    }
    if(req.user.role !="admin"){
        res.status(403).json({
            message:"user nor authorized to perform this action"
        })
        return
    }

    const data = req.body;
    const newProduct = new Product(data);
    try {
        await newProduct.save();
        res.json({
            message : "product added successfully"
        })
        
    } catch (e) {
        res.status(500).json({
            error: "product addition failed",
            details: e.message, 
        })
        
    }
   

}

export async function getProducts(req,res) {

   
    
   
    
    try {
        if(isitAdmin(req)){
            const Products = await Product.find();
            res.json(Products);
            return;
        }else{
            const Products = await Product.find({availability:true});
            res.json(Products)
            return;
        }
        
    } catch (e) {
        res.status(500).json({
            message :"failed to get products",
            details: e.message,
        })
        
    }

}
    


export async function updateProduct(req,res){
    try {
        if(isitAdmin(req)){

            const key = req.params.key;
            const data = req.body;

            await Product.updateOne({key:key},data)

            res.json({
                message :"product updated successfully"
            })
        }else{
            res.status(500).json({
                message : "you are not authorized to perform this action"
            })
        }
        
    } catch (e) {
        res.status(500).json({
            message : "failed to update product"
        })
        
    }
}

export async function deleteProduct(req,res) {
    try {
        if(isitAdmin(req)){
            const key = req.params.key;
            await Product.deleteOne({key:key})
            res.json({
                message: "product deleted successfully"
            })

        }else{
            res.status(500).json({
                message:"you are not authorized to perform this action"
            })
        }
        
    } catch (e) {
        res.status(500).json({
            message:"failed to delete product"
        })
        
    }
    
}