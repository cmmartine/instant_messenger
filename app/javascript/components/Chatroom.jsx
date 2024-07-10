import React from "react";
import { useContext } from "react";
import ChatroomMessages from "./ChatroomMessages";
import MessageBox from "./MessageBox";
import { LightDarkContext } from "./Main";
import { THEMES } from "../constants/themes";

export default function Chatroom(props) {
  const { chattingWithUser, changeCurrentChatroom } = props;
  const lightDarkTheme = useContext(LightDarkContext);

  const exitChatroom = (e) => {
    e.preventDefault();
    let chatroom;
    changeCurrentChatroom(chatroom);
  };

  if (lightDarkTheme == THEMES.light) {
    return (
      <div className='chatroom-container'>
        <div className='chatroom-topbar'>
          <div>{chattingWithUser.username}</div>
          <button className='chatroom-exit-btn' onClick={exitChatroom}>X</button>
        </div>
        <ChatroomMessages chattingWithUser={chattingWithUser}/>
        <MessageBox chattingWithUser={chattingWithUser}/>
      </div>
    );
  } else if (lightDarkTheme == THEMES.dark) {
    return (
      <div className='chatroom-container chatroom-container-dark'>
        <div className='chatroom-topbar chatroom-topbar-dark'>
          <div>{chattingWithUser.username}</div>
          <button className='chatroom-exit-btn chatroom-exit-btn-dark' onClick={exitChatroom}>X</button>
        </div>
        <ChatroomMessages chattingWithUser={chattingWithUser}/>
        <MessageBox chattingWithUser={chattingWithUser}/>
      </div>
    );
  }
}