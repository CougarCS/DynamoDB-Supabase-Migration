export const phoneNumberConversion = (old_number: string): null | number => {
  let phone_number_str = "";
  for (let i = 0; i < old_number.length; i++) {
    if ("0123456789".includes(old_number[i])) {
      phone_number_str = `${phone_number_str}${old_number[i]}`;
    }
  }
  return phone_number_str.length == 0 ? null : parseInt(phone_number_str);
};

export const membershipReasonConversion = (reason: string): string => {
  if (reason.toLowerCase().includes("stripe")) return "mc-ps";
  if (
    reason.toLowerCase().includes("officer") ||
    reason.toLowerCase().includes("president")
  )
    return "mc-io";
  if (reason.toLowerCase().includes("square")) return "mc-psq";
  if (reason.toLowerCase().includes("cash")) return "mc-pc";
  if (reason.toLowerCase().includes("venmo")) return "mc-pv";
  if (reason.toLowerCase().includes("codered")) return "mc-ico";
  if (reason.toLowerCase().includes("tutor")) return "mc-it";
  if (reason.toLowerCase().includes("involvement")) return "mc-i";
  return "mc-p";
};

export const semesterToTimestampTZ = (
  year: string,
  semester: string,
  side: "start" | "end"
): string => {
  if (semester === "Fall") {
    if (side === "start") {
      return `${year}-07-01 06:00:00`;
    }
    return `${parseInt(year) + 1}-01-01 06:00:00`;
  }
  if (side === "start") {
    return `${year}-01-01 06:00:00`;
  }
  return `${year}-07-01 06:00:00`;
};
