import React, { useContext} from "react";
import { CurrentUserContext } from "./Main";
import { logout } from "../util/userUtil";

export default function NavBar() {
  const currentUser = useContext(CurrentUserContext);

  return(
    <div>
      <h2>{currentUser.username}</h2>
      <button type='submit' onClick={() => {
        logout()
        }}>Log Out</button>
    </div>
  )
}