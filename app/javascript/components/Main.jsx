import React, { createContext, useEffect, useState } from "react";
import ChatroomChannel from "../channels/chatroom_channel";
import UserList from "./UserList";
import Chatroom from "./Chatroom";
import { getCurrentUserInfo, currentTheme } from "../util/userUtil";
import * as THEMES from "../constants/THEMES";

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
      checkCurrentTheme();
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

  async function applyCurrentUserInfo(newCurrentChatroom= {id: null}) {
    const data = await getCurrentUserInfo();
    let currentUserData = { ...data };
    setCurrentUserInfo(currentUserData);
    openChatroomConnections(currentUserData.chatrooms, newCurrentChatroom);
  };

  async function checkCurrentTheme() {
    const data = await currentTheme();
    setLightOrDark(data.theme);
    const body = document.body;
    body.classList.add('body-' + `${data.theme}`);
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