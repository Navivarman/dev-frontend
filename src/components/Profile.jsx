import React from 'react'
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';

export const Profile = () => {
  const user = useSelector(store => store.user);
  return (
    user &&
    <div className="h-[80vh]">
       <EditProfile user={user} />
    </div>
  )
}

export default Profile;