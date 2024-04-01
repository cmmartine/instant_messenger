import React from "react";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "./Main";
import OpenChatroomButton from "./OpenChatroomButton";
import { useContext } from "react";

export default function UserList() {
  const [allUsers, setAllUsers] = useState([]);
  const [usersFetched, setUsersFetched] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (!usersFetched) {
      getUsers();
      setUsersFetched(true);
    };
  });

  function getUsers() {
    fetch('/users/index')
    .then((res) => res.json())
    .then((data) => {
      let userArray = [];
      data.map((user) => {
        userArray.push(user);
      });
      setAllUsers(userArray);
    });
  };

  const makeUserList = () => {
    const userList = allUsers.map((user) => (
      currentUser.id !== user.id ? <OpenChatroomButton userInfo={user}/> : null
    ))

    return <ul className='user-list'>{userList}</ul>
  };

  if (allUsers != []) {
    return(
      <div>
        <div className={currentUser.id}></div>
        {makeUserList()}
      </div>
    )
  } else {
    return(
      <div>
        Loading...
      </div>
    )
  }
}