import React, { useContext} from "react";
import { CurrentUserContext } from "./Main";
import { logout } from "../util/userUtil";
import { LightDarkContext } from "./Main";
import * as THEMES from "../constants/THEMES";

export default function NavBar() {
  const currentUser = useContext(CurrentUserContext);
  const lightDarkTheme = useContext(LightDarkContext);

  const isDarkTheme = lightDarkTheme === THEMES.dark;
  const navbarClass = isDarkTheme ? 'navbar-container navbar-container-dark' : 'navbar-container';
  const buttonClass = isDarkTheme ? 'navbar-btn navbar-btn-dark' : 'navbar-btn';

  return(
    <div className={navbarClass}>
      <h2 className='navbar-username'>{currentUser.username}</h2>
      <button className={buttonClass} type='submit' onClick={() => {
        logout()
        }}>Log Out</button>
    </div>
  );
}