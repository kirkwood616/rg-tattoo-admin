import AppContext from "context/AppContext/AppContext";
import { ReactNode, useContext } from "react";
import { useImmerReducer } from "use-immer";
import ActionContext from "./ActionContext";
import { actionReducer, initialActionState } from "./ActionReducer";

interface Props {
  children: ReactNode;
}

function ActionContextProvider({ children }: Props) {
  const { toggleModalOpen } = useContext(AppContext);
  const [actionState, dispatch] = useImmerReducer(actionReducer, initialActionState);

  function dispatchIsActionActive() {
    dispatch({ type: "isActionActive" });
    toggleModalOpen();
  }

  function dispatchIsRejectActive() {
    dispatch({ type: "isRejectActive" });
    toggleModalOpen();
  }

  return (
    <ActionContext.Provider value={{ actionState, dispatch, dispatchIsActionActive, dispatchIsRejectActive }}>
      {children}
    </ActionContext.Provider>
  );
}

export default ActionContextProvider;
