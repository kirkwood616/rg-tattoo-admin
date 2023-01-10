import { AppointmentRequest } from "models/AppointmentRequest";
import {
  sendApprovedRequest,
  sendCanceledRequest,
  sendCompletedRequest,
  sendDeniedRequest,
  sendDepositReceivedRequest,
} from "services/AdminApiService";

/**
 * Conditional function that evaluates an AppointmentRequest object's `requestStatus` property,
 * which then returns an async API request sending the object to the backend for updating.
 *
 * `updatedRequest` needs to have it's `requestStatus` property set to
 * the correct status **_before_** being passed as a parameter.
 *
 * @param updatedRequest AppointmentRequest object
 * @returns Async API function sending the updated request to the backend.
 */
export default function requestApiCall(updatedRequest: AppointmentRequest) {
  switch (updatedRequest.requestStatus) {
    case "awaiting-deposit":
      return sendApprovedRequest(updatedRequest);
    case "deposit-received":
      return sendDepositReceivedRequest(updatedRequest);
    case "completed":
      return sendCompletedRequest(updatedRequest);
    case "denied":
      return sendDeniedRequest(updatedRequest);
    case "canceled":
      return sendCanceledRequest(updatedRequest);
  }
}
