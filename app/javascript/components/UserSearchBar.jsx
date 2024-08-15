import React from "react";
import { useState, useContext } from "react";
import { LightDarkContext } from "./Main";
import { THEMES } from "../constants/themes";
import { searchUsers } from "../util/userUtil";
import UserSearchResultBox from "./UserSearchResultBox";

export default function UserSearchBar() {
  const lightDarkTheme = useContext(LightDarkContext);
  const [searchValue, setSearchValue] = useState('');
  const [foundUsers, setFoundUsers] = useState([]);

  const searchAllUsers = (value) => {
    searchUsers(value).then((data) => {
      setFoundUsers(data);
    });
  };

  if (lightDarkTheme == THEMES.light) {
    return(
      <div>
        <form className='user-searchbar' onSubmit={(e) => {
          e.preventDefault();
          if(searchValue !== '') {
            searchAllUsers(searchValue);
          };
        }}>
          <input type='search' onChange={(e) => {
            e.preventDefault();
            setSearchValue(e.target.value);
          }}/>
          <button type="submit">Search</button>
        </form>
        <UserSearchResultBox foundUsers={foundUsers}/>
      </div>
    );
  } else if (lightDarkTheme == THEMES.dark) {
    return(
      <div>
        <form className='user-searchbar user-searchbar-dark' onSubmit={(e) => {
          e.preventDefault();
          if(searchValue !== '') {
            searchAllUsers(searchValue);
          };
        }}>
          <input type='search' onChange={(e) => {
            e.preventDefault();
            setSearchValue(e.target.value);
          }}/>
          <button type="submit">Search</button>
        </form>
        <UserSearchResultBox foundUsers={foundUsers}/>
      </div>
    );
  }
}