import React, { useEffect, useState } from "react";
import ContextProviderWrapper from "./ContextProviderWrapper";
import ChatroomChannel from "../channels/chatroom_channel";
import UserList from "./UserList";
import Chatroom from "./Chatroom";
import { getCurrentUserInfo, currentTheme } from "../util/userUtil";
import * as THEMES from "../constants/THEMES";

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

  function changeChattingWithUser(userInfo) {
    setChattingWithUser(userInfo);
  };

  function changeCurrentChatroom(chatroom) {
    setCurrentChatroom(chatroom);
  };

  function refetchCurrentUser(newCurrentChatroom) {
    applyCurrentUserInfo(newCurrentChatroom);
  };

  function createChatroomConnection(chatroom) {
    return { info: chatroom, connection: ChatroomChannel(chatroom) };
  }

  function initializeChatroomConnections(chatrooms) {
    return chatrooms.map(createChatroomConnection);
  }

  function setCurrentChatroomConnection(chatroomsConnections, newCurrentChatroom) {
    const matchingChatroom = chatroomsConnections.find(
      (room) => room.info.id === newCurrentChatroom.id
    );
    if (matchingChatroom) {
      changeCurrentChatroom(matchingChatroom);
    }
  }

  function openChatroomConnections(chatrooms, newCurrentChatroom) {
    const chatroomsConnections = initializeChatroomConnections(chatrooms);
    setChatrooms(chatroomsConnections);

    if (newCurrentChatroom?.id) {
      setCurrentChatroomConnection(chatroomsConnections, newCurrentChatroom);
    }
  }

  async function applyCurrentUserInfo(newCurrentChatroom = { id: null }) {
    const data = await getCurrentUserInfo();
    const currentUserData = { ...data };
    setCurrentUserInfo(currentUserData);
  
    openChatroomConnections(currentUserData.chatrooms, newCurrentChatroom);
  }

  async function checkCurrentTheme() {
    const data = await currentTheme();
    setLightOrDark(data.theme);
    const body = document.body;
    body.classList.add('body-' + `${data.theme}`);
  };

  if (currentUserInfo) {
    return (
      <ContextProviderWrapper currentUserInfo={currentUserInfo} chatrooms={chatrooms} currentChatroom={currentChatroom} lightOrDark={lightOrDark}>
        <div className='components-wrapper'>
          <UserList changeChattingWithUser={changeChattingWithUser} refetchCurrentUser={refetchCurrentUser} lightOrDark ={lightOrDark} setLightOrDark={setLightOrDark}/>
          {(chattingWithUser && currentChatroom) && <Chatroom chattingWithUser={chattingWithUser} changeCurrentChatroom={changeCurrentChatroom}/>}
        </div>
      </ContextProviderWrapper>
    );
  } else {
    return (
      <div>
        Loading...
      </div>
    );
  }
}