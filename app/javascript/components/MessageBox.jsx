import React from "react";
import { useContext, useState, useEffect } from "react";
import { CurrentChatroomContext, CurrentUserContext } from "./Main";
import SpeechToTextBtn from "./SpeechToTextBtn";
import { postMessage, postAIChatroomMessages } from "../util/messageUtil";
import { postUserIsTyping, postUserIsNotTyping } from "../util/chatroomUtil";
import { LightDarkContext } from "./Main";
import * as THEMES from "../constants/THEMES";

export default function MessageBox(props) {
  const { chattingWithUser } = props
  const currentChatroom = useContext(CurrentChatroomContext);
  const currentUser = useContext(CurrentUserContext);
  const lightDarkTheme = useContext(LightDarkContext);
  const [newMessage, setNewMessage] = useState('');
  const [userIsTyping, setUserIsTyping] = useState(false);
  const localStorageKey = `draftMessageChatroom${currentChatroom.info.id}User${currentUser.id}`;

  useEffect(() => {
    useLocalStorageValue(checkLocalStorage());
  }), [];

  const resetMessage = () => {
    setNewMessage('');
    localStorage.removeItem(localStorageKey);
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

  const checkLocalStorage = () => {
    let storageValue = localStorage.getItem(localStorageKey);
    if (storageValue) { 
      return storageValue 
    } else {
      return '';
    };
  };

  const useLocalStorageValue = (storageValue) => {
    let textArea = document.getElementById('message-box-text');
    textArea.value = storageValue;
    setNewMessage(storageValue);
  };

  const renderSpeechToTxtBtn = () => {
    if(!navigator.userAgent.match(/firefox|fxios/i)) {
      return <SpeechToTextBtn setNewMessage={setNewMessage} localStorageKey={localStorageKey}/>
    };
  };

  if (lightDarkTheme == THEMES.light) {
    return(
      <form id='chatroom-message-form'>
        <textarea id='message-box-text' aria-label='new-message' spellCheck='true' onChange={(e) => {
          setNewMessage(e.target.value);
          localStorage.setItem(localStorageKey, e.target.value);
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
        {renderSpeechToTxtBtn()}
      </form>
    );
  } else if (lightDarkTheme == THEMES.dark) {
    return(
      <form id='chatroom-message-form'>
        <textarea id='message-box-text' className='message-box-text-dark' aria-label='new-message' spellCheck='true' onChange={(e) => {
          setNewMessage(e.target.value);
          localStorage.setItem(localStorageKey, e.target.value);
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
        {renderSpeechToTxtBtn()}
      </form>
    );
  }
}