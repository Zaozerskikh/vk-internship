import "./style.css";
import React from "react";
import {UserInfo} from "../../types/UserInfo.ts";

export const UserCard: React.FC<UserInfo> = ({ image, lastName, firstName, address }) => {
  return (
    <div className="userCard">
      <img className="userPic" src={image} alt={'img'}/>
      <div className="userInfo">
        <div>{`${firstName} ${lastName}`}</div>
        <div>{address.city}</div>
      </div>
    </div>
  );
}
