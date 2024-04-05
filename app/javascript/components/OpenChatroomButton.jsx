import React from "react";

export default function OpenChatroomButton(props) {
  const { userInfo, changeChattingWithUser, refetchCurrentUser } = props;
  const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");

  const createAndOpenChatbox = () => {
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
    ).then(() => {
      refetchCurrentUser();
    })
  };

  return(
    <div id={`user.${userInfo.id}`} onClick={(e) => {
      e.preventDefault();
      createAndOpenChatbox();
    }}>
      <li key={userInfo.id}>{userInfo.username}</li>
    </div>
  )
}