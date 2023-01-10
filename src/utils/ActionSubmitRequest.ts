import { ActionReducer } from "context/ActionContext/ActionReducer";
import { AppointmentRequest } from "models/AppointmentRequest";
import deepClone from "utils/DeepClone";

export default function actionSubmitRequest(state: ActionReducer): AppointmentRequest {
  if (!state.request) return {} as AppointmentRequest;

  let request: AppointmentRequest = deepClone(state.request);

  switch (request.requestStatus) {
    case "new":
      request.requestStatus = "awaiting-deposit";
      request.depositRequired = state.depositRequired!;
      request.historyLog = [
        ...request.historyLog,
        {
          dateCreated: new Date(),
          action: "Request Approved. Awaiting Deposit.",
          note: `$${state.depositRequired} deposit required.`,
        },
      ];
      break;
    case "awaiting-deposit":
      request.requestStatus = "deposit-received";
      request.depositAmmountReceived = state.depositReceived!;
      request.historyLog = [
        ...request.historyLog,
        {
          dateCreated: new Date(),
          action: "Deposit Received. Appointment Scheduled.",
          note: `$${state.depositReceived} deposit received.`,
        },
      ];
      break;
    case "deposit-received":
      request.requestStatus = "completed";
      request.priceCharged = state.priceCharged!;
      request.historyLog = [
        ...request.historyLog,
        { dateCreated: new Date(), action: "Appointment Completed.", note: `$${state.priceCharged} payment received.` },
      ];
      break;
  }
  return request;
}
