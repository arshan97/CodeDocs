import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";
import { produce } from "immer";

interface CellsState {
  loading: boolean;
  error: string | null;
  data: {
    [key: string]: Cell;
  };
  order: string[];
}

const initialState: CellsState = {
  loading: false,
  error: null,
  data: {},
  order: [],
};

const reducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.MOVE_CELL:
      return state;

    case ActionType.DELETE_CELL:
      return state;

    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;

      state.data[id].content = content;
      return;

    case ActionType.INSERT_CELL_BEFORE:
      return state;

    default:
      return state;
  }
});

export default reducer;
