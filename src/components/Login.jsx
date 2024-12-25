import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const[email,setEmail] = useState("kannan123@gmail.com");
  const[password,setPassword] = useState("Kannan@123");
  const [error,setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async() =>{

    try{
      const res = await axios.post( BASE_URL+"/login",{email,password},{ withCredentials: true })
      console.log(res.data);
      dispatch(addUser(res.data))
      return navigate("/")
    }catch(err){
      console.error(err);
      setError(err?.response?.data || "Something went wrong")
    }

  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title flex justify-center">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs my-3">
              <div className="label">
                <span className="label-text">Email ID:</span>
              </div>
              <input
                type="text"
                value={email}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-3">
              <div className="label">
                <span className="label-text">Password:</span>
              </div>
              <input
                type="text"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <p className="text-red-600">{error}</p>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={() => handleLogin()}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
