import { getCsrfToken } from "./csrfTokenUtil";
import { apiGetFetch, apiPostFetch } from "./apiUtil";

export const getCurrentUserInfo =  () => {
  return apiGetFetch('/users/current_user_info');
};

export const getUsersBuddies = () => {
  return apiGetFetch('/users/buddies');
};

export const setTheme = () => {
  return apiGetFetch('/users/set_theme');
};

export const currentTheme = () => {
  return apiGetFetch('/users/current_theme');
};

export const searchUsers = (userInput) => {
  const postParams = {
    user: {
      user_search_input: userInput
    }
  };
  return apiPostFetch('/users/search', postParams);
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