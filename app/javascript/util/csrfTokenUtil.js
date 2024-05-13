export const getCsrfToken = () => {
  if (document.querySelector("meta[name='csrf-token']")) {
    return document.querySelector("meta[name='csrf-token']").getAttribute("content");
  } else {
    return null;
  }
};