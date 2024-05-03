import React from "react";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "./Main";
import OpenChatroomButton from "./OpenChatroomButton";
import { useContext } from "react";

export default function UserList(props) {
  const [allUsers, setAllUsers] = useState([]);
  const [usersFetched, setUsersFetched] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const { changeChattingWithUser, refetchCurrentUser, changeCurrentChatroom } = props;

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
      currentUser.id !== user.id ? <OpenChatroomButton key={user.id} userInfo={user} changeChattingWithUser={changeChattingWithUser} refetchCurrentUser={refetchCurrentUser} changeCurrentChatroom={changeCurrentChatroom}/> : null
    ))

    return <ul className='user-list'>{userList}</ul>
  };

  if (allUsers != []) {
    return(
      <div className='userlist-sidebar'>
        <div className={currentUser.id}>
          <h3>{currentUser.username}</h3>
        </div>
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