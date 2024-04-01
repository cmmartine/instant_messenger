import React, { createContext, useEffect, useState } from "react";
import setupUserChatroomConsumers from "../channels/chatroom_channel";
import UserList from "./UserList";

export const CurrentUserContext = createContext();
export const CableContext = createContext();

const actionCableUrl = process.env.NODE_ENV === 'production' ? 'wss://<your-deployed-app-domain>.com/cable' : 'ws://localhost:3000/cable'

export default function Main() {
  const [currentUserInfo, setCurrentUserInfo] = useState();
  const [fetchUser, setFetchUser] = useState(false);

  useEffect(() => {
    if (!fetchUser) {
      getCurrentUserInfo();
      setFetchUser(true);
    }
  });

  function getCurrentUserInfo() {
    fetch('users/current_user_info')
    .then((res) => res.json())
    .then((data) => {
      let currentUserInfo = {...data};
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

  if (currentUserInfo) {
    return(
      <CableContext.Provider value={actionCableUrl}>
        <CurrentUserContext.Provider value={currentUserInfo}>
          <UserList/>
        </CurrentUserContext.Provider>
      </CableContext.Provider>
    );
    }
  else {
    return(
      <div>
        Loading...
      </div>
    )
  }
}