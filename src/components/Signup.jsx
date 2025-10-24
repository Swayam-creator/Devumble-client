import React, { useState } from 'react';
import api from '../lib/api';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { useRef } from 'react';
import { Eye,EyeClosed } from 'lucide-react';
const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState("");
  const [showPassword,setShowPassword]=useState(false);

 const navigate=useNavigate();
  const handleSubmit = async () => {
    try {
      const res = await api.post(
        "/auth/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      console.log(res.data);
      toast.success("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data?.message);
      setError(error.response?.data?.message || "Signup failed!");
      toast.error(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className='flex justify-center items-center h-[50vh] mt-20'>
      <div className="card bg-primary text-primary-content w-96 rounded-2xl shadow-amber-300">
        <div className="card-body">
          <h2 className="card-title justify-center font-bold">Signup</h2>

          <div className="flex gap-2 flex-col mb-2 w-full">
            <label className='font-bold'>First Name:</label>
            <input
              type="text"
              placeholder='Enter your first name'
              className='input'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className='font-bold'>Last Name:</label>
            <input
              type="text"
              placeholder='Enter your last name'
              className='input'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <label className='font-bold'>Email Id:</label>
            <input
              type="email"
              placeholder='Enter your email id'
              className='input'
              value={emailId}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <label className="font-bold">Password:</label>
<div className="relative w-[96%]">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Enter your password"
    className="input w-full pr-2"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  {showPassword ? (
    <Eye
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-amber-400"
      size={20}
    />
  ) : (
    <EyeClosed
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-amber-400"
      size={20}
    />
  )}
</div>

            
          </div>

          <button className='btn w-[95%]' onClick={handleSubmit}>
            Signup
          </button>
          <p>Already have an account? <Link to="/login" className='link link-error'>Login</Link></p>
          <p>{error}</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
