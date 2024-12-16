import React from "react";
import { useState, useContext, useEffect } from "react";
import { LightDarkContext } from "./Main";
import * as THEMES from "../constants/THEMES";
import { postNewRequest, checkForPendingRequest } from "../util/requestUtil";

export default function RequestBtn(props) {
  const { userId } = props;
  const lightDarkTheme = useContext(LightDarkContext);
  const [pendingRequestStatus, setPendingRequestStatus] = useState(false);
  const [fetchedPendingStatus, setFetchedPendingStatus] = useState(false);

  useEffect(() => {
    checkRequests();
  }, []);

  const sendNewRequest = () => {
    postNewRequest(userId);
  };

  const checkRequests = async () => {
    const data = await checkForPendingRequest(userId)
    setPendingRequestStatus(data);
    setFetchedPendingStatus(true);
  };

  const selectBtn = () => {
    const buttonCss = lightDarkTheme == THEMES.light ? 'request-btn' : 'request-btn request-btn-dark';
    const buttonDisabled = pendingRequestStatus ? true : false;
    const buttonText = pendingRequestStatus ? 'Pending' : 'Add Buddy';
    if (fetchedPendingStatus) {
      return(
        <button className={buttonCss} disabled={buttonDisabled} onClick={(e) => {
          e.preventDefault();
          sendNewRequest();
        }}>
          {buttonText}
        </button>
      )
    }
  };

  return(
    selectBtn()
  )
};