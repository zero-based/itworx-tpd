export function formatDate(date: Date): string {
  const month = "" + (date.getMonth() + 1);
  const day = "" + date.getDate();
  const year = date.getFullYear();

  const paddedMonth = month.length < 2 ? "0" + month : month;
  const paddedDay = day.length < 2 ? "0" + day : day;

  return [year, paddedMonth, paddedDay].join("-");
}
