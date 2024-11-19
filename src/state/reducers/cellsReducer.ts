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
    case ActionType.SAVE_CELLS_ERROR:
      state.error = action.payload;
      return state;

    case ActionType.FETCH_CELLS:
      state.loading = true;
      return state;

    case ActionType.FETCH_CELLS_COMPLETE:
      state.order = action.payload.map((cell) => cell.id);
      state.data = action.payload.reduce(
        (acc, cell) => {
          acc[cell.id] = cell;
          return acc;
        },
        {} as CellsState["data"]
      );

      return state;

    case ActionType.FETCH_CELLS_ERROR:
      state.loading = false;
      state.error = action.payload;
      return state;

    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const target = direction === "up" ? index - 1 : index + 1;

      if (target < 0 || target > state.order.length - 1) {
        return state;
      }

      state.order[index] = state.order[target];
      state.order[target] = action.payload.id;

      return state;

    case ActionType.DELETE_CELL:
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);
      return state;

    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;

      state.data[id].content = content;
      return state;

    case ActionType.INSERT_CELL_BEFORE:
      const cell: Cell = {
        id: randomId(),
        type: action.payload.type,
        content: "",
      };

      state.data[cell.id] = cell;

      const foundIndex = state.order.findIndex(
        (id) => id === action.payload.id
      );

      if (foundIndex < 0) {
        state.order.push(cell.id);
      } else {
        state.order.splice(foundIndex, 0, cell.id);
      }

      return state;

    default:
      return state;
  }
});

const randomId = () => {
  return Math.random().toString(36).substring(2, 7);
};

export default reducer;
