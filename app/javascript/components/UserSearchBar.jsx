import React from "react";
import { useState, useContext } from "react";
import { LightDarkContext } from "./Main";
import { THEMES } from "../constants/themes";
import { searchUsers } from "../util/userUtil";

export default function UserSearchBar() {
  const lightDarkTheme = useContext(LightDarkContext);
  const [searchValue, setSearchValue] = useState('');

  const searchAllUsers = (value) => {
    searchUsers(value).then((data) => {
      console.log(data);
    });
  };

  if (lightDarkTheme == THEMES.light) {
    return(
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
    );
  } else if (lightDarkTheme == THEMES.dark) {
    return(
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
    );
  }
}