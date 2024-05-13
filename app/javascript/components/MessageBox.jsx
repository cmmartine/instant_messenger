import React from "react";
import { useContext, useState } from "react";
import { CurrentChatroomContext } from "./Main";
import { postMessage } from "../util/messageUtil";

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
      <textarea id='message-box-text' aria-label='new-message' rows='1' columns='60' spellCheck='true' onChange={(e) => {setNewMessage(e.target.value)}}/>
      <button type='submit' onClick={(e) => {
        e.preventDefault();
        postMessage(newMessage, currentChatroom);
        resetMessage();
      }}>Send</button>
    </form>
  );
}