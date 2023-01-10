import { ActionReducer } from "context/ActionContext/ActionReducer";
import { AppointmentRequest } from "models/AppointmentRequest";
import deepClone from "utils/DeepClone";

export function rejectSubmitRequest(state: ActionReducer) {
  if (!state.request) return {} as AppointmentRequest;

  let request: AppointmentRequest = deepClone(state.request);

  switch (request.requestStatus) {
    case "new":
    case "awaiting-deposit":
      request.requestStatus = "denied";
      request.historyLog = [
        ...request.historyLog,
        {
          dateCreated: new Date(),
          action: "Request Denied.",
          note: state.deniedReason,
        },
      ];
      break;
    case "deposit-received":
      request.requestStatus = "canceled";
      request.historyLog = [
        ...request.historyLog,
        {
          dateCreated: new Date(),
          action: "Appointment Canceled.",
          note: state.canceledReason,
        },
      ];
      break;
  }
  return request;
}
