export function afterHourOrWeekend() {
  const now = new Date();
  const time = now.getHours();
  const day = now.getDay();

  if (time >= 17) {
    return "afterHour";
  }

  if (day === 0 || day === 6) {
    return "weekend";
  }
}
