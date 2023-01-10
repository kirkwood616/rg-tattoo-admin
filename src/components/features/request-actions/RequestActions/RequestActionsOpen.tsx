import GoButton from "components/ui/buttons/GoButton/GoButton";
import Error404 from "components/ui/errors/Error404/Error404";
import ActionContext from "context/ActionContext/ActionContext";
import { useContext, useEffect, useState } from "react";
import { ActionButtonsText, actionButtonsText, defaultButtonsText } from "utils/ActionHelpers";
import ActionModal from "./ActionModal";
import RejectModal from "./RejectModal";

function RequestActionsOpen() {
  const [buttonsText, setButtonsText] = useState<ActionButtonsText>(defaultButtonsText);
  const { actionState, dispatchIsActionActive, dispatchIsRejectActive } = useContext(ActionContext);

  useEffect(() => {
    if (!actionState.request) {
      return;
    } else {
      const textForButtons = actionButtonsText(actionState.request.requestStatus);
      setButtonsText(textForButtons);
    }
  }, [actionState.request]);

  if (!actionState.request) return <Error404 />;
  return (
    <div className="ReqActions" style={{ display: "flex", flexDirection: "column" }}>
      <GoButton text={buttonsText.actionText} cssClass="button_primary" onClick={dispatchIsActionActive} />
      <GoButton text={buttonsText.rejectText} cssClass="button_cancel" onClick={dispatchIsRejectActive} />
      {actionState.isActionActive && <ActionModal />}
      {actionState.isRejectActive && <RejectModal />}
    </div>
  );
}

export default RequestActionsOpen;
