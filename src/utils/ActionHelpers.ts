import { RequestStatus } from "models/AppointmentRequest";

export interface ActionButtonsText {
  actionText: string;
  rejectText: string;
}

export const defaultButtonsText: ActionButtonsText = {
  actionText: "SUBMIT",
  rejectText: "CANCEL",
};

export function actionButtonsText(status: RequestStatus) {
  let buttonsText: ActionButtonsText = { ...defaultButtonsText };

  switch (status) {
    case "new":
      buttonsText = { actionText: "APPROVE", rejectText: "DENY" };
      break;
    case "awaiting-deposit":
      buttonsText = { actionText: "DEPOSIT RECEIVED", rejectText: "DENY" };
      break;
    case "deposit-received":
      buttonsText = { actionText: "APPOINTMENT COMPLETED", rejectText: "CANCEL APPOINTMENT" };
      break;
    default:
      break;
  }

  return buttonsText;
}
