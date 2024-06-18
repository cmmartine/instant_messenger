import React from "react";
import ChatroomMessages from "./ChatroomMessages";
import MessageBox from "./MessageBox";

export default function Chatroom(props) {
  const { chattingWithUser, changeCurrentChatroom } = props;

  const exitChatroom = (e) => {
    e.preventDefault();
    let chatroom;
    changeCurrentChatroom(chatroom);
  };

  return (
    <div className='chatroom-container'>
      <div className='chatroom-topbar'>
        <div>{chattingWithUser.username}</div>
        <button className='chatroom-exit-btn' onClick={exitChatroom}>X</button>
      </div>
      <ChatroomMessages chattingWithUser={chattingWithUser}/>
      <MessageBox chattingWithUser={chattingWithUser}/>
    </div>
  );
}