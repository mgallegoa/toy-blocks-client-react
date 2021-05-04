import {
  BLOCKS_STATUS_FAILURE,
  BLOCKS_STATUS_START,
  BLOCKS_STATUS_SUCCESS,
} from "../constants/actionTypes";

export const blocksStatusFailureAction = (url, errorMessage) => {
  return {
    type: BLOCKS_STATUS_FAILURE,
    url,
    errorMessage,
  };
};

export const blocksStatusSuccessAction = (url, blocks) => {
  return {
    type: BLOCKS_STATUS_SUCCESS,
    url,
    blocks,
  };
};

export const blocksStatusStartAction = (url) => {
  return {
    type: BLOCKS_STATUS_START,
    url,
  };
};
