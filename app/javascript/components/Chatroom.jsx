import React from "react";

export default function Chatroom(props) {
  const { chattingWithUser } = props;

  return (
    <div className='chatroom-inner-container'>
      <div>{chattingWithUser.username}</div>
    </div>
  );
}