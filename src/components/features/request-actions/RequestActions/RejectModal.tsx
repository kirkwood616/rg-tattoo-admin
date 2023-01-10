import * as ActionField from "components/features/request-actions/ActionFields";
import GoButton from "components/ui/buttons/GoButton/GoButton";
import Error404 from "components/ui/errors/Error404/Error404";
import AreYouSure from "components/ui/modals/AreYouSure/AreYouSure";
import ModalWindow from "components/ui/modals/ModalWindow/ModalWindow";
import ActionContext from "context/ActionContext/ActionContext";
import AppContext from "context/AppContext/AppContext";
import { AppointmentRequest } from "models/AppointmentRequest";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { rejectSubmitRequest } from "utils/RejectSubmitRequest";
import requestApiCall from "utils/RequestApiCall";
import { toggleBooleanState } from "utils/Toggle";

function RejectModal() {
  const [isSubmitActive, setIsSubmitActive] = useState<boolean>(false);
  const { toggleLoading, toggleModalOpen } = useContext(AppContext);
  const { actionState, dispatch, dispatchIsRejectActive } = useContext(ActionContext);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "hasErrors" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onClose() {
    toggleModalOpen();
    dispatch({ type: "resetWithState" });
  }

  function onRejectRequest(): void {
    if (!actionState.request) return;
    switch (actionState.request.requestStatus) {
      case "new":
      case "awaiting-deposit":
        if (!actionState.deniedReason) break;
        toggleBooleanState(setIsSubmitActive);
        break;
      case "deposit-received":
        if (!actionState.canceledReason) break;
        toggleBooleanState(setIsSubmitActive);
        break;
      default:
        break;
    }
  }

  async function handleRejectRequest(): Promise<void> {
    toggleLoading();
    try {
      if (!actionState.request) throw new Error("No Request");
      const updatedRequest: AppointmentRequest = rejectSubmitRequest(actionState);
      await requestApiCall(updatedRequest);
      dispatch({ type: "reset" });
      toggleModalOpen();
      navigate(`/admin/appointment-requests/${updatedRequest.requestStatus}/${updatedRequest._id}`);
    } catch (error) {
      console.error(error);
    } finally {
      toggleLoading();
    }
  }

  if (!actionState.request) return <Error404 />;
  return (
    <ModalWindow isActive={actionState.isRejectActive} setIsActive={dispatchIsRejectActive} isDispatch>
      {(actionState.request.requestStatus === "new" || actionState.request.requestStatus === "awaiting-deposit") && (
        <ActionField.RejectText title="DENY REQUEST" stateText={actionState.deniedReason} dispatchType="deniedReason" />
      )}

      {actionState.request.requestStatus === "deposit-received" && (
        <ActionField.RejectText
          title="CANCEL APPOINTMENT"
          stateText={actionState.canceledReason}
          dispatchType="canceledReason"
        />
      )}

      <GoButton text="SUBMIT" cssClass="button_primary" isDisabled={actionState.hasErrors} onClick={onRejectRequest} />
      <GoButton text="CLOSE WINDOW" cssClass="button_cancel" onClick={onClose} />

      {isSubmitActive && (
        <AreYouSure
          isActive={isSubmitActive}
          setIsActive={setIsSubmitActive}
          yesFunction={handleRejectRequest}
          yesButtonText={"YES"}
          subModal
        />
      )}
    </ModalWindow>
  );
}

export default RejectModal;
