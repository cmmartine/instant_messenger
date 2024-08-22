import { getCsrfToken } from "./csrfTokenUtil";

export const postNewRequest = (userId) => {
  let csrf = getCsrfToken();
  fetch('requests/create', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'X-CSRF-Token': csrf,
    },
    body: 
      JSON.stringify({request: {
        user_id: userId
      }})
    }
  );
};