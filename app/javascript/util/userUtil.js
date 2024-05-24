import { getCsrfToken } from "./csrfTokenUtil";

export const getCurrentUserInfo = () => {
  return fetch('/users/current_user_info')
  .then((res) => res.json())
  .then((data) => {
    return data;
  });
};

export const getUsers = () => {
  return fetch('/users/index')
  .then((res) => res.json())
  .then((data) => {
    return data;
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