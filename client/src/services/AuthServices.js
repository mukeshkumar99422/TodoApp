import axios from 'axios';
//axios is a cleaner, easier alternative to the built-in fetch() API.
// fetch("/register", {  //sends a post request to the server
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ username: "Mukesh", email: "test@test.com", password: "12345" })
// });
const prefix=import.meta.env.BACKEND_URL;

const registerUser=async (userData)=>{
    return axios.post(`${prefix}/api/v1/user/register`, userData)
    
}
const loginUser=async (userData)=>{
    const rsp=await axios.post(`${prefix}/api/v1/user/login`, userData)
    return rsp
}

const AuthServices={
    registerUser,
    loginUser
}

export default AuthServices;