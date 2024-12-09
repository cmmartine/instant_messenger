import { getCsrfToken } from "./csrfTokenUtil";
import { apiGetFetch } from "./apiUtil";

export const getCurrentUserInfo =  () => {
  return apiGetFetch('/users/current_user_info');
};

export const getUsersBuddies = () => {
  return apiGetFetch('/users/buddies');
};

export const setTheme = () => {
  return apiGetFetch('/users/set_theme')
};

export const currentTheme = () => {
  return apiGetFetch('/users/current_theme')
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