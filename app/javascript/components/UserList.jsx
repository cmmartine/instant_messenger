import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "./Main";

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
      let userArray = []
      data.map((user) => {
        userArray.push(user);
      });
      setAllUsers(userArray);
    });
  };

  return(
    <div className='user-list'>
      <h3>Hello, {currentUser.username}</h3>
      {
        allUsers.map((user) => {
          return <div>{user.username}</div>
        })
      }
    </div>
  )
}