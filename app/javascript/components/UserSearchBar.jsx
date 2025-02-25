import React from "react";
import { useState, useContext } from "react";
import { LightDarkContext } from "./Main";
import * as THEMES from "../constants/THEMES";
import { searchUsers } from "../util/userUtil";
import UserSearchResultBox from "./UserSearchResultBox";

export default function UserSearchBar(props) {
  const { allBuddies } = props;
  const lightDarkTheme = useContext(LightDarkContext);
  const [searchValue, setSearchValue] = useState('');
  const [foundUsers, setFoundUsers] = useState([]);

  const searchAllUsers = async (value) => {
    const data = await searchUsers(value);
    setFoundUsers(data);
  };

  const resetFoundUsers = () => {
    setFoundUsers('');
  };

  if (lightDarkTheme == THEMES.light) {
    return(
      <div className='user-search-container'>
        <form className='user-searchbar' onSubmit={(e) => {
          e.preventDefault();
          if(searchValue !== '') {
            searchAllUsers(searchValue);
          };
        }}>
          <input type='search' id='search-input' className='search-input' onChange={(e) => {
            e.preventDefault();
            setSearchValue(e.target.value);
          }}/>
          <button type="submit" id='search-btn' className='search-btn'>Search</button>
        </form>
        <UserSearchResultBox foundUsers={foundUsers} resetFoundUsers={resetFoundUsers} allBuddies={allBuddies}/>
      </div>
    );
  } else if (lightDarkTheme == THEMES.dark) {
    return(
      <div className='user-search-container'>
        <form className='user-searchbar user-searchbar-dark' onSubmit={(e) => {
          e.preventDefault();
          if(searchValue !== '') {
            searchAllUsers(searchValue);
          };
        }}>
          <input type='search' className='search-input search-input-dark' onChange={(e) => {
            e.preventDefault();
            setSearchValue(e.target.value);
          }}/>
          <button type="submit" className='search-btn search-btn-dark'>Search</button>
        </form>
        <UserSearchResultBox foundUsers={foundUsers} resetFoundUsers={resetFoundUsers} allBuddies={allBuddies}/>
      </div>
    );
  }
}