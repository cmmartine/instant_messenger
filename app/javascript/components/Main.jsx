import React, { createContext, useEffect, useState } from "react";
import UserList from "./UserList";

export const CurrentUserContext = createContext();
export const CableContext = createContext();

const actionCableUrl = process.env.NODE_ENV === 'production' ? 'wss://<your-deployed-app-domain>.com/cable' : 'ws://localhost:3000/cable'

export default function Main() {
  const [currentUser, setCurrentUser] = useState();
  const [fetchUser, setFetchUser] = useState(false);

  useEffect(() => {
    if (!fetchUser) {
      getCurrentUser();
      setFetchUser(true);
    }
  });

  function getCurrentUser() {
    fetch('users/current_user_info')
    .then((res) => res.json())
    .then((data) => {
      setCurrentUser({...data})
    })
  };

  if (currentUser) {
    return(
      <CableContext.Provider value={actionCableUrl}>
        <CurrentUserContext.Provider value={currentUser}>
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