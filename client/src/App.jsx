import './App.css'
import {Routes,Route} from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
import About from './components/About/About'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'

import {Toaster} from 'react-hot-toast';
import Profile from './components/Profile/Profile'
import ProtectedRoute from './components/Protection/ProtectedRoute'
import TodoList from './components/Todos/TodoList'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        } />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/todos' element={<TodoList/>}></Route>
      </Routes>
      <Toaster/> 
    </>
  )
}

export default App
