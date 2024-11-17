import { produce } from "immer";
import { Action } from "../actions";
import { ActionType } from "../action-types";

interface BundleState {
  [key: string]: {
    loading: boolean;
    code: string;
    err: string;
  };
}

const initialState: BundleState = {};

const reducer = produce(
  (state: BundleState = initialState, action: Action): BundleState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        return state;

      case ActionType.BUNDLE_COMPLETE:
        return state;

      default:
        return state;
    }
  }
);
