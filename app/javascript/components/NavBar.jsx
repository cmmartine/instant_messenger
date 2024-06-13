import React, { useContext} from "react";
import { CurrentUserContext } from "./Main";
import { logout } from "../util/userUtil";

export default function NavBar() {
  const currentUser = useContext(CurrentUserContext);

  return(
    <div className='navbar-container'>
      <h2>{currentUser.username}</h2>
      <button className='navbar-btn' type='submit' onClick={() => {
        logout()
        }}>Log Out</button>
    </div>
  );
}