const HOUR = 60 * 60 * 1000;

export const getDateTimeWithOffset = (
  offsetHours: number,
  dateObject: Date
): Date => {
  const offsetHoursInMs = offsetHours * 60 * 60 * 1000;
  const adjustedDateTime = dateObject.getTime() + offsetHoursInMs;
  const dateTimeWithOffset = new Date(adjustedDateTime);
  return dateTimeWithOffset;
};

export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

export const hoursDiff = (dateFrom: Date, dateTo: Date): number => {
  const hours = dateTo.getTime() - dateFrom.getTime();
  return Math.floor(hours/HOUR);
};
