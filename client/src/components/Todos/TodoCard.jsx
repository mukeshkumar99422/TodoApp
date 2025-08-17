import React, { useContext, useState } from "react";
import "./todoCard.css";
import { TodoContext } from "../../context/TodoContext";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../Utils/ErrorMessage";

const TodoCard = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);

  const {updateTodo,deleteTodo}=useContext(TodoContext);

  const handleEdit = async () => {
    try {
      await updateTodo(todo._id,{title: editTitle,description:editDescription});
      setIsEditing(false);
      toast.success("Todo updated");
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.log(error);
    }
  };
  const handleDone=async ()=>{
    try {
      await updateTodo(todo._id,{isCompleted: (!todo.isCompleted)});
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.log(error);
    }
  };

  const handleDelete=async ()=>{
    try {
      await deleteTodo(todo._id);
      toast.success("Todo deleted");
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.log(error);
    }
  };


  return (
    <div className={`todo-card ${todo.isCompleted ? "done" : ""}`}>
      <div className="todo-header">
        <h3>
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Title"
            />
          ) : (
            todo.title
          )}
        </h3>
      </div>

      <div className="todo-body">
        {isEditing ? (
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Description"
          />
        ) : (
          <p>{todo.description}</p>
        )}
      </div>

      <div className="todo-icons">
        {isEditing ? (
          <>
            <i className="fa fa-check icon save" onClick={handleEdit} title="Save"></i>
            <i className="fa fa-undo icon cancel" onClick={() => setIsEditing(false)} title="Cancel"></i>
          </>
        ) : (
          <>
            <i className="fa fa-edit icon edit" onClick={() => setIsEditing(true)} title="Edit"></i>
            {todo.isCompleted ? (
              <i className="fa fa-undo icon undo" onClick={handleDone} title="Mark as Not Done"></i>
            ) : (
              <i className="fa fa-check icon done" onClick={handleDone} title="Mark as Done"></i>
            )}
            <i className="fa fa-trash icon remove" onClick={handleDelete} title="Remove"></i>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
