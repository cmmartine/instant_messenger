import React from "react";
import { useContext, useEffect, useState } from "react";
import { CurrentChatroomContext, CurrentUserContext } from "./Main";
import { getMessages } from "../util/messageUtil";
import { LightDarkContext } from "./Main";
import { THEMES } from "../constants/themes";

export default function ChatroomMessages(props) {
  const { chattingWithUser } = props;
  const currentChatroom = useContext(CurrentChatroomContext);
  const currentUser = useContext(CurrentUserContext);
  const lightDarkTheme = useContext(LightDarkContext);
  const [allMessages, setAllMessages] = useState([]);
  const [messagesChatroom, setMessagesChatroom] = useState({id: null});
  
  useEffect(() => {
    getChatroomMessages();
    if (currentChatroom.connection) {
      currentChatroom.connection.received = () => {getChatroomMessages()};
    };
    return() => {
      if (currentChatroom.connection) {
        currentChatroom.connection.received = () => {};
      };
    };
  }, [currentChatroom]);

  const createMessageList = () => {
    const messageListCss = lightDarkTheme == THEMES.light ? 'message-list' : 'message-list message-list-dark';
    // Reverse array so .message-list flex-direction: column-reverse keeps time order top to bottom
    const messageList = allMessages.reverse().map((message) => {
      return selectMessageType(message);
    });

    return <ul className={messageListCss}>{messageList}</ul>
  };

  const selectMessageType = (message) => {
    if(message.user_id == currentUser.id) {
      return <li key={message.id} className='message'>
        <div className='current-user-message'>{currentUser.username}: </div>
        <div className='message-body'>{message.body}</div>
      </li>
    } else {
      return <li key={message.id} className='message'>
        <div className='other-user-message'>{chattingWithUser.username}: </div>
        <div className='message-body'>{message.body}</div>
      </li>
    };
  };

  const getChatroomMessages = () => {
    getMessages(currentChatroom).then((data) => {
      const messages = data[0];
      const chatroom_id = data[1];
      setAllMessages(messages);
      setMessagesChatroom(chatroom_id);
    });
  };

  if (lightDarkTheme == THEMES.light) {
    if (allMessages.length && (currentChatroom.info.id == messagesChatroom.id)) {
      return (
        <div className='messages-container'>
          {createMessageList()}
        </div>
      );
    } else {
      return (
        <div className='messages-container'>
          <ul className='message-list'><li className='message'>Start Chatting!</li></ul>
        </div>
      );
    }
  } else if (lightDarkTheme == THEMES.dark) {
      if (allMessages.length && (currentChatroom.info.id == messagesChatroom.id)) {
        return (
          <div className='messages-container'>
            {createMessageList()}
          </div>
        );
      } else {
        return (
          <div className='messages-container messages-container-dark'>
            <ul className='message-list message-list-dark'><li className='message'>Start Chatting!</li></ul>
          </div>
        );
      }
  }
    
}