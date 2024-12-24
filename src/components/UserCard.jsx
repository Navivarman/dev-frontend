import React from "react";


const UserCard = ({user}) => {
    console.log(user)
    const {firstName,lastName,gender,age,description,photoURL} = user;
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
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interest</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
