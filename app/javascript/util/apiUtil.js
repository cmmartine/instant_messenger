export const apiGetFetch = async (url) => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`GET ${url} error: ${res.status}`);
    }

    const json = await res.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};