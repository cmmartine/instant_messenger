import React from "react";
import { useContext } from "react";
import { LightDarkContext } from "./Main";
import { THEMES } from "../constants/themes";

export default function UserSearchResultBox(props) {
  const { foundUsers } = props;
  const lightDarkTheme = useContext(LightDarkContext);
  
  const makeUserSearchList = () => {
    const userSearchListCss = lightDarkTheme == THEMES.light ? 'user-search-list' : 'user-search-list user-search-list-dark';
    const userSearchList = foundUsers.map((user) => {
        return <div key={user.id} className='user-search-list-components'>
          {user.username}
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
  } else {
    return(
      <div className='user-search-list-container'></div>
    )
  }
};