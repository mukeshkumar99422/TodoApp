import React, { useContext} from "react";
import TodoCard from "./TodoCard";
import "./todoList.css";

import { TodoContext } from "../../context/TodoContext";

export default function TodoList() {

  const {todos}=useContext(TodoContext);
  console.log(todos)

  return (
    <div className="todo-container">
      {Array.isArray(todos) && todos.length !== 0 ? todos.map(todo => (
        <TodoCard
          key={todo._id} todo={todo}
        />
      )) : null}
    </div>
  );
}
