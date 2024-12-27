import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";


const UserCard = ({user}) => {
    const {_id,firstName,lastName,gender,age,description,photoURL} = user;
    const dispatch = useDispatch();
    const handleSendRequest = async(status,userId) => {
      try{
          const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+userId,{},{withCredentials : true})
          dispatch(removeUserFromFeed(userId))
      }catch(err){
        console.log(err);
      }
    }


  return (
    <div className="card bg-base-300 w-72 shadow-xl p-3">
      <figure>
        <img
          src={photoURL}
          alt="photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{age && gender && `Age: ${age} | Gender: ${gender}`}</p>
        <p>{description}</p>
        <div className="card-actions justify-center m-3">
          <button className="btn btn-primary" onClick={() => handleSendRequest("ignored",_id)}>Ignore</button>
          <button className="btn btn-secondary" onClick={() => handleSendRequest("interested",_id)}>Interest</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
