import TodoServices from "../services/TodoServices";
import { useState } from "react";
import { TodoContext } from "./TodoContext";

export const TodoContextProvider=({children})=>{
    const [todos,setTodos]=useState([]);


    const createTodo=async (data)=>{
        try {
            const userData=JSON.parse(localStorage.getItem('todoUserData')).user;
            const createdBy=userData._id;
            const todo=await TodoServices.createTodo({createdBy,...data});

            //update todos
            setTodos([todo.result,...todos]);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const getTodos=async ()=>{
        try {
            const userData=JSON.parse(localStorage.getItem('todoUserData')).user;
            const id=userData._id;
            const todosGet=await TodoServices.getTodos(id);

            //update todos
            setTodos(todosGet.todos);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const updateTodo=async (id,data)=>{
        try {
            let todoUpd=await TodoServices.updateTodo(id,data);
            todoUpd=todoUpd.result;

            //update todos
            setTodos(todos.map(todo=>(
                todo._id==id? {...todo,
                    title: todoUpd.title,
                    description: todoUpd.description, 
                    isCompleted:todoUpd.isCompleted}
                    : todo
            )))
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const deleteTodo=async (id)=>{
        try {
            // eslint-disable-next-line no-unused-vars
            const todoDel=await TodoServices.deleteTodo(id);

            //update todos
            setTodos(todos.filter(todo=>todo._id!==id));
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    return (
        <TodoContext.Provider value={{todos,setTodos,createTodo,getTodos,updateTodo,deleteTodo}}>
            {children}
        </TodoContext.Provider>
    )

}