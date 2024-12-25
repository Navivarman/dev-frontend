import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import {addUser} from '../utils/userSlice'
import UserCard from './UserCard'

const EditProfile = ({user}) => {

    const [firstName,setFirstName] =useState(user.firstName)
    const [lastName,setLastName] =useState(user.lastName) 
    const [age,setAge] =useState(user.age)
    const [gender,setGender] =useState(user.gender)
    const [photoURL,setPhotoURL] =useState(user.photoURL)
    const [description,setDescription] =useState(user.description)
    const [error,setError] =useState(null);
    const [showToast,setShowToast] = useState(false)

    const dispatch = useDispatch()

    const saveProfile = async() =>{
      setError(" ")
        try{
            const res = await axios.patch(BASE_URL + "/profile/edit"  ,{
                firstName,
               /*  lastName, */
                photoURL,
                age,
                gender,
                description,
              },{withCredentials: true})
            dispatch(addUser(res.data?.data))
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 3000);

        }catch(err){
        setError(err?.response?.data)
    }
}
  return (
    <>
      <div className="flex justify-center my-5">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-[400px]  shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs ">
                  <div className="label">
                    <span className="label-text">First Name:</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                 <label className="form-control w-full max-w-xs ">
                 <label className="form-control w-full max-w-xs ">
                    <div className="label">
                      <span className="label-text">Last Name:</span>
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>*
                  <div className="label">
                    <span className="label-text">Photo URL :</span>
                  </div>
                  <input
                    type="text"
                    value={photoURL}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPhotoURL(e.target.value)}
                  />
                </label> 
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Age:</span>
                  </div>
                  <input
                    type="text"
                    value={age || " "}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Gender:</span>
                  </div>
                  <input
                    type="text"
                    value={gender || " "}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Description:</span>
                  </div>
                  <input
                    type="text"
                    value={description}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </label>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName,  lastName,  photoURL, age, gender, description }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  )
}


export default EditProfile;