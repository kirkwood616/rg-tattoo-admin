import * as ActionField from "components/features/request-actions/ActionFields";
import GoButton from "components/ui/buttons/GoButton/GoButton";
import Error404 from "components/ui/errors/Error404/Error404";
import AreYouSure from "components/ui/modals/AreYouSure/AreYouSure";
import ModalWindow from "components/ui/modals/ModalWindow/ModalWindow";
import ActionContext from "context/ActionContext/ActionContext";
import AppContext from "context/AppContext/AppContext";
import { AppointmentRequest } from "models/AppointmentRequest";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import actionSubmitRequest from "utils/ActionSubmitRequest";
import requestApiCall from "utils/RequestApiCall";
import { toggleBooleanState } from "utils/Toggle";

function ActionModal() {
  const [isSubmitActive, setIsSubmitActive] = useState<boolean>(false);
  const { actionState, dispatch } = useContext(ActionContext);
  const { toggleLoading, isModalOpen, toggleModalOpen } = useContext(AppContext);
  const navigate = useNavigate();

  function onClose(): void {
    toggleModalOpen();
    dispatch({ type: "resetWithState" });
  }

  function onSubmit(): void {
    if (isModalOpen) {
      toggleBooleanState(setIsSubmitActive);
    } else {
      toggleModalOpen(setIsSubmitActive);
    }
  }

  async function handleSubmit(): Promise<void> {
    toggleLoading();
    try {
      if (!actionState.request) throw new Error("No Request");
      const updatedRequest: AppointmentRequest = actionSubmitRequest(actionState);
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
    <ModalWindow isActive={actionState.isActionActive} setIsActive={onClose} isDispatch>
      {actionState.request.requestStatus === "new" && (
        <ActionField.SubmitPrice
          title="APPROVE REQUEST"
          label="Deposit Ammount Required"
          statePrice={actionState.depositRequired}
          dispatchType="depositRequired"
        />
      )}

      {actionState.request.requestStatus === "awaiting-deposit" && (
        <ActionField.SubmitPrice
          title="DEPOSIT RECEIVED"
          label="Deposit Ammount Received"
          statePrice={actionState.depositReceived}
          dispatchType="depositReceived"
        />
      )}

      {actionState.request.requestStatus === "deposit-received" && (
        <ActionField.SubmitPrice
          title="APPOINTMENT COMPLETED"
          label="Price Charged"
          statePrice={actionState.priceCharged}
          dispatchType="priceCharged"
        />
      )}

      <GoButton text="SUBMIT" cssClass="button_primary" isDisabled={actionState.hasErrors} onClick={onSubmit} />
      <GoButton text="CLOSE WINDOW" cssClass="button_cancel" onClick={onClose} />

      {isSubmitActive && (
        <AreYouSure
          isActive={isSubmitActive}
          setIsActive={setIsSubmitActive}
          yesFunction={handleSubmit}
          yesButtonText="YES"
          subModal
        />
      )}
    </ModalWindow>
  );
}

export default ActionModal;
