import React from "react";
import MessageBox from "./MessageBox";

export default function Chatroom(props) {
  const { chattingWithUser } = props;

  return (
    <div className='chatroom-inner-container'>
      <div>{chattingWithUser.username}</div>
      <div className='chatroom-message-list'></div>
      <MessageBox chattingWithUser={chattingWithUser}/>
    </div>
  );
}