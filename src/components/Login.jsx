import React from 'react'
import { useState } from 'react'
import api from '../lib/api'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router';
const Login = () => {
   const dispatch=useDispatch()
  const [emailId,setEmail]=useState("a@gmail.com");
  const [password,setPassword]=useState("abc@1234");
  const navigate=useNavigate();
  const handleSubmit=async()=>{
    console.log(emailId);
    try {
        const res=await api.post("/auth/login",{
      emailId,
      password,
    },{withCredentials:true});
    if (res.data.success) {
      dispatch(addUser(res.data.data)); 
       navigate("/"); 
      console.log(res.data.data);
      toast.success(res.data.message||"Login successful!");
    } 
    } catch (error) {
     console.log(error.response?.data?.message || error.message);
    toast.error(error.response?.data?.message || "Login failed!");
    }
  
  }
  return (
    <div className='flex justify-center items-center h-[50vh]'>
      <div className="card bg-primary text-primary-content w-96 rounded-2xl shadow-amber-300 ">
  <div className="card-body">
    <h2 className="card-title justify-center font-bold">Login</h2>
    <div className="flex gap-2 flex-col mb-2 w-[100%] justify-center">
    <label htmlFor="email" className='form-control w-full max-w-xs rounded-2xl font-bold'>Email Id:</label>
    <input type="email" placeholder='Enter your email id' className='input' 
      value={emailId}
      onChange={(e)=>{
        setEmail(e.target.value)
      } }
    />
    <label htmlFor="password" className='form-control w-full max-w-xs font-bold'>Password</label>
    <input type="password" placeholder='Enter your password' className='input'
     value={password}
     onChange={(e)=>{
      setPassword(e.target.value)
     }
     }
     />

    </div>
    <button className='btn w-[95%]' onClick={handleSubmit}>Log in</button>
  </div>
</div>
    </div>
  )
}

export default Login
