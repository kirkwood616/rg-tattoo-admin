import axios from "axios";
import { getDownloadURL, ref, StorageReference } from "firebase/storage";
import { storage } from "firebaseConfig";
import { AppointmentRequest, PhotoUrls } from "models/AppointmentRequest";
import AvailableAppointments from "models/AvailableAppointments";
import admin from "./AdminInterceptor";

const apiBaseRoute = process.env.REACT_APP_API_BASE_ROUTE || "";

//// 1. AVAILABLE APPOINTMENTS
export async function postAvailableAppointment(appointment: AvailableAppointments): Promise<AvailableAppointments> {
  const res = await admin.post("/available-appointments/create", appointment);
  return res.data;
}

export async function updateAvailableAppointment(
  id: string,
  appointmentDateTimes: AvailableAppointments
): Promise<AvailableAppointments> {
  const res = await admin.put(`/available-appointments/update/${id}`, appointmentDateTimes);
  return res.data;
}

//// 2. APPOINTMENT REQUESTS
export async function getRequests(url: string): Promise<AppointmentRequest[] | void> {
  const res = await admin.get(url);
  return res.data;
}

export async function getRequest(url: string): Promise<AppointmentRequest | void> {
  const res = await admin.get(url);
  return res.data;
}

export async function sendApprovedRequest(request: AppointmentRequest) {
  const res = await admin.put(`appointment-requests/new/approve/${request._id}`, request);
  return res.data;
}

export async function sendDeniedRequest(request: AppointmentRequest) {
  const res = await admin.put(`appointment-requests/deny-request/${request._id}`, request);
  return res.data;
}

export async function sendDepositReceivedRequest(request: AppointmentRequest) {
  const res = await admin.put(`appointment-requests/awaiting-deposit/received/${request._id}`, request);
  return res.data;
}

export async function sendCompletedRequest(request: AppointmentRequest) {
  const res = await admin.put(`appointment-requests/deposit-received/completed/${request._id}`, request);
  return res.data;
}

export async function sendCanceledRequest(request: AppointmentRequest) {
  const res = await admin.put(`appointment-requests/cancel-request/${request._id}`, request);
  return res.data;
}

export async function updateOpenRequest(request: AppointmentRequest) {
  const res = await admin.put(`appointment-requests/update/${request._id}`, request);
  return res.data;
}

export async function updateClosedRequest(request: AppointmentRequest) {
  const res = await admin.put(`archive/update/${request._id}`, request);
  return res.data;
}

export async function fetchPhotoUrls(request: AppointmentRequest) {
  const referencePhotoRef: StorageReference = ref(storage, `images/${request.referencePhotoPath}`);
  const placementPhotoRef: StorageReference = ref(storage, `images/${request.placementPhotoPath}`);

  try {
    const referencePhotoURL = await getDownloadURL(referencePhotoRef);
    let placementPhotoURL = undefined;
    if (request.placementPhotoPath.length) {
      placementPhotoURL = await getDownloadURL(placementPhotoRef);
    }
    return { referencePhotoURL: referencePhotoURL, placementPhotoURL: placementPhotoURL } as PhotoUrls;
  } catch (error) {
    console.error(error);
  }
}

export async function getAvailableAppointments(url: string): Promise<AvailableAppointments[]> {
  const res = await axios.get(`${apiBaseRoute}/${url}`);
  return res.data;
}

export async function getSearch(url: string, keywords: string) {
  const res = await admin.get(url, { params: { keywords: keywords } });
  return res.data;
}

export async function getRequestStatusCounts(url: string) {
  const res = await admin.get(url);
  return res.data;
}
