import { ActionType } from "../action-types";
import {
  DeleteCellAction,
  Direction,
  InsertCellBeforeAction,
  MoveCellAction,
  UpdateCellAction,
  Action,
} from "../actions";
import { Cell, CellTypes } from "../cell";
import { Dispatch } from "redux";
import bundle from "../../bundler";
import localforage from "localforage";
import { RootState } from "../reducers";

const cellsState = localforage.createInstance({
  name: "cellsState",
});

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellBefore = (
  id: string | null,
  cellType: CellTypes,
  content: string
): InsertCellBeforeAction => {
  return {
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
      id,
      type: cellType,
      content: content,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: {
          code: result.code,
          err: result.err,
        },
      },
    });
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_CELLS });
    try {
      const cells: Cell[] = (await cellsState.getItem("cellsState")) || [];

      dispatch({ type: ActionType.FETCH_CELLS_COMPLETE, payload: cells });
    } catch (err: any) {
      dispatch({ type: ActionType.FETCH_CELLS_ERROR, payload: err.message });
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const { cells } = getState();
    const { data, order } = cells || {};

    const formattedCells = order?.map((id) => data && data[id]);

    try {
      await cellsState.setItem("cellsState", formattedCells);
    } catch (error: any) {
      dispatch({
        type: ActionType.SAVE_CELLS_ERROR,
        payload: error.mesage,
      });
    }
  };
};
