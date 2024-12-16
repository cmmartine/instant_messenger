import React from "react";
import { useContext } from "react";
import { LightDarkContext } from "./Main";
import { setTheme } from "../util/userUtil";
import * as THEMES from "../constants/THEMES";

export default function LightDarkModeBtn(props) {
  const { changeLightDarkTheme } = props;
  const lightDarkTheme = useContext(LightDarkContext);

  if (lightDarkTheme == THEMES.light) {
    return(
      <div className='theme-btn change-to-dark-btn' onClick={(e) => {
        e.preventDefault();
        setTheme();
        changeLightDarkTheme();
      }}>{THEMES.lightIcon}</div>
    )
  } else if (lightDarkTheme == THEMES.dark) {
    return(
      <div className='theme-btn change-to-light-btn' onClick={(e) => {
        e.preventDefault();
        setTheme();
        changeLightDarkTheme();
      }}>{THEMES.darkIcon}</div>
    )
  }
};