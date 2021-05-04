import {
  BLOCKS_STATUS_FAILURE,
  BLOCKS_STATUS_START,
  BLOCKS_STATUS_SUCCESS,
} from "../constants/actionTypes";
import blocksReducer from "./blocks";

describe("Test the reducer for blocks", () => {
  test("should return the right state for failure action", () => {
    const blockStatusFailure = {
      type: BLOCKS_STATUS_FAILURE,
      url: "http://mgallegoa.github.io",
    };

    const reducer = blocksReducer(new Array(), blockStatusFailure);

    expect(reducer[0].isError).toBe(true);
  });

  test("should return the right state for start action", () => {
    const blockStatusStart = {
      type: BLOCKS_STATUS_START,
      url: "http://mgallegoa.github.io",
    };

    const reducer = blocksReducer(new Array(), blockStatusStart);

    expect(reducer[0].isLoading).toBe(true);
  });

  test("should return the right state for success action", () => {
    const blockStatusSuccess = {
      type: BLOCKS_STATUS_SUCCESS,
      url: "http://mgallegoa.github.io",
    };

    const reducer = blocksReducer(new Array(), blockStatusSuccess);

    expect(reducer[0].isLoading).toBe(false);
    expect(reducer[0].isError).toBe(false);
  });
});
