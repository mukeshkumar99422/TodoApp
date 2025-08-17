const userModel=require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');

//register controller
const registerController= async (req,res)=>{
    try{
        const {username,email,password}=req.body;

        //validation
        if(!username || !email || !password){
            return res.status(400).send({
                success: false,
                message: 'All fields are required'
            });
        }

        //check user already exists
        const existingUser=await userModel.findOne({email:email});
        if(existingUser){
            return res.status(409).send({
                success:false,
                message:'user already Registered',
            });
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        //save user
        const user=await userModel.create({username:username,email:email,password:hashedPassword});

        res.status(201).send({
            success:true,
            message:'User registered successfully',
            user
        });

        
    }
    catch(error){
        console.log(`Error in userController: ${error}`.bgRed.white);
        res.status(500).send({
            success:false,
            message:'Register API',
            error
        });
    }
}

//login controller
const loginController=async (req,res)=>{
    try{
        const {email,password}=req.body;

        //find user
        const user1=await userModel.findOne({email:email});
        const user2=await userModel.findOne({username:email});
        const user=user1 || user2;

        //compare user
        if(!user){
            return res.status(401).send({
                success:false,
                message:'Invalid email or password'
            });
        }

        //compare password
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).send({
                success:false,
                message:'Invalid email or password'
            })
        }

        //token generation
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});

        res.status(200).send({
            success:true,
            message:'User logged in successfully',
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            }
        })

    }
    catch(error){
        console.log(`error in userController:${error}`.bgRed.white);
        res.status(500).send({
            success:false,
            message:'Something went wrong',
            error
        })
    }
}

module.exports={registerController,loginController};