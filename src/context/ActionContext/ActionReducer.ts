import { AppointmentRequest } from "models/AppointmentRequest";
import { depositBaseValue } from "settings/AdminSettings";
import deepClone from "utils/DeepClone";

export interface ActionReducer {
  request: AppointmentRequest | undefined;
  depositRequired: number | undefined;
  depositReceived: number | undefined;
  priceCharged: number | undefined;
  deniedReason: string | undefined;
  canceledReason: string | undefined;
  isActionActive: boolean;
  isRejectActive: boolean;
  hasErrors: boolean;
}

export const initialActionState: ActionReducer = {
  request: undefined,
  depositRequired: depositBaseValue,
  depositReceived: depositBaseValue,
  priceCharged: depositBaseValue,
  deniedReason: undefined,
  canceledReason: undefined,
  isActionActive: false,
  isRejectActive: false,
  hasErrors: false,
};

export type ActionReducerAction =
  | { type: "reset" }
  | { type: "resetWithState" }
  | { type: "hasErrors" }
  | { type: "request"; value: AppointmentRequest }
  | { type: "depositRequired"; value: number }
  | { type: "depositReceived"; value: number }
  | { type: "priceCharged"; value: number }
  | { type: "deniedReason"; value: string }
  | { type: "canceledReason"; value: string }
  | { type: "isActionActive" }
  | { type: "isRejectActive" };

export type PriceActionType = "depositRequired" | "depositReceived" | "priceCharged";

export type TextRejectType = "deniedReason" | "canceledReason";

export function actionReducer(state: ActionReducer, action: ActionReducerAction) {
  switch (action.type) {
    case "reset":
      return initialActionState;
    case "resetWithState":
      if (!state.request) return;
      return { ...initialActionState, request: state.request };
    case "hasErrors":
      state.hasErrors = !state.hasErrors;
      return;
    case "request":
      state.request = deepClone(action.value);
      if (state.request.depositRequired) {
        state.depositRequired = deepClone(state.request.depositRequired);
      }
      return;
    case "depositRequired":
      if (action.value === 0 || isNaN(action.value)) {
        state.depositRequired = 0;
        state.hasErrors = true;
      } else {
        state.depositRequired = action.value;
        state.hasErrors = false;
      }
      return;
    case "depositReceived":
      if (action.value === 0 || isNaN(action.value)) {
        state.depositReceived = 0;
        state.hasErrors = true;
      } else {
        state.depositReceived = action.value;
        state.hasErrors = false;
      }
      return;
    case "priceCharged":
      if (action.value === 0 || isNaN(action.value)) {
        state.priceCharged = 0;
        state.hasErrors = true;
      } else {
        state.priceCharged = action.value;
        state.hasErrors = false;
      }
      return;
    case "deniedReason":
      if (!action.value.length) {
        state.deniedReason = undefined;
        state.hasErrors = true;
      } else {
        state.deniedReason = action.value;
        state.hasErrors = false;
      }
      return;
    case "canceledReason":
      if (!action.value.length) {
        state.canceledReason = undefined;
        state.hasErrors = true;
      } else {
        state.canceledReason = action.value;
        state.hasErrors = false;
      }
      return;
    case "isActionActive":
      state.isActionActive = !state.isActionActive;
      return;
    case "isRejectActive":
      state.isRejectActive = !state.isRejectActive;
      return;
  }
}
