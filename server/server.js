const express=require('express');
const morgan=require('morgan');
const colors=require('colors'); // for colored console output
const cors=require('cors'); // for enabling CORS,(frontend can access backend)
const connectDB=require('./config/dbConn'); // database connection


//database connection
connectDB();

//dotenv configuration
const dotenv=require('dotenv');
dotenv.config()

//rest object
const app=express();

//middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

//routes
app.use('/api/v1/todo',require('./routes/todoRoute'));
app.use('/api/v1/user',require('./routes/userRoute'));

//port
const PORT=process.env.PORT ||8080;
//listening
app.listen(PORT,()=>{
    console.log("server is running on port".bgGreen.blue,PORT);
});