import React from "react";
import ChatroomMessages from "./ChatroomMessages";
import MessageBox from "./MessageBox";

export default function Chatroom(props) {
  const { chattingWithUser, fetchedMessages, setFetchedMessages } = props;

  return (
    <div className='chatroom-inner-container'>
      <div className='chatroom-message-list'>
        <div>{chattingWithUser.username}</div>
        <ChatroomMessages fetchedMessages={fetchedMessages} setFetchedMessages={setFetchedMessages}/>
      </div>
      <MessageBox chattingWithUser={chattingWithUser}/>
    </div>
  );
}