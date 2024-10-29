import { getCsrfToken } from "./csrfTokenUtil";

export const getCurrentUserInfo = () => {
  return fetch('/users/current_user_info')
  .then((res) => res.json())
  .then((data) => {
    return data;
  });
};

export const getUsersBuddies = () => {
  return fetch('/users/buddies')
  .then((res) => res.json())
  .then((data) => {
    return data;
  });
};

export const setTheme = () => {
  fetch('/users/set_theme')
};

export const currentTheme = () => {
  return fetch('/users/current_theme')
  .then((res) => res.json())
  .then((data) => {
    return data;
  });
};

export const searchUsers = (userInput) => {
  let csrf = getCsrfToken();
  return fetch('/users/search', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'X-CSRF-Token': csrf,
    },
    body: 
      JSON.stringify({user: {
        user_search_input: userInput
      }})
    }
  ).then((res) => {
    return res.json();
  }).then((data) => {
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
    localStorage.clear();
    location.reload();
  });
};