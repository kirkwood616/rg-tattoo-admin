import ActionContext from "context/ActionContext/ActionContext";
import { AppointmentRequest } from "models/AppointmentRequest";
import { useContext, useEffect } from "react";
import "./RequestActions.css";
import RequestActionsOpen from "./RequestActionsOpen";

interface Props {
  request: AppointmentRequest;
}

function RequestActions({ request }: Props) {
  const { dispatch } = useContext(ActionContext);

  useEffect(() => {
    dispatch({ type: "request", value: request });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch (request.requestStatus) {
    case "new":
    case "awaiting-deposit":
    case "deposit-received":
      return <RequestActionsOpen />;
    default:
      return <></>;
  }
}

export default RequestActions;
