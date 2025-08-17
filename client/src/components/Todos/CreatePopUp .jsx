import React, { useContext, useState } from "react";
import "./createpopup.css";
import toast from "react-hot-toast";
// import TodoServices from "../../services/TodoServices";
import { getErrorMessage } from '../../Utils/ErrorMessage';

import { TodoContext } from "../../context/TodoContext";

const CreatePopUp = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const {createTodo}=useContext(TodoContext);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if(!title || !description){
        return toast.error("Please provide title and description!");
      }
      
      const data={title,description};

      await createTodo(data);
      toast.success(`'${title}' is set`);

      // Close popup
      onClose();

    } catch (error) {
      toast.error(getErrorMessage(error));
      console.log(error);

      setDescription('');
      setTitle('');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Create Todo</h2>
        <form onSubmit={handleSubmit} className="popup-form">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter todo title"
          />

          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter todo description"
          />

          <div className="popup-buttons">
            <button type="submit" className="create-btn">Create</button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePopUp;
