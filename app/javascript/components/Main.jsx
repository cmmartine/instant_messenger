import React, { createContext, useEffect, useState } from "react";
import setupUserChatroomConsumers from "../channels/chatroom_channel";
import UserList from "./UserList";
import Chatroom from "./Chatroom";
import { getCurrentUserInfo } from "../util/userUtil";

export const CurrentUserContext = createContext();
export const CurrentChatroomContext = createContext();
export const CableContext = createContext();

const actionCableUrl = process.env.NODE_ENV === 'production' ? 'wss://<your-deployed-app-domain>.com/cable' : 'ws://localhost:3000/cable'

export default function Main() {
  const [currentUserInfo, setCurrentUserInfo] = useState();
  const [fetchCurrentUser, setFetchCurrentUser] = useState(false);
  const [chattingWithUser, setChattingWithUser] = useState();
  const [currentChatroom, setCurrentChatroom] = useState();

  useEffect(() => {
    if (!fetchCurrentUser) {
      getCurrentUserInfo(setCurrentUserInfo, openChatroomConnections);
      setFetchCurrentUser(true);
    }
  });

  function openChatroomConnections(chatrooms) {
    chatrooms.forEach((room) => {
      console.log(room)
      setupUserChatroomConsumers(room);
    });
  };

  function changeChattingWithUser(userInfo) {
    setChattingWithUser(userInfo);
  };

  function changeCurrentChatroom(chatroom) {
    setCurrentChatroom(chatroom);
  }

  function refetchCurrentUser() {
    setFetchCurrentUser();
  }

  if (currentUserInfo && chattingWithUser && currentChatroom) {
    return (
      <CableContext.Provider value={actionCableUrl}>
        <CurrentUserContext.Provider value={currentUserInfo}>
          <CurrentChatroomContext.Provider value={currentChatroom}>
            <UserList changeChattingWithUser={changeChattingWithUser} refetchCurrentUser={refetchCurrentUser} changeCurrentChatroom={changeCurrentChatroom}/>
            <div id='chatroom-outer-container'>
              <Chatroom chattingWithUser={chattingWithUser}/>
            </div>
          </CurrentChatroomContext.Provider>
        </CurrentUserContext.Provider>
      </CableContext.Provider>
    );
  } else if (currentUserInfo) {
    return (
      <CableContext.Provider value={actionCableUrl}>
        <CurrentUserContext.Provider value={currentUserInfo}>
          <CurrentChatroomContext.Provider value={currentChatroom}>
            <UserList changeChattingWithUser={changeChattingWithUser} refetchCurrentUser={refetchCurrentUser} changeCurrentChatroom={changeCurrentChatroom}/>
          </CurrentChatroomContext.Provider>
        </CurrentUserContext.Provider>
      </CableContext.Provider>
    );
  } else {
    return (
      <div>
        Please refresh the page
      </div>
    )
  }
}