import React from "react";
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "./Main";
import NavBar from "./NavBar";
import OpenChatroomButton from "./OpenChatroomButton";
import UserMessageNotification from "./UserMessageNotification";
import LightDarkModeBtn from "./LightDarkModeBtn";
import UserSearchBar from "./UserSearchBar";
import AcceptAndRejectRequestBtns from "./AcceptAndRejectRequestBtns";
import { getUsersBuddies } from "../util/userUtil";
import { getPendingReceivedRequests } from "../util/requestUtil";
import { LightDarkContext } from "./Main";
import * as THEMES from "../constants/THEMES";
import * as LIST_TYPES from "../constants/LIST_TYPES";
import setupDraggingAndResizing from "../util/dragAndResize";

export default function UserList(props) {
  const [listType, setListType] = useState(LIST_TYPES.buddies);
  const [allBuddies, setAllBuddies] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [usersFetched, setUsersFetched] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const lightDarkTheme = useContext(LightDarkContext);
  const { changeChattingWithUser, refetchCurrentUser, changeLightDarkTheme } = props;

  useEffect(() => {
    const dataType='user-list';
    setupDraggingAndResizing(dataType);
    if (!usersFetched) {
      getUsersForList();
      getUsersPendingRequests();
      setUsersFetched(true);
    };
  });

  const renderList = () => {
    switch (listType) {
      case LIST_TYPES.buddies:
        return makeBuddyList();
      case LIST_TYPES.requests:
        return makePendingRequestList();
      default:
        return <div>Error, please reload the page</div>
    };
  };

  const makeBuddyList = () => {
    const userListCss = lightDarkTheme == THEMES.light ? 'userlist' : 'userlist userlist-dark';
    const userList = allBuddies.map((user) => {
      if (currentUser.id !== user.id)
        return <div key={user.id} className='userlist-components'>
          <OpenChatroomButton userInfo={user} changeChattingWithUser={changeChattingWithUser} refetchCurrentUser={refetchCurrentUser}/>
          <UserMessageNotification userInfo={user}/>
        </div>
    })
    return <ul className={userListCss} data-testid='buddy-list'>{userList}</ul>
  };

  const makePendingRequestList = () => {
    const userListCss = lightDarkTheme == THEMES.light ? 'userlist' : 'userlist userlist-dark';
    const userList = receivedRequests.map((request) => {
      return <div key={request.id} className='userlist-components'>
        <div>{request.username}</div> 
        <AcceptAndRejectRequestBtns requestId={request.id} resetUsersFetched={resetUsersFetched}/>
      </div>
    })
    
    return <ul className={userListCss} data-testid='requests-list'>{userList}</ul>
  };

  const getUsersForList = async () => {
    const buddyArray = await getUsersBuddies();
    setAllBuddies(buddyArray);
  };

  const getUsersPendingRequests = async () => {
    const requestArray = await getPendingReceivedRequests();
    setReceivedRequests(requestArray);
  };

  const resetUsersFetched = () => {
    setUsersFetched(false);
  };

  if (lightDarkTheme == THEMES.light) {
    if (allBuddies != []) {
      return(
        <div className='userlist-sidebar-container' data-draggable-user-list='true' data-resizable-user-list='true'>
          <div className='navbar-outer-container' data-drag-handle-user-list='true'>
            <NavBar/>
          </div>
          <div className='userlist-sidebar'>
            <UserSearchBar allBuddies={allBuddies}/>
            <div className='userlist-tab-container'>
              <h4 className='userlist-tab buddies-tab' data-testid='buddy-tab' onClick={() => setListType(LIST_TYPES.buddies)}>Buddies</h4>
              <h4 className='userlist-tab requests-tab' data-testid='requests-tab' onClick={() => setListType(LIST_TYPES.requests)}>Requests</h4>
            </div>
            {renderList()}
            <LightDarkModeBtn changeLightDarkTheme={changeLightDarkTheme}/>
          </div>
        </div>
      )
    } else {
      return(
        <div>
          Loading...
        </div>
      )
    };
  } else if (lightDarkTheme == THEMES.dark) {
    if (allBuddies != []) {
      return(
        <div className='userlist-sidebar-container' data-draggable-user-list='true' data-resizable-user-list='true'>
          <div className='navbar-outer-container' data-drag-handle-user-list='true'>
            <NavBar/>
          </div>
          <div className='userlist-sidebar userlist-sidebar-dark'>
            <UserSearchBar allBuddies={allBuddies}/>
            <div className='userlist-tab-container'>
              <h4 className='userlist-tab userlist-tab-dark buddies-tab' onClick={() => setListType(LIST_TYPES.buddies)}>Buddies</h4>
              <h4 className='userlist-tab userlist-tab-dark requests-tab' onClick={() => setListType(LIST_TYPES.requests)}>Requests</h4>
            </div>
            {renderList()}
            <LightDarkModeBtn changeLightDarkTheme={changeLightDarkTheme}/>
          </div>
        </div>
      )
    } else {
      return(
        <div>
          Loading...
        </div>
      )
    };
  }
}