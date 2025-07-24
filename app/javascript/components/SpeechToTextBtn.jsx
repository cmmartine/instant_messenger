import React from "react";
import { useContext } from "react";
import { LightDarkContext } from "./ContextProviderWrapper";
import { THEMES } from "../constants_ts/THEMES";

export default function SpeechToTextBtn(props) {
  const { setNewMessage, localStorageKey } = props;
  const lightDarkTheme = useContext(LightDarkContext);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    let textArea = document.getElementById('message-box-text');
    textArea.value = transcript;
    localStorage.setItem(localStorageKey, transcript);
    setNewMessage(transcript);
  };

  if (lightDarkTheme == THEMES.light) {
    return(
      <button id='record-button' onClick={(e) => {
        e.preventDefault();
        recognition.start();
      }}></button>
    )
  } else if (lightDarkTheme == THEMES.dark) {
    return(
      <button id='record-button' className='record-button-dark' onClick={(e) => {
        e.preventDefault();
        recognition.start();
      }}></button>
    )
  }
};