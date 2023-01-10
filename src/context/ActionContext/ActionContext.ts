import { createContext, Dispatch } from "react";
import { ActionReducer, ActionReducerAction, initialActionState } from "./ActionReducer";

interface ActionContextModel {
  actionState: ActionReducer;
  dispatch: Dispatch<ActionReducerAction>;
  dispatchIsActionActive: () => void;
  dispatchIsRejectActive: () => void;
}

const defaultValue: ActionContextModel = {
  actionState: initialActionState,
  dispatch: () => {},
  dispatchIsActionActive: () => {},
  dispatchIsRejectActive: () => {},
};

const ActionContext = createContext(defaultValue);

export default ActionContext;
