/**
 * Formats the current browser path & parameters into a title to be displayed
 * within components. If no path or parameters in the route, it will return
 * a default title of `Home`.
 *
 * @param title Takes in a `string` or `undefined` route from the current browser
 * path. If `admin` is present in the path, it will be removed.
 *
 * @returns A `string` formatted with capitalization and removing of hyphens.
 *  If `undefined` is passed as a parameter, it will return `Home`.
 * @example formatRouteTitle("/admin/appointment-requests") // Returns "Appointment Requests"
 * @example formatRouteTitle(undefined) // Returns "Home"
 */
export function formatRouteTitle(title: string | undefined): string {
  if (title === undefined) {
    return "Home";
  } else if (title.includes("/admin/")) {
    return title.replace("/admin/", "") + title;
  } else if (title.includes("-")) {
    return (
      title[0].toUpperCase() +
      title
        .substring(1)
        .replace(/-[a-z]/g, (match) => match.toUpperCase())
        .replace("-", " ")
    );
  } else {
    return `${title[0].toUpperCase()}${title.substring(1)}`;
  }
}

/**
 * Formats a `Date` object or date-time `string` to US date format in the locale provided.
 *
 * The returned `string` will be in the format of MM/DD/YYYY.
 *
 * If the month has a leading the 0, it will be returned as M/DD/YYYY.
 *
 * @param date `Date` object or parsed date-time `string`. Date-time strings should be parsed to ISO or UTC. Preferred usage of `date.toLocaleString("en-US")` on a `Date` object.
 * @param localeTZ `string` of the user's locale timezone
 */
export function formatUnitedStatesDate(date: Date | string, localeTZ: string): string {
  const dateENUS = new Date(date).toLocaleDateString("en-US", {
    timeZone: localeTZ,
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  if (dateENUS[0] === "0") {
    return dateENUS.substring(1);
  } else {
    return dateENUS;
  }
}

/**
 * Formats a Date object or date-time string to US Eastern Standard Time to a string.
 *
 * The returned string will be in the format of MM/DD/YYYY (EST).
 *
 * If the month has a leading the 0, it will be returned as M/DD/YYYY (EST).
 *
 * @param date Date object or parsed date-time string. Date-time strings should be parsed to ISO or UTC. Preferred usage of `date.toLocaleString("en-US")` on a `Date` object.
 */
export function formatEstTime(date: Date | string): string {
  const estDate = new Date(date).toLocaleTimeString("en-US", {
    timeZone: "America/Detroit",
    hour: "2-digit",
    minute: "2-digit",
  });
  return estDate;
}

/**
 * Formats a Date object or date-time string to US Eastern Standard Time to a string with an `(EST)` suffix appended.
 *
 * The returned string will be in the format of HH:MM (EST).
 *
 * If the time has a leading the 0, it will be returned as H:MM (EST).
 *
 * @param date Date object or parsed date-time string. Date-time strings should be parsed to ISO or UTC. Preferred usage of `date.toLocaleString("en-US")` on a `Date` object.
 */
export function formatEstTimeWithSuffix(date: Date | string): string {
  const estDate = new Date(date).toLocaleTimeString("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
  // if (estDate[0] === "0") {
  //   return `${estDate.substring(1)} (EST)`;
  // } else {
  //   return estDate;
  // }
  return estDate;
}

/**
 * Formats a `Date` object or date-time `string` to a time `string` with the provided
 * locale appended to the end of the string in parenthesis.
 *
 * @param date `Date` object or date `string`
 * @param localeTZ `string` of user's locale
 * @returns `string` time formatted with locale in parenthesis
 */
export function formatZonedTime(date: Date | string, localeTZ: string) {
  const zonedTimeFull = new Date(date).toLocaleTimeString("en-US", {
    timeZone: localeTZ,
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
  const zonedTime = zonedTimeFull.slice(0, -3);
  const zonedSuffixAcronym = zonedTimeFull.slice(-3);
  const formattedTime = `${zonedTime}(${zonedSuffixAcronym})`;
  return formattedTime;
}

/**
 * Takes an ISO date `string` or `Date` object and returns a `string` in
 * `MM/dd/yyyy @ HH:mm AM/PM (locale)` format.
 *
 * If hours (HH) has a leading 0, it will be removed.
 * @param date `string` in ISO format | `Date` object
 * @param localeTZ `string` of user locale
 * @returns `string` formatted to `MM/dd/yyyy @ HH:mm AM/PM (locale)`
 */
export function formatISODateTime(date: string | Date, localeTZ: string): string {
  const dateString = typeof date === "string" ? date : date.toISOString();
  const dateFormat = formatUnitedStatesDate(dateString, localeTZ);
  let timeFormat = formatZonedTime(dateString, localeTZ);
  if (timeFormat[0] === "0") timeFormat = timeFormat.substring(1);
  const dateTimeFormat = `${dateFormat} @ ${timeFormat}`;
  return dateTimeFormat;
}

/**
 * Generates an acronym of locale timezone wrapped in parenthesis.
 *
 * @param localeTZ `string` of user's locale timezone
 * @returns `string` acronym of locale timezone wrapped in parenthesis
 */
export function localeTzAcronym(localeTZ: string) {
  const zonedTime = new Date().toLocaleTimeString("en-US", {
    timeZone: localeTZ,
    timeZoneName: "short",
  });
  const zoneAcronym = zonedTime.slice(-3);
  return `(${zoneAcronym})`;
}

/**
 *
 * @param dateString `string` of ISO date 2022-10-31
 * @returns `string` formatted into en-US date format 'MM/dd/yyyy'
 * @example '2022-10-31' => '10/31/2022'
 */
export function formatUsDate(dateString: string): string {
  const split = dateString.split("-");
  const formattedDate = [split[1], split[2], split[0]].join("/");
  return formattedDate;
}

/**
 *
 * @param time A `string` in HH:MM AM/PM format.
 * @returns A `string` without a leading 0, if present. If no leading 0 present,
 * the return will be the initial `time` parameter passed.
 * @example '09:30 AM' => '9:30 AM'
 * @example '10:30 PM' => '10:30 PM'
 */
export function formatTimeNoLeadingZero(time: string): string {
  if (Number(time[0]) > 0) return time;
  return time.substring(1);
}

/**
 *
 * @param time `string` in HH:MM AM/PM format.
 * @param localeTZ `string` of user's locale timezone
 * @returns `string` time format without a leading 0 (if present) with an acronym
 * of the locale timezone wrapped in parenthesis separated with a space.
 *
 * @example formatTimeWithZone('05:30 PM', 'America/Detroit') => '5:30 PM (EDT)'
 */
export function formatTimeWithZone(time: string, localeTZ: string): string {
  const timeFormat = formatTimeNoLeadingZero(time);
  const zoneFormat = localeTzAcronym(localeTZ);
  const formattedTime = `${timeFormat} ${zoneFormat}`;
  return formattedTime;
}

/**
 *
 * @param date A `string` in MM/DD/YYYY format.
 * @returns A `string` without a leading 0, if present. If no leading 0 present,
 * the return will be the initial `date` parameter passed.
 * @example 09/01/2022 => 9/01/2022
 * @example 10/01/2022 => 10/01/2022
 */
export function formatDateNoLeadingZero(date: string): string {
  if (Number(date[0]) > 0) return date;
  return date.substring(1);
}

/**
 *
 * @param filePath A filepath `string` from file upload
 * @returns A `string` with special characters removed & spaces replaced with underscores.
 * @example 'Bill & Ted.jpg' => 'Bill__Ted.jpg'
 * @example 'Fl!ck3r!ng .png ' => 'Flck3rng.png'
 */
export function formatFileName(filePath: string): string {
  const extension = filePath
    .substring(filePath.lastIndexOf(".") + 1)
    .replace(/[^a-zA-Z 0-9]+/g, "")
    .replace(" ", "_");
  const name = filePath.substring(0, filePath.lastIndexOf("."));
  const newName = name.replace(/[^a-zA-Z 0-9 _-]+/g, "").replace(/\s/g, "_");
  const formattedFileName = `${newName}.${extension}`;
  return formattedFileName;
}

/**
 *
 * @param state `RequestReducer` state object
 * @param photoType `PhotoType` ("reference" | "placement")
 * @returns A formatted `string` that will be used as the file name in storage & in the Request object.
 */
// export function formatPhotoPath(state: RequestReducer, photoType: PhotoType) {
//   const prefix = `${state.firstName.value}-${state.lastName.value}`;
//   switch (photoType) {
//     case "reference":
//       if (!state.referencePhoto.value) return "";
//       return `${prefix}-ref-${formatFileName(state.referencePhoto.value.name)}`;
//     case "placement":
//       if (!state.placementPhoto.value) return "";
//       return `${prefix}-place-${formatFileName(state.placementPhoto.value.name)}`;
//   }
// }

/**
 * Formats a string to lowercase and replaces any spaces, if present, with hyphens.
 * @param input `string`
 * @returns `string`
 * @example 'i LiKe ThE wAy YoU WoRk iT' => 'i-like-the-way-you-work-it'
 * 'NoDiGGITy' => 'nodiggity'
 */
export function formatLcHyphen(input: string) {
  let format = input.replace(/\s+/g, "-").toLowerCase();
  return format;
}

/**
 * Formats a string in camelCase to a string in Title Case.
 * @param input `string`
 * @returns `string`
 * @example 'camelCase' => 'Camel Case'
 */
export function formatCamelToTitle(input: string) {
  const text = input;
  const result = text.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
}
