import React from "react";
import { useContext, useState } from "react";
import { CurrentChatroomContext } from "./Main";
import { postMessage, postAIChatroomMessages } from "../util/messageUtil";
import { postUserIsTyping, postUserIsNotTyping } from "../util/chatroomUtil";
import { LightDarkContext } from "./Main";
import { THEMES } from "../constants/themes";

export default function MessageBox(props) {
  const { chattingWithUser } = props
  const currentChatroom = useContext(CurrentChatroomContext);
  const lightDarkTheme = useContext(LightDarkContext);
  const [newMessage, setNewMessage] = useState('');
  const [userIsTyping, setUserIsTyping] = useState(false);

  const resetMessage = () => {
    setNewMessage('');
    document.getElementById('message-box-text').value = '';
  };

  const isUserTyping = (textValue) => {
    if (!textValue && userIsTyping) {
      postUserIsNotTyping(currentChatroom.info.id);
      setUserIsTyping(false);
    } else if (textValue && !userIsTyping) {
      postUserIsTyping(currentChatroom.info.id);
      setUserIsTyping(true);
    };
  };

  if (lightDarkTheme == THEMES.light) {
    return(
      <form id='chatroom-message-form'>
        <textarea id='message-box-text' aria-label='new-message' spellCheck='true' onChange={(e) => {
          setNewMessage(e.target.value);
          isUserTyping(e.target.value);
          }}/>
        <button className='send-message-btn' type='submit' onClick={(e) => {
          e.preventDefault();
          if (chattingWithUser.username == 'Chatbot') {
            postAIChatroomMessages(newMessage, currentChatroom)
          } else {
            postMessage(newMessage, currentChatroom);
            postUserIsNotTyping(currentChatroom.info.id);
            setUserIsTyping(false);
          }
          resetMessage();
        }}>📮</button>
      </form>
    );
  } else if (lightDarkTheme == THEMES.dark) {
    return(
      <form id='chatroom-message-form'>
        <textarea id='message-box-text' className='message-box-text-dark' aria-label='new-message' spellCheck='true' onChange={(e) => {
          setNewMessage(e.target.value);
          isUserTyping(e.target.value);
          }}/>
        <button className='send-message-btn send-message-btn-dark' type='submit' onClick={(e) => {
          e.preventDefault();
          if (chattingWithUser.username == 'Chatbot') {
            postAIChatroomMessages(newMessage, currentChatroom)
          } else {
            postMessage(newMessage, currentChatroom);
            postUserIsNotTyping(currentChatroom.info.id);
            setUserIsTyping(false);
          }
          resetMessage();
        }}>📮</button>
      </form>
    );
  }
}