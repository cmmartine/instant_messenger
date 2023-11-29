import React, { createContext, useEffect, useState } from "react";
import UserList from "./UserList";

export const CurrentUserContext = createContext();

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
      <CurrentUserContext.Provider value={currentUserName}>
          <UserList/>
      </CurrentUserContext.Provider>
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