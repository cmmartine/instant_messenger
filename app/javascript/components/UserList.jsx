import React from "react";
import { useState, useEffect } from "react";

export default function UserList() {
  const [allUsers, setAllUsers] = useState([]);
  const [usersFetched, setUsersFetched] = useState(false);

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
      {
        allUsers.map((user) => {
          return <div>{user.username}</div>
        })
      }
    </div>
  )
}