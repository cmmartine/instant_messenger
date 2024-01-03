import React, { createContext, useEffect, useState } from "react";
import UserList from "./UserList";

export const CurrentUserContext = createContext();
export const CableContext = createContext();

const actionCableUrl = process.env.NODE_ENV === 'production' ? 'wss://<your-deployed-app-domain>.com/cable' : 'ws://localhost:3000/cable'

export default function Main() {
  const [currentUserName, setCurrentUserName] = useState();
  const [fetchUser, setFetchUser] = useState(false);

  useEffect(() => {
    if (!fetchUser) {
      getCurrentUserName();
      setFetchUser(true);
    }
  });

  function getCurrentUserName() {
    fetch('users/current_user_name')
    .then((res) => res.json())
    .then((data) => {
      setCurrentUserName({...data})
    })
  };

  if (currentUserName) {
    return(
      <CableContext.Provider value={actionCableUrl}>
        <CurrentUserContext.Provider value={currentUserName}>
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