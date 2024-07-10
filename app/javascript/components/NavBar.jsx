import React, { useContext} from "react";
import { CurrentUserContext } from "./Main";
import { logout } from "../util/userUtil";
import { LightDarkContext } from "./Main";
import { THEMES } from "../constants/themes";

export default function NavBar() {
  const currentUser = useContext(CurrentUserContext);
  const lightDarkTheme = useContext(LightDarkContext);

  if (lightDarkTheme == THEMES.light) {
    return(
      <div className='navbar-container'>
        <h2 className='navbar-username'>{currentUser.username}</h2>
        <button className='navbar-btn' type='submit' onClick={() => {
          logout()
          }}>Log Out</button>
      </div>
    );
  } else if (lightDarkTheme == THEMES.dark) {
    return(
      <div className='navbar-container navbar-container-dark'>
        <h2 className='navbar-username'>{currentUser.username}</h2>
        <button className='navbar-btn navbar-btn-dark' type='submit' onClick={() => {
          logout()
          }}>Log Out</button>
      </div>
    );
  }
}