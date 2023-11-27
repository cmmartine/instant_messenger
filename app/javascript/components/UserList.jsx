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

  const makeUserList = () => {
    const userList = allUsers.map((user) => {
      return <li key={user.id}>{user.username}</li>
    })

    return <ul className='user-list'>{userList}</ul>
  }

  return(
    <div>
      {makeUserList()}
    </div>
  )
}