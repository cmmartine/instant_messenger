import React from "react";
import { getCsrfToken } from "../util/csrfTokenUtil";

export default function OpenChatroomButton(props) {
  const { userInfo, changeChattingWithUser, refetchCurrentUser, changeCurrentChatroom } = props;

  const createAndOpenChatbox = () => {
    createChatroom();
    changeChattingWithUser(userInfo);
  };

  const createChatroom = () => {
    let chatroom;
    let csrf = getCsrfToken();
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
    ).then((res) => {
      return res.json();
    }).then((data) => {
      chatroom = data;
      refetchCurrentUser();
      changeCurrentChatroom(chatroom);
    })
  };

  return(
    <div id={`user.${userInfo.id}`} onClick={(e) => {
      e.preventDefault();
      createAndOpenChatbox();
    }}>
      <li key={userInfo.id}>{userInfo.username}</li>
    </div>
  );
}