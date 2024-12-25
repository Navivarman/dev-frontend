import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest } from '../utils/requestSlice'

const Request = () => {
    const dispatch = useDispatch();
    const requests = useSelector(state => state.request);
    const getRequest = async() =>{
        try{
            const res = await axios.get(BASE_URL+ "/user/requests/received",{withCredentials : true})
            dispatch(addRequest(res?.data))
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getRequest()
    },[])

    if (!requests) return;
    if (requests.length === 0) return <h1> No Requests Found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, photoURL, age, gender, description } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoURL}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{description}</p>
            </div>
            <div>
              <button className="btn btn-primary mx-2">Reject</button>
              <button className="btn btn-secondary mx-2">Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default Request