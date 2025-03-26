import Inquiry from "../models/inquiry.js";
import inquiryRouter from "../routes/inquiryRouter.js";
import { isitAdmin, isitCustomer } from "./userController.js"

export async function addInquiry(req,res) {
    try {
        if(isitCustomer(req)){
            const data =req.body;
            data.email = req.user.email;
            data.phone = req.user.phone;

            let id = 0;

            const inquiries = await Inquiry.find().sort({id:-1}).limit(1);

            if(inquiries.length==0){
                id = 1;
            }else{
                id = inquiries[0].id + 1;
            }

            data.id = id;

            const newInquiry = new Inquiry(data);
            const response = await newInquiry.save();
        }
        
    } catch (e) {
        res.status(500).json({
            message :"failed to add inquiry",
            error:e.message
        })
        
    }
}

export async function getInquiries(req,res) {
    try {

        if(isitCustomer(req)){
            const inquiries = await Inquiry.find({email:req.user.email});
            res.json(inquiries);
            return;
        }else if(isitAdmin(req)){
            const inquiries = await Inquiry.find();
            res.json(inquiries);
            return;
        }else{
            res.status(500).json({
                message : "you are not authorized to perform this action"
            })
        }
        
    } catch (e) {
        res.status(500).json({
            message : "failed to get inquiries"
        })
        
    }
    
}

export async function deleteInquiry(req, res) {
    try {
        const id = req.params.id;

        if (isitAdmin(req)) {
            await Inquiry.deleteOne({ id: id });
            return res.json({ message: "Inquiry deleted successfully" }); // ✅ Ensures no further execution
        }

        if (isitCustomer(req)) {
            const inquiry = await Inquiry.findOne({ id: id });

            if (!inquiry) {
                return res.status(404).json({ message: "Inquiry not found" }); // ✅ `return` prevents further execution
            }

            if (inquiry.email === req.user.email) {
                await Inquiry.deleteOne({ id: id });
                return res.json({ message: "Inquiry deleted successfully" });
            } else {
                return res.status(403).json({ message: "Unauthorized to delete this inquiry" });
            }
        }

        // ✅ If neither admin nor customer, return 403
        return res.status(403).json({ message: "You are not authorized to perform this action" });

    } catch (e) {
        console.error(e);
        if (!res.headersSent) { // ✅ Prevent sending multiple responses
            return res.status(500).json({ message: "Inquiry deletion failed" });
        }
    }
}


export async function updateInquiry(req,res) {
    const data = req.body;
    try {
       
            
                const id = req.params.id;
        
                if (isitAdmin(req)) {
                    await Inquiry.updateOne({ id: id },data);
                    return res.json({ message: "Inquiry updated successfully" }); // ✅ Ensures no further execution
                }
        
                if (isitCustomer(req)) {
                    const inquiry = await Inquiry.findOne({ id: id });
        
                    if (!inquiry) {
                        return res.status(404).json({ message: "Inquiry not found" }); // ✅ `return` prevents further execution
                    }
        
                    if (inquiry.email === req.user.email) {


                        await Inquiry.updateOne({ id: id },{message:data.message});
                        return res.json({ message: "Inquiry updated successfully" });
                    } else {
                        return res.status(403).json({ message: "Unauthorized to update this inquiry" });
                    }
                }
        
                // ✅ If neither admin nor customer, return 403
                return res.status(403).json({ message: "You are not authorized to perform this action" });
        
            
        
        
        
    } catch (e) {
        res.status(500).json({
            message : "inquiry update failed",
            error:e.message
        })
        
    }
    
}