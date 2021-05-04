import fetch from "cross-fetch";

export const getBlocksFromUrl = (url) => {
  return fetch(`${url}/api/v1/blocks`);
};
