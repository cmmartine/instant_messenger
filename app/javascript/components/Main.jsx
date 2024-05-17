import React, { createContext, useEffect, useState } from "react";
import ChatroomChannel from "../channels/chatroom_channel";
import NavBar from "./NavBar";
import UserList from "./UserList";
import Chatroom from "./Chatroom";
import { getCurrentUserInfo } from "../util/userUtil";

export const CurrentUserContext = createContext();
export const ChatroomContext = createContext();
export const CurrentChatroomContext = createContext();
export const CableContext = createContext();

const actionCableUrl = process.env.NODE_ENV === 'production' ? 'wss://<your-deployed-app-domain>.com/cable' : 'ws://localhost:3000/cable'

export default function Main() {
  const [currentUserInfo, setCurrentUserInfo] = useState();
  const [chattingWithUser, setChattingWithUser] = useState();
  const [chatrooms, setChatrooms] = useState([]);
  const [currentChatroom, setCurrentChatroom] = useState();

  useEffect(() => {
      getCurrentUserInfo(setCurrentUserInfo, openChatroomConnections);
  }, []);

  function openChatroomConnections(chatrooms, newCurrentChatroom) {
    let chatRoomsConnections = []
    chatrooms.forEach((room) => {
      chatRoomsConnections.push({info: room, connection: ChatroomChannel(room)});
      if (room.id == newCurrentChatroom.id) {
        changeCurrentChatroom({info: room, connection: ChatroomChannel(room)});
      }
    });
    setChatrooms(chatRoomsConnections);
  };

  function changeChattingWithUser(userInfo) {
    setChattingWithUser(userInfo);
  };

  function changeCurrentChatroom(chatroom) {
    setCurrentChatroom(chatroom)
  }

  function refetchCurrentUser(newCurrentChatroom) {
    getCurrentUserInfo(setCurrentUserInfo, openChatroomConnections, newCurrentChatroom);
  }

  if (currentUserInfo && chattingWithUser && currentChatroom) {
    return (
      <CableContext.Provider value={actionCableUrl}>
        <CurrentUserContext.Provider value={currentUserInfo}>
          <ChatroomContext.Provider value={chatrooms}>
            <CurrentChatroomContext.Provider value={currentChatroom}>
              <NavBar/>
              <UserList changeChattingWithUser={changeChattingWithUser} refetchCurrentUser={refetchCurrentUser}/>
              <div id='chatroom-outer-container'>
                <Chatroom chattingWithUser={chattingWithUser}/>
              </div>
            </CurrentChatroomContext.Provider>
          </ChatroomContext.Provider>
        </CurrentUserContext.Provider>
      </CableContext.Provider>
    );
  } else if (currentUserInfo) {
    return (
      <CableContext.Provider value={actionCableUrl}>
        <CurrentUserContext.Provider value={currentUserInfo}>
          <ChatroomContext.Provider value={chatrooms}>
            <CurrentChatroomContext.Provider value={currentChatroom}>
              <NavBar/>
              <UserList changeChattingWithUser={changeChattingWithUser} refetchCurrentUser={refetchCurrentUser}/>
            </CurrentChatroomContext.Provider>
          </ChatroomContext.Provider>
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