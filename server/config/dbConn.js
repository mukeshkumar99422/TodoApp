const mongoose = require('mongoose');
const colors = require('colors'); // for colored console output

//dotenv configuration
const dotenv=require('dotenv')
dotenv.config()

const connection=async ()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to mongoDB ${mongoose.connection.host}`.bgBlue.white)
    }
    catch(error){
        console.log(`Error in connection ${error}`.bgRed.white);
        process.exit(1); // Exit the process with failure
    }
}

module.exports=connection;