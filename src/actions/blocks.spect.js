import {
  BLOCKS_STATUS_FAILURE,
  BLOCKS_STATUS_START,
  BLOCKS_STATUS_SUCCESS,
} from "../constants/actionTypes";
import {
  blocksStatusFailureAction,
  blocksStatusStartAction,
  blocksStatusSuccessAction,
} from "./blocks";

describe("Test for the Blocks actions.", () => {
  test("should return the failure action", () => {
    // give
    const blockStatusFailure = {
      type: BLOCKS_STATUS_FAILURE,
      url: "http://mgallegoa.github.io",
    };
    // then
    const returnedAction = blocksStatusFailureAction(
      "http://mgallegoa.github.io"
    );
    // expect
    expect(returnedAction).toEqual(blockStatusFailure);
  });

  test("should return the loading action", () => {
    const blockStatusStart = {
      type: BLOCKS_STATUS_SUCCESS,
      url: "http://mgallegoa.github.io",
    };
    const returnedAction = blocksStatusSuccessAction(
      "http://mgallegoa.github.io"
    );
    expect(returnedAction).toEqual(blockStatusStart);
  });
  test("should return the start action", () => {
    const blockStatusStart = {
      type: BLOCKS_STATUS_START,
      url: "http://mgallegoa.github.io",
    };
    const returnedAction = blocksStatusStartAction(
      "http://mgallegoa.github.io"
    );
    expect(returnedAction).toEqual(blockStatusStart);
  });
});
