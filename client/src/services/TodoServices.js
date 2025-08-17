import axios from 'axios'

const prefix='https://todo-app-backend-ud8f.onrender.com';

//get user token from local storage
const storedData = localStorage.getItem('todoUserData');
const user = storedData ? JSON.parse(storedData) : null;

//pre-configuring Axios so that every future request will automatically include Authorization header with JWT token.
if(user) axios.defaults.headers.common["Authorization"]=`bearer ${user.token}`;

//create todo
const createTodo = async (data) => {
  const res = await axios.post(`${prefix}/api/v1/todo/create`, data);
  return res.data;
};

//get todos
const getTodos = async (id) => {
  const res = await axios.get(`${prefix}/api/v1/todo/getAll/${id}`);
  return res.data;
};

//update todo
const updateTodo = async (id, data) => {
  const res = await axios.put(`${prefix}/api/v1/todo/update/${id}`, data);
  return res.data;
};

//delete todo
const deleteTodo = async (id) => {
  const res = await axios.delete(`${prefix}/api/v1/todo/delete/${id}`);
  return res.data;
};

const TodoServices={
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
}
export default TodoServices;