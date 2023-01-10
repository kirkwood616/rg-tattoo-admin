import { add } from "date-fns";

// POPULATE TIMES BY INTERVAL (5, 10, 15, 30, etc. => endTime must be divisible by increment to startTime)
function adminTimePickerValues(startTime: string, endTime: string, interval: number): string[] | void {
  if (interval !== 5 && interval !== 10 && interval !== 15 && interval !== 30) return;
  let start: Date = new Date(`03/27/2022 ${startTime}`);
  const end: Date = new Date(`03/27/2022 ${endTime}`);
  const startLocale: string = start.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const endLocale: string = end.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  let timesArray: string[] = [startLocale];

  while (!timesArray.includes(endLocale)) {
    start = add(start, { minutes: interval });
    timesArray.push(start.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
  }
  return timesArray;
}

export const timePickerValues: string[] | void = adminTimePickerValues("12:00 PM", "8:00 PM", 15);

// TATTOO STYLES
export const tattooStyles: string[] = ["Linework", "Black and Gray", "Color", "Lettering"];

// BUDGET
export const budgetBrackets: string[] = ["$80 - $120", "$130 - $220", "$230 - $320", "$330 - $420", "$430+"];

// DEPOSIT
export const depositBaseValue: number = 50;

// REQUEST TYPES
export const requestTypes = [
  {
    name: "new",
    path: "new",
  },
  {
    name: "awaiting deposit",
    path: "awaiting-deposit",
  },
  {
    name: "deposit received",
    path: "deposit-received",
  },
  {
    name: "completed",
    path: "completed",
  },
  {
    name: "canceled",
    path: "canceled",
  },
  {
    name: "denied",
    path: "denied",
  },
];

// LOCALE
export const adminLocale: string = "en-Us";
export const adminLocaleTZ: string = "America/Detroit";
