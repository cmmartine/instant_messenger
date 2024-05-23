import { getCsrfToken } from "./csrfTokenUtil";

export const getCurrentUserInfo = (setCurrentUserInfo, openChatroomConnections, newCurrentChatroom= {id: null}) => {
  fetch('/users/current_user_info')
    .then((res) => res.json())
    .then((data) => {
      let currentUserInfo = { ...data };
      setCurrentUserInfo(currentUserInfo);
      openChatroomConnections(currentUserInfo.chatrooms, newCurrentChatroom);
    });
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

export const logout = () => {
  let csrf = getCsrfToken();
  fetch('/users/sign_out', {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      'X-CSRF-Token': csrf,
    }
  }).then(() => {
    location.reload();
  });
};