import React from "react";
import { useContext, useState } from "react";
import { CurrentChatroomContext } from "./Main";
import { postMessage, postAIChatroomMessages } from "../util/messageUtil";

export default function MessageBox(props) {
  const { chattingWithUser } = props
  const currentChatroom = useContext(CurrentChatroomContext);
  let [newMessage, setNewMessage] = useState('');

  const resetMessage = () => {
    setNewMessage('');
    document.getElementById('message-box-text').value = '';
  };

  return(
    <form id='chatroom-message-form'>
      <textarea id='message-box-text' aria-label='new-message' spellCheck='true' onChange={(e) => {setNewMessage(e.target.value)}}/>
      <button className='send-message-btn' type='submit' onClick={(e) => {
        e.preventDefault();
        if (chattingWithUser.username == 'Chatbot') {
          postAIChatroomMessages(newMessage, currentChatroom)
        } else {
          postMessage(newMessage, currentChatroom);
        }
        resetMessage();
      }}>📮</button>
    </form>
  );
}