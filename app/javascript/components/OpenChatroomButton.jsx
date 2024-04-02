import React from "react";

export default function OpenChatroomButton(props) {
  const { userInfo } = props;
  const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");

  const openChatbox = (e) => {
    createChatroom();
  };

  const createChatroom = () => {
    fetch('chatrooms/create', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRF-Token': csrf,
      },
      body: 
        JSON.stringify({chatroom: {
          active_status: true,
          userId: userInfo.id
        }})
      }
    )
  };

  return(
    <div id={`user.${userInfo.id}`} onClick={openChatbox}>
      <li key={userInfo.id}>{userInfo.username}</li>
    </div>
  )
}