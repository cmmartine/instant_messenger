import React from "react";
import { useContext, useEffect } from "react";
import RequestBtn from "./RequestBtn";
import { LightDarkContext } from "./Main";
import { THEMES } from "../constants/themes";

export default function UserSearchResultBox(props) {
  const { foundUsers, resetFoundUsers } = props;
  const lightDarkTheme = useContext(LightDarkContext);

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
        return <div key={user.id} className='user-search-list-components'>
          <div>{user.username}</div>
          <RequestBtn userId={user.id}/>
        </div>
    })
    return <ul className={userSearchListCss}>{userSearchList}</ul>
  };

  if (foundUsers.length > 0) {
    return(
      <div className='user-search-list-container'>
        {makeUserSearchList()}
      </div>
    )
  }
};