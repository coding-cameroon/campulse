import {
  differenceInHours,
  differenceInMinutes,
  formatDistanceToNow,
} from "date-fns";

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

export const formatDate = (date: string | Date | number) => {
  return (
    formatDistanceToNow(new Date(date), {})
      .replace("about ", "")
      .replace("less than a minute", "1 min")
      .replace("minute", " min")
      .replace("hour", " hr") + " ago"
  );
};
