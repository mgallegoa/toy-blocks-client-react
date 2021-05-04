import {
  BLOCKS_STATUS_FAILURE,
  BLOCKS_STATUS_START,
  BLOCKS_STATUS_SUCCESS,
} from "../constants/actionTypes";
const blocksReducer = (state = new Array(), action) => {
  let blocksIndex;
  let blocks = new Array();
  switch (action.type) {
    case BLOCKS_STATUS_FAILURE:
      blocksIndex = state.findIndex((block) => block.url === action.url);
      if (blocksIndex >= 0) {
        blocks = [
          ...state.slice(0, blocksIndex),
          {
            ...state[blocksIndex],
            isLoading: false,
            isError: true,
            errorMessage: action.errorMessage,
          },
          ...state.slice(blocksIndex + 1),
        ];
      } else {
        let newBlock = {
          url: action.url,
          isLoading: false,
          isError: true,
        };
        blocks = [...state, newBlock];
      }
      return blocks;
    case BLOCKS_STATUS_SUCCESS:
      blocksIndex = state.findIndex((block) => block.url === action.url);
      if (blocksIndex >= 0) {
        blocks = [
          ...state.slice(0, blocksIndex),
          {
            ...state[blocksIndex],
            isLoading: false,
            isError: false,
            nodeBlocks: action.blocks.data,
          },
          ...state.slice(blocksIndex + 1),
        ];
      } else {
        let newBlock = {
          url: action.url,
          isLoading: false,
          isError: false,
        };
        blocks = [...state, newBlock];
      }
      return blocks;
    case BLOCKS_STATUS_START:
      blocksIndex = state.findIndex((block) => block.url === action.url);
      if (blocksIndex >= 0) {
        blocks = [
          ...state.slice(0, blocksIndex),
          {
            ...state[blocksIndex],
            isLoading: true,
            isError: false,
          },
          ...state.slice(blocksIndex + 1),
        ];
      } else {
        let newBlock = {
          url: action.url,
          isLoading: true,
          isError: false,
        };
        blocks = [...state, newBlock];
      }
      return blocks;
    default:
      return state;
  }
};

export default blocksReducer;

/*[
    {
        url,
        isLoading
        blocks
    }
    {
        url,
        blocks
    }
]*/
