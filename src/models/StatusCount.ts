import { RequestStatus } from "./AppointmentRequest";

export interface StatusCount {
  _id: RequestStatus;
  count: number;
}
