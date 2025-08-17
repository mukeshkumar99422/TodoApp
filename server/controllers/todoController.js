const todoModel = require("../models/todoModel");


//Create todo
const createTodoController= async (req,res)=>{
    try {
        const {title,description,createdBy}=req.body;
        if(!title||!description){
            return res.status(400).send({
                success: false,
                message: 'Please provide title and description'
            })
        }
        const todo=new todoModel({title,description,createdBy});
        const result=await todo.save();
        res.status(201).send({
            success: true,
            message: "Your todo has been created",
            result
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:"Error in create todo api",
            error
        }
        )
    }
}


//Get todos
const getTodoController=async (req,res)=>{
    try {
        const {userId}=req.params;
        if(!userId){
            return res.status(400).send({
                success: false,
                message: "No user id found",
            })
        }

        //find todos
        const todos=await todoModel.find({createdBy: userId});
        if(!todos){
            return res.status(401).send({
                success: false,
                message: "Error in get todo api"
            })
        }
        res.status(200).send({
            success: true,
            message: "Your Todos",
            todos
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get todo apii",
            error
        })
    }
}


//Delete todo
const deleteTodoController = async (req,res)=>{
    try {
        //find id
        const {id}=req.params;
        if(!id){
            return res.status(400).send({
                success: false,
                message: "Please provide id",
            })
        }

        const result=await todoModel.findByIdAndDelete({_id:id});
        if(!result){
            return res.status(404).send({
                success: false,
                message: "No task found"
            })
        }
        res.status(201).send({
            success: false,
            message: "Todo deleted",
            result,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in delete todo api"
        })
    }
}

const updateTodoController=async (req,res)=>{
    try {
        const {id}=req.params;
        if(!id){
            return res.status(400).send({
                success: false,
                message: "Please provide todo id",
            })
        }
        const data=req.body;

        //update
        const result=await todoModel.findByIdAndUpdate(id,{$set:data},{new:true})
        if(!result){
            return res.status(401).send({
                success: false,
                message: 'Todo not found',
            })
        }

        res.status(201).send({
            success: true,
            message: "Todo updated",
            result
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in update todo api"
        });
    }
}

module.exports={createTodoController,getTodoController,deleteTodoController,updateTodoController};