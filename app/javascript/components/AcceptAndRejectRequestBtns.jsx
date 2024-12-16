import React from "react";
import { useContext } from "react";
import { LightDarkContext } from "./Main";
import { acceptBuddyRequest, rejectBuddyRequest } from "../util/requestUtil";
import * as THEMES from "../constants/THEMES";

export default function AcceptAndRejectRequestBtns(props) {
  const { requestId, resetUsersFetched } = props;
  const lightDarkTheme = useContext(LightDarkContext);

  const generateButtons = () => {
    const buttonCss = lightDarkTheme == THEMES.light ? 'request-btn' : 'request-btn request-btn-dark';
      return(
        <div className='accept-reject-btns-container'>
          <button className={`${buttonCss} accept-btn`} onClick={(e) => {
            e.preventDefault();
            acceptBuddyRequest(requestId).then(() => {
              resetUsersFetched();
            });
          }}>
            Accept
          </button>
          <button className={`${buttonCss} reject-btn`} onClick={(e) => {
            e.preventDefault();
            rejectBuddyRequest(requestId).then(() => {
              resetUsersFetched();
            });
          }}>
            Reject
          </button>
        </div>
      )
  };

  return(
    generateButtons()
  )
};