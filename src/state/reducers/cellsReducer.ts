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
  return state;
};

export default reducer;
