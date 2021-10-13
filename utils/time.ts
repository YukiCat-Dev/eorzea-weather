export const getStartTime = (date: Date): Date => {
  const oneHour = 175 * 1000;
  const msec = date.getTime();
  const bell = (msec / oneHour) % 24;
  const startMsec = msec - Math.round(oneHour * bell);
  return new Date(startMsec);
};
export const EIGHT_HOURS = 8 * 175 * 1000;
export const ONE_DAY = EIGHT_HOURS * 3;
