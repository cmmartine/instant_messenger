import React from "react";

export default function OpenChatroomButton(props) {
  const { userInfo, changeChattingWithUser } = props;
  const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");

  const openChatbox = () => {
    createChatroom();
    changeChattingWithUser(userInfo);
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
    <div id={`user.${userInfo.id}`} onClick={(e) => {
      e.preventDefault();
      openChatbox();
    }}>
      <li key={userInfo.id}>{userInfo.username}</li>
    </div>
  )
}