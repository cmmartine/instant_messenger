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