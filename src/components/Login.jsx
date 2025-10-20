import React, { useState } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addUser } from "../features/user/userSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router";

const Login = () => {
  const dispatch = useDispatch();
  const [emailId, setEmail] = useState("a@gmail.com");
  const [password, setPassword] = useState("abc@1234");
  const [error,setError]=useState("");
  const navigate = useNavigate();


  const handleSubmit = async () => {
    try {
      const res = await api.post(
        "/auth/login",
        { emailId, password },
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(addUser(res.data.data));
        navigate("/");
        toast.success(res.data.message || "Login successful!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
      setError(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="flex justify-center items-center h-[60vh] transition-colors duration-300">
      <div className="card bg-base-100 text-base-content w-96 rounded-2xl shadow-lg transition-colors duration-300">
        <div className="card-body">
          <h2 className="card-title justify-center font-bold">Login</h2>

          <div className="flex flex-col gap-2 mb-4 w-full">
            <label htmlFor="email" className="font-bold">
              Email Id:
            </label>
            <input
              type="email"
              placeholder="Enter your email id"
              className="input input-bordered w-full rounded-lg"
              value={emailId}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password" className="font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
       { error && <p className="alert alert-error alert-outline">{error}</p>}
          <button className="btn btn-primary w-full" onClick={handleSubmit}>
            Log in
          </button>
          <div className="flex justify-between">
          <Link to='/reset-password' className="link link-info"> Forgot password? </Link>
            <div className="flex flex-col">
            <span>Already a user?</span><Link to='/signup' className="link link-info"> Create a account </Link> 
            </div> 
          </div>
            
        </div>
      </div>
    </div>
  );
};

export default Login;
