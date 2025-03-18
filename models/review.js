import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },

    name : {
        type : String,
        required : true
    },

    rating : {
        type : Number,
        required : true
    },

    comment : {
        type : String,
        required : true
    },

    date : {
        type : Date,
        required : true,
        default :Date.now()
    },
    isApproved : {
        type : Boolean,
        required : true,
        default :false
    },

    profilePicture : {
        type :String,
        required : true,
        default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fdefault-user&psig=AOvVaw1sKk1CjMcN6lUwfFrLA675&ust=1741762816735000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLjdzaS6gYwDFQAAAAAdAAAAABAI"
    }
})

const Review = mongoose.model("Review",reviewSchema)

export default Review;