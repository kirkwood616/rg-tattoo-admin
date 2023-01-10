import AvailableAppointments from "models/AvailableAppointments";

export function populateHighlights(available: AvailableAppointments[] | undefined) {
  if (!available) return;
  let highlightDates: Date[] = [];
  available.forEach((item) => {
    if (item.availableTimes.length) {
      highlightDates.push(new Date(item.date));
    }
  });
  return highlightDates;
}
