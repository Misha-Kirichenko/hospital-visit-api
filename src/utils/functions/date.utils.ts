export const getDateTimeWithOffset = (
  offsetHours: number,
  dateObject: Date
): Date => {
  const offsetHoursInMs = offsetHours * 60 * 60 * 1000;
  const adjustedDateTime = dateObject.getTime() + offsetHoursInMs;
  const dateTimeWithOffset = new Date(adjustedDateTime);
  return dateTimeWithOffset;
};
