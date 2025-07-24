import React from "react";
import { useContext } from "react";
import { LightDarkContext } from "./ContextProviderWrapper";
import { setTheme } from "../util/userUtil";
import { THEMES, THEMEICONS } from "../constants_ts/THEMES";
import { ThemeIcons } from "../types/interfaces";

export default function LightDarkModeBtn(props) {
  const { lightOrDark, setLightOrDark } = props;
  const lightDarkTheme = useContext(LightDarkContext);

  const isDarkTheme = lightDarkTheme === THEMES.dark;
  const buttonClass = isDarkTheme ? 'theme-btn change-to-light-btn' : 'theme-btn change-to-dark-btn';
  const icon: ThemeIcons = isDarkTheme ? THEMEICONS.dark : THEMEICONS.light;

  function changeLightDarkTheme() {
    const body = document.body;
    if (lightOrDark == THEMES.light) {
      setLightOrDark(THEMES.dark)
      body.classList.add('body-dark');
    } else {
      setLightOrDark(THEMES.light);
      body.classList.remove('body-dark');
    }
  };

  return(
    <div className={buttonClass} data-testid='theme-btn' onClick={(e) => {
      e.preventDefault();
      setTheme();
      changeLightDarkTheme();
    }}>{icon}</div>
  )
};