import React from "react";
import { useState, useContext } from "react";
import { LightDarkContext } from "./ContextProviderWrapper";
import { THEMES } from "../constants_ts/THEMES";
import { searchUsers } from "../util/userUtil";
import UserSearchResultBox from "./UserSearchResultBox";

export default function UserSearchBar(props) {
  const { allBuddies } = props;
  const lightDarkTheme = useContext(LightDarkContext);
  const [searchValue, setSearchValue] = useState('');
  const [foundUsers, setFoundUsers] = useState([]);

  const isDarkTheme = lightDarkTheme === THEMES.dark;
  const searchBarClass = isDarkTheme ? 'user-searchbar user-searchbar-dark' : 'user-searchbar';
  const inputClass = isDarkTheme ? 'search-input search-input-dark' : 'search-input';
  const buttonClass = isDarkTheme ? 'search-btn search-btn-dark' : 'search-btn';

  const searchAllUsers = async (value) => {
    const data = await searchUsers(value);
    setFoundUsers(data);
  };

  const resetFoundUsers = () => {
    setFoundUsers('');
  };

  return(
    <div className='user-search-container'>
      <form className={searchBarClass} onSubmit={(e) => {
        e.preventDefault();
        if(searchValue !== '') {
          searchAllUsers(searchValue);
        };
      }}>
        <input type='search' id='search-input' className={inputClass} onChange={(e) => {
          e.preventDefault();
          setSearchValue(e.target.value);
        }}/>
        <button type="submit" id='search-btn' className={buttonClass}>Search</button>
      </form>
      <UserSearchResultBox foundUsers={foundUsers} resetFoundUsers={resetFoundUsers} allBuddies={allBuddies}/>
    </div>
  );
}