import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(store => store.feed);

  const getFeed = async () => {
    if(feed) return;
    const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true });
    dispatch(addFeed(res?.data?.data));
  };

  useEffect(() => {
    getFeed();
  }, []);

  if(!feed) return ;
  if(feed.length <= 0) return <p className='flex justify-center my-10 font-bold text-xl'>No feed yet</p>;
  return (
    feed && 
    <div className="flex justify-center my-10">
        <UserCard user={feed[0]}  />
    </div>
  )
      
};

export default Feed;
