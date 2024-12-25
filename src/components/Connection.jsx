import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import {addConnection} from "../utils/connectionSlice"

const Connection = () => {
    const dispatch = useDispatch();
    const connection = useSelector(store => store.connection);
    
        const getConnections = async() => {
            try{
            const res = await axios.get(BASE_URL+"/user/connections",{ withCredentials: true })
            dispatch(addConnection(res?.data?.data)) 
        }catch(err){
            console.log(err)
        }
        }
  

    useEffect(() => {
        getConnections()
    },[])

    if (!connection) return <h1 className='flex justify-center my-10 font-bold text-xl'> No Connections Found</h1>;
    if (connection.length === 0) return <h1> No Connections Found</h1>;

  return (
    <div className="text-center my-10">
    <h1 className="text-bold text-white text-3xl">Connections</h1>
    {connection.map((connection) => {
      const { firstName, lastName, photoURL, age, gender, description, _id } =
        connection;
      return (
        <div className=" flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto" key = {_id}>
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
        </div>
      );
    })}
  </div>
  )
}

export default Connection