import React, { createContext, useEffect, useState } from "react";
import setupUserChatroomConsumers from "../channels/chatroom_channel";
import UserList from "./UserList";
import Chatroom from "./Chatroom";

export const CurrentUserContext = createContext();
export const CableContext = createContext();

const actionCableUrl = process.env.NODE_ENV === 'production' ? 'wss://<your-deployed-app-domain>.com/cable' : 'ws://localhost:3000/cable'

export default function Main() {
  const [currentUserInfo, setCurrentUserInfo] = useState();
  const [fetchCurrentUser, setFetchCurrentUser] = useState(false);
  const [chattingWithUser, setChattingWithUser] = useState();

  useEffect(() => {
    if (!fetchCurrentUser) {
      getCurrentUserInfo();
      setFetchCurrentUser(true);
    }
  });

  function getCurrentUserInfo() {
    fetch('users/current_user_info')
      .then((res) => res.json())
      .then((data) => {
        let currentUserInfo = { ...data };
        setCurrentUserInfo(currentUserInfo);
        openChatroomConnections(currentUserInfo.chatrooms);
      })
  };

  function openChatroomConnections(chatrooms) {
    chatrooms.forEach((room) => {
      console.log(room)
      setupUserChatroomConsumers(room);
    });
  };

  function changeChattingWithUser(userInfo) {
    setChattingWithUser(userInfo);
  };

  function refetchCurrentUser() {
    setFetchCurrentUser();
  }

  if (currentUserInfo && chattingWithUser) {
    return (
      <CableContext.Provider value={actionCableUrl}>
        <CurrentUserContext.Provider value={currentUserInfo}>
          <UserList changeChattingWithUser={changeChattingWithUser} refetchCurrentUser={refetchCurrentUser}/>
          <div id='chatroom-outer-container'>
            <Chatroom chattingWithUser={chattingWithUser} />
          </div>
        </CurrentUserContext.Provider>
      </CableContext.Provider>
    );
  } else if (currentUserInfo) {
    return (
      <CableContext.Provider value={actionCableUrl}>
        <CurrentUserContext.Provider value={currentUserInfo}>
          <UserList changeChattingWithUser={changeChattingWithUser} refetchCurrentUser={refetchCurrentUser}/>
        </CurrentUserContext.Provider>
      </CableContext.Provider>
    );
  } else {
    return (
      <div>
        Loading...
      </div>
    )
  }
}