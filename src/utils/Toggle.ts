import { Dispatch, SetStateAction } from "react";

export function toggleBooleanState(setState: Dispatch<SetStateAction<boolean>>) {
  setState((current) => !current);
}
