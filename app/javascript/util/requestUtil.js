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

export const checkForPendingRequest = (userId) => {
  let csrf = getCsrfToken();
  return fetch('requests/pending_request', {
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
  )
  .then((res) => res.json())
  .then((data) => {
    return data;
  });
};

export const getPendingReceivedRequests = () => {
  return fetch('requests/pending_received_requests')
  .then((res) => res.json())
  .then((data) => {
    return data;
  });
};

export const acceptBuddyRequest = (requestId) => {
  let csrf = getCsrfToken();
  return fetch('requests/accept', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'X-CSRF-Token': csrf,
    },
    body: 
      JSON.stringify({request: {
        request_id: requestId
      }})
    }
  );
};

export const rejectBuddyRequest = (requestId) => {
  let csrf = getCsrfToken();
  return fetch('requests/reject', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'X-CSRF-Token': csrf,
    },
    body: 
      JSON.stringify({request: {
        request_id: requestId
      }})
    }
  );
};