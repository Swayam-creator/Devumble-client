import React, { useState } from 'react';
import api from '../lib/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { use } from 'react';

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      toast.error(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className='flex justify-center items-center h-[50vh]'>
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

            <label className='font-bold'>Password:</label>
            <input
              type="password"
              placeholder='Enter your password'
              className='input'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className='btn w-[95%]' onClick={handleSubmit}>
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
