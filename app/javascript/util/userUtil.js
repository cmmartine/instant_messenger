export const getCurrentUserInfo = (setCurrentUserInfo, openChatroomConnections) => {
  fetch('users/current_user_info')
    .then((res) => res.json())
    .then((data) => {
      let currentUserInfo = { ...data };
      setCurrentUserInfo(currentUserInfo);
      openChatroomConnections(currentUserInfo.chatrooms);
    })
};

export const getUsers = (setAllUsers) => {
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