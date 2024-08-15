import React from "react";
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "./Main";
import OpenChatroomButton from "./OpenChatroomButton";
import UserMessageNotification from "./UserMessageNotification";
import LightDarkModeBtn from "./LightDarkModeBtn";
import UserSearchBar from "./UserSearchBar";
import { getUsers } from "../util/userUtil";
import { LightDarkContext } from "./Main";
import { THEMES } from "../constants/themes";

export default function UserList(props) {
  const [allUsers, setAllUsers] = useState([]);
  const [usersFetched, setUsersFetched] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const lightDarkTheme = useContext(LightDarkContext);
  const { changeChattingWithUser, refetchCurrentUser, changeLightDarkTheme } = props;

  useEffect(() => {
    if (!usersFetched) {
      getUsersForList();
      setUsersFetched(true);
    };
  });

  const makeUserList = () => {
    const userListCss = lightDarkTheme == THEMES.light ? 'userlist' : 'userlist userlist-dark';
    const userList = allUsers.map((user) => {
      if (currentUser.id !== user.id)
        return <div key={user.id} className='userlist-components'>
          <OpenChatroomButton userInfo={user} changeChattingWithUser={changeChattingWithUser} refetchCurrentUser={refetchCurrentUser}/>
          <UserMessageNotification userInfo={user}/>
        </div>
    })
    return <ul className={userListCss}>{userList}</ul>
  };

  const getUsersForList = () => {
    getUsers().then((data) => {
      let userArray = [];
      data.map((user) => {
        userArray.push(user);
      });
      setAllUsers(userArray);
    });
  };

  if (lightDarkTheme == THEMES.light) {
    if (allUsers != []) {
      return(
        <div className='userlist-sidebar'>
          <UserSearchBar />
          <div className='userlist-tab-container'>
            <h4 className='userlist-tab'>Buddies</h4>
            <h4 className='userlist-tab'>Requests</h4>
          </div>
          {makeUserList()}
          <LightDarkModeBtn changeLightDarkTheme={changeLightDarkTheme}/>
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
    if (allUsers != []) {
      return(
        <div className='userlist-sidebar userlist-sidebar-dark'>
          <UserSearchBar />
          <div className='userlist-tab-container'>
            <h4 className='userlist-tab userlist-tab-dark'>Buddies</h4>
            <h4 className='userlist-tab userlist-tab-dark'>Requests</h4>
          </div>
          {makeUserList()}
          <LightDarkModeBtn changeLightDarkTheme={changeLightDarkTheme}/>
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