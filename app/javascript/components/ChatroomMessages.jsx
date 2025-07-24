import React from "react";
import { useContext, useEffect, useState } from "react";
import { CurrentChatroomContext, CurrentUserContext, LightDarkContext } from "./ContextProviderWrapper";
import { getMessages } from "../util/messageUtil";
import { THEMES } from "../constants_ts/THEMES";

export default function ChatroomMessages(props) {
  const { chattingWithUser } = props;
  const currentChatroom = useContext(CurrentChatroomContext);
  const currentUser = useContext(CurrentUserContext);
  const lightDarkTheme = useContext(LightDarkContext);
  const [allMessages, setAllMessages] = useState([]);
  const [messagesChatroom, setMessagesChatroom] = useState({id: null});

  const isDarkTheme = lightDarkTheme === THEMES.dark;
  const containerClass = isDarkTheme ? 'messages-container messages-container-dark' : 'messages-container';
  const messageListClass = isDarkTheme ? 'message-list message-list-dark' : 'message-list';
  
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
  }, [currentChatroom, lightDarkTheme]);

  const createMessageList = () => {
    const messageList = allMessages.map((message) => {
      return selectMessageType(message);
    });

    return <ul className={messageListClass}>{messageList}</ul>
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

  const getChatroomMessages = async () => {
    const data = await getMessages(currentChatroom);
    // Reverse array so .message-list flex-direction: column-reverse keeps time order top to bottom
    const messages = data[0].reverse();
    const chatroom_id = data[1];
    setAllMessages(messages);
    setMessagesChatroom(chatroom_id);
  };

  if (allMessages.length && (currentChatroom.info.id == messagesChatroom.id)) {
    return (
      <div className={containerClass}>
        {createMessageList()}
      </div>
    );
  } else {
    return (
      <div className={containerClass}>
        <ul className={messageListClass}><li className='message'>Start Chatting!</li></ul>
      </div>
    );
  }
}