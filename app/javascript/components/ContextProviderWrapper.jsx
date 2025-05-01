import React, { createContext } from 'react';

export const CurrentUserContext = createContext();
export const ChatroomContext = createContext();
export const CurrentChatroomContext = createContext();
export const CableContext = createContext();
export const LightDarkContext = createContext();

const actionCableUrl = process.env.NODE_ENV === 'production' ? 'wss://<your-deployed-app-domain>.com/cable' : 'ws://localhost:3000/cable'

export default function ContextProviderWrapper(props) {
  const {
    children,
    currentUserInfo,
    chatrooms,
    currentChatroom,
    lightOrDark
  } = props;

  return (
    <CableContext.Provider value={actionCableUrl}>
      <CurrentUserContext.Provider value={currentUserInfo}>
        <ChatroomContext.Provider value={chatrooms}>
          <CurrentChatroomContext.Provider value={currentChatroom}>
            <LightDarkContext.Provider value={lightOrDark}>
              {children}
            </LightDarkContext.Provider>
          </CurrentChatroomContext.Provider>
        </ChatroomContext.Provider>
      </CurrentUserContext.Provider>
    </CableContext.Provider>
  );
}