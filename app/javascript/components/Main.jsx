import React, { useContext, createContext, useEffect, useState } from "react";
import UserList from "./UserList";

export const CurrentUserContext = createContext(null);

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
    fetch('users/get_current_user')
    .then((res) => res.json())
    .then((data) => {
      setCurrentUser({...data})
    })
  };

  if (currentUser) {
    return(
      <CurrentUserContext.Provider value={currentUser}>
        <div>
          <UserList/>
        </div>
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