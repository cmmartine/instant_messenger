import React from "react";
import { useContext } from "react";
import { LightDarkContext } from "./Main";
import { THEMES } from "../constants/themes";

export default function LightDarkModeBtn(props) {
  const { changeLightDarkTheme } = props;
  const lightDarkTheme = useContext(LightDarkContext);

  if (lightDarkTheme == THEMES.light) {
    return(
      <div className='change-to-dark-btn' onClick={(e) => {
        e.preventDefault();
        changeLightDarkTheme();
      }}>Sun</div>
    )
  } else if (lightDarkTheme == THEMES.dark) {
    return(
      <div className='change-to-light-btn' onClick={(e) => {
        e.preventDefault();
        changeLightDarkTheme();
      }}>Moon</div>
    )
  }
};