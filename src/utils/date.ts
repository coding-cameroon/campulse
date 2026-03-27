import { differenceInHours, differenceInMinutes } from "date-fns";

export const getTimeLeft = (expiryDate: string | Date) => {
  const now = new Date();
  const expiry = new Date(expiryDate);

  const hoursLeft = differenceInHours(expiry, now);
  const minutesLeft = differenceInMinutes(expiry, now) % 60;

  if (hoursLeft > 0) {
    return `${hoursLeft}h left`;
  } else if (minutesLeft > 0) {
    return `${minutesLeft}m left`;
  } else {
    return "Expired";
  }
};
