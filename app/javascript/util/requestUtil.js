import { apiGetFetch, apiPostFetch } from "./apiUtil";

export const postNewRequest = (userId) => {
  const postParams = {
    request: {
      user_id: userId
    }
  };

  return apiPostFetch('requests/create', postParams);
};

export const checkForPendingRequest = (userId) => {
  const postParams = {
    request: {
      user_id: userId
    }
  };

  return apiPostFetch('requests/pending_request', postParams);
};

export const getPendingReceivedRequests = () => {
  return apiGetFetch('requests/pending_received_requests');
};

export const acceptBuddyRequest = (requestId) => {
  const postParams = {
    request: {
      request_id: requestId
    }
  };

  return apiPostFetch('requests/accept', postParams);
};

export const rejectBuddyRequest = (requestId) => {
  const postParams = {
    request: {
      request_id: requestId
    }
  };

  return apiPostFetch('requests/reject', postParams);
};