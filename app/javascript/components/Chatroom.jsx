import React from "react";
import ChatroomMessages from "./ChatroomMessages";
import MessageBox from "./MessageBox";

export default function Chatroom(props) {
  const { chattingWithUser } = props;

  return (
    <div className='chatroom-container'>
      <div className='chatroom-message-list'>
        <div>{chattingWithUser.username}</div>
        <ChatroomMessages/>
      </div>
      <MessageBox chattingWithUser={chattingWithUser}/>
    </div>
  );
}