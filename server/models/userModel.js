// Database->	Database
// Table->	Collection
// Row/Record->	Document
// Column->	Field
// Schema->	Schema


mongoose=require('mongoose');

const userSchema=new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
        },
        password:{
            type: String,
            required: true,
        }
    },
    {timestamps: true}
);


//model: wrapper for a collection, provides helper methods(add,delete,update,find)
const userModel=mongoose.model("users",userSchema);  //users: collection name
module.exports=userModel;