import React from "react";
import { useContext } from "react";
import { LightDarkContext } from "./Main";
import { THEMES } from "../constants/themes";
import { postNewRequest } from "../util/requestUtil";

export default function RequestBtn(props) {
  const { userId } = props;
  const lightDarkTheme = useContext(LightDarkContext);

  const sendNewRequest = () => {
    postNewRequest(userId);
  };

  // Chatbot does not need to be added as a buddy
  if (lightDarkTheme == THEMES.light && userId != 1) {
    return(
      <button className='request-btn' onClick={(e) => {
        e.preventDefault();
        sendNewRequest();
      }}>
        Add Buddy
      </button>
    )
  } else if (lightDarkTheme == THEMES.dark && userId != 1) {
    return(
      <button className='request-btn request-btn-dark' onClick={(e) => {
        e.preventDefault();
        sendNewRequest();
      }}>
        Add Buddy
      </button>
    )
  }
};