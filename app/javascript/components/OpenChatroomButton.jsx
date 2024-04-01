import React from "react";

export default function OpenChatroomButton(props) {
  const { userInfo } = props;

  const openChatbox = (e) => {
    console.log(userInfo.username)
  };

  return(
    <div id={`user.${userInfo.id}`} onClick={openChatbox}>
      <li key={userInfo.id}>{userInfo.username}</li>
    </div>
  )
}