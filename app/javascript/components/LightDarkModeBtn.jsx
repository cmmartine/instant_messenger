import React from "react";
import { useContext } from "react";
import { LightDarkContext } from "./Main";
import { setTheme } from "../util/userUtil";
import { THEMES } from "../constants/themes";

export default function LightDarkModeBtn(props) {
  const { changeLightDarkTheme } = props;
  const lightDarkTheme = useContext(LightDarkContext);

  if (lightDarkTheme == THEMES.light) {
    return(
      <div className='theme-btn change-to-dark-btn' onClick={(e) => {
        e.preventDefault();
        setTheme();
        changeLightDarkTheme();
      }}>🔅</div>
    )
  } else if (lightDarkTheme == THEMES.dark) {
    return(
      <div className='theme-btn change-to-light-btn' onClick={(e) => {
        e.preventDefault();
        setTheme();
        changeLightDarkTheme();
      }}>🌙</div>
    )
  }
};