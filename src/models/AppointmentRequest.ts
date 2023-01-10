export interface AppointmentRequest {
  _id?: string;
  requestSubmittedDate: Date | string;
  requestDate: string;
  requestTime: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phoneNumber: string;
  tattooStyle: string;
  tattooPlacement: string;
  budget: string;
  referencePhotoPath: string;
  placementPhotoPath: string;
  tattooDescription: string;
  requestStatus: RequestStatus;
  depositRequired: number;
  depositAmmountReceived: number;
  deniedMessage?: string;
  isRequestClosed: boolean;
  priceCharged: number;
  refundAmmount?: number;
  historyLog: HistoryLogItem[];
}

export type RequestStatus = "new" | "awaiting-deposit" | "deposit-received" | "completed" | "canceled" | "denied";

export interface HistoryLogItem {
  dateCreated: Date | string;
  action?: HistoryAction;
  note?: string;
}

export type HistoryAction =
  | "New Appointment Request Submitted."
  | "Request Approved. Awaiting Deposit."
  | "Deposit Received. Appointment Scheduled."
  | "Appointment Completed."
  | "Appointment Canceled."
  | "Request Denied.";

export type PhotoType = "reference" | "placement";

export type PhotoName = "referencePhoto" | "placementPhoto";

export interface PhotoUrls {
  referencePhotoURL: string;
  placementPhotoURL: string | undefined;
}

export type OpenRequestStatus = "new" | "awaiting-deposit" | "deposit-received";

export type RejectType = "denied" | "canceled";

export type ActionType = "approve" | "reject";

export interface ActionInfo {
  approve: boolean;
  status: OpenRequestStatus;
}
