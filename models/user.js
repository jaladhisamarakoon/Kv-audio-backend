import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
    },

    password : {
        type : String,
        required : true,

    },

    role : {
        type : String,
        required : true,
        default : "customer"
    },

    firstName : {
        type : String,
        required : true
    },

    lastName : {
        type : String,
        required : true
    },

    address : {
        type : String,
        required : true
    },

    phone : {
        type : String,
        required : true
    },

    profilePicture : {
        type :String,
        required : true,
        default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fdefault-user&psig=AOvVaw1sKk1CjMcN6lUwfFrLA675&ust=1741762816735000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLjdzaS6gYwDFQAAAAAdAAAAABAI"
    }

   

});

const User = mongoose.model("User",userSchema);

export default User;