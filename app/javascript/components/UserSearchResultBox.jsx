import React from "react";
import { useContext, useEffect } from "react";
import RequestBtn from "./RequestBtn";
import { CurrentUserContext, LightDarkContext } from "./ContextProviderWrapper";
import * as THEMES from "../constants/THEMES";

export default function UserSearchResultBox(props) {
  const { foundUsers, resetFoundUsers, allBuddies } = props;
  const lightDarkTheme = useContext(LightDarkContext);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    const searchList = document.getElementsByClassName('user-search-list')[0];
    if (searchList) {
      let listPosition = findElementPosition(searchList);
      document.addEventListener('click', (e) => {closeResultBox(e, listPosition)});
    }
  }, [foundUsers]);

  const findElementPosition = (searchList) => {
    return searchList.getBoundingClientRect();
  };

  const closeResultBox = (e, listPosition) => {
    let posX = e.clientX;
    let posY = e.clientY;
    const posXOutOfBox = posX < listPosition.left || posX > listPosition.right;
    const posYOutofBox = posY < listPosition.top || posY > listPosition.bottom;
    if (posXOutOfBox || posYOutofBox) {
      resetFoundUsers();
    };
  };
  
  const makeUserSearchList = () => {
    const userSearchListCss = lightDarkTheme == THEMES.light ? 'user-search-list' : 'user-search-list user-search-list-dark';
    const userSearchList = foundUsers.map((user) => {
        if (!isUserTheChatbot(user) && !isUserTheCurrentUser(user)) {
          return <div key={user.id} className='user-search-list-components'>
            <div>{user.username}</div>
            {generateRequestButton(user)}
          </div>
        }
    })
    return <ul className={userSearchListCss}>{userSearchList}</ul>
  };

  const generateRequestButton = (user) => {
    return isUserAlreadyABuddy(user) ? null : <RequestBtn userId={user.id}/>;
  };

  const isUserAlreadyABuddy = (user) => {
    let isUserABuddy = false;
    allBuddies.forEach((buddy) => {
      if (buddy.id == user.id) {
        isUserABuddy = true
      };
    });

    return isUserABuddy;
  };

  const isUserTheChatbot = (user) => {
    return user.id == 1
  };

  const isUserTheCurrentUser = (user) => {
    return user.id == currentUser.id
  };

  if (foundUsers.length > 0) {
    return(
      <div className='user-search-list-container'>
        {makeUserSearchList()}
      </div>
    )
  }
};