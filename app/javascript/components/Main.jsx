import React, { createContext, useEffect, useState } from "react";
import ChatroomChannel from "../channels/chatroom_channel";
import NavBar from "./NavBar";
import UserList from "./UserList";
import Chatroom from "./Chatroom";
import { getCurrentUserInfo } from "../util/userUtil";
import { THEMES } from "../constants/themes";

export const CurrentUserContext = createContext();
export const ChatroomContext = createContext();
export const CurrentChatroomContext = createContext();
export const CableContext = createContext();
export const LightDarkContext = createContext();

const actionCableUrl = process.env.NODE_ENV === 'production' ? 'wss://<your-deployed-app-domain>.com/cable' : 'ws://localhost:3000/cable'

export default function Main() {
  const [currentUserInfo, setCurrentUserInfo] = useState();
  const [chattingWithUser, setChattingWithUser] = useState();
  const [chatrooms, setChatrooms] = useState([]);
  const [currentChatroom, setCurrentChatroom] = useState();
  const [lightOrDark, setLightOrDark] = useState(THEMES.light);

  useEffect(() => {
      applyCurrentUserInfo();
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
    setCurrentChatroom(chatroom);
  };

  function refetchCurrentUser(newCurrentChatroom) {
    applyCurrentUserInfo(newCurrentChatroom);
  };

  function applyCurrentUserInfo(newCurrentChatroom= {id: null}) {
    getCurrentUserInfo().then((data) => {
      let currentUserData = { ...data };
      setCurrentUserInfo(currentUserData);
      openChatroomConnections(currentUserData.chatrooms, newCurrentChatroom);
    });
  };

  function changeLightDarkTheme() {
    const body = document.body;
    if (lightOrDark == THEMES.light) {
      setLightOrDark(THEMES.dark)
      body.classList.add('body-dark');
    } else {
      setLightOrDark(THEMES.light);
      body.classList.remove('body-dark');
    }
  };

  if (currentUserInfo && chattingWithUser && currentChatroom) {
    return (
      <CableContext.Provider value={actionCableUrl}>
        <CurrentUserContext.Provider value={currentUserInfo}>
          <ChatroomContext.Provider value={chatrooms}>
            <CurrentChatroomContext.Provider value={currentChatroom}>
              <LightDarkContext.Provider value={lightOrDark}>
                <div className='components-wrapper'>
                  <NavBar/>
                  <UserList changeChattingWithUser={changeChattingWithUser} refetchCurrentUser={refetchCurrentUser} changeLightDarkTheme={changeLightDarkTheme}/>
                  <Chatroom chattingWithUser={chattingWithUser} changeCurrentChatroom={changeCurrentChatroom}/>
                </div>
              </LightDarkContext.Provider>
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
              <LightDarkContext.Provider value={lightOrDark}>
                <div className='components-wrapper'>
                    <NavBar/>
                    <UserList changeChattingWithUser={changeChattingWithUser} refetchCurrentUser={refetchCurrentUser} changeLightDarkTheme={changeLightDarkTheme}/>
                </div>
              </LightDarkContext.Provider>
            </CurrentChatroomContext.Provider>
          </ChatroomContext.Provider>
        </CurrentUserContext.Provider>
      </CableContext.Provider>
    );
  } else {
    return (
      <div>
        Loading...
      </div>
    );
  }
}