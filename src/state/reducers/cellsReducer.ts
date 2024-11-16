import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

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

const reducer = (state = initialState, action: Action): CellsState => {
  switch (action.type) {
    case ActionType.MOVE_CELL:
      return state;

    case ActionType.DELETE_CELL:
      return state;

    case ActionType.UPDATE_CELL:
      return state;

    case ActionType.INSERT_CELL_BEFORE:
      return state;

    default:
      return state;
  }
};

export default reducer;
