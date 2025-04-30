import React from "react";
import { useContext } from "react";
import { LightDarkContext } from "./Main";
import { setTheme } from "../util/userUtil";
import * as THEMES from "../constants/THEMES";

export default function LightDarkModeBtn(props) {
  const { changeLightDarkTheme } = props;
  const lightDarkTheme = useContext(LightDarkContext);

  const isDarkTheme = lightDarkTheme === THEMES.dark;
  const buttonClass = isDarkTheme ? 'theme-btn change-to-light-btn' : 'theme-btn change-to-dark-btn';
  const icon = isDarkTheme ? THEMES.darkIcon : THEMES.lightIcon;

  return(
    <div className={buttonClass} onClick={(e) => {
      e.preventDefault();
      setTheme();
      changeLightDarkTheme();
    }}>{icon}</div>
  )
};