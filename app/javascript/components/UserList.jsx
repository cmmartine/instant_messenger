import React from "react";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "./Main";
import setupUserChatroomConsumers from "../channels/chatroom_channel";
import { useContext } from "react";

export default function UserList() {
  const [allUsers, setAllUsers] = useState([]);
  const [usersFetched, setUsersFetched] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);
  const [chatroomsFetched, setChatroomsFetched] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (!usersFetched) {
      getUsers();
      setUsersFetched(true);
    };
    if (!chatroomsFetched) {
      getCurrentUserChatrooms();
      setChatroomsFetched(true);
    }
    openChatroomConnections();
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

  function getCurrentUserChatrooms() {
    fetch('/users/current_users_chatrooms')
    .then((res) => res.json())
    .then((data) => {
      let roomArray = [];
      data.map((room) => {
        roomArray.push(room);
      });
      setChatrooms(roomArray);
    });
  };

  function openChatroomConnections() {
    if (chatrooms.length > 0) {
      chatrooms.forEach((room) => {
        console.log(room)
        setupUserChatroomConsumers(room);
      });
    }
  };

  const makeUserList = () => {
    const userList = allUsers.map((user) => (
      <div id={`user.${user.id}`}>
      <li key={user.id}>{user.username}</li>
      </div>
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