export const checkCodeExpired = (timeSendCode: Date, timeExpired: number) => {
  return (
    timeSendCode.getTime() + timeExpired * 60 * 1000 < new Date().getTime()
  );
};
