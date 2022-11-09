function getFormattedDate(date) {
  return `0${date?.$y}`.slice(-4) + "-" + `0${date?.$M + 1}`.slice(-2) + "-" + `0${date?.$D}`.slice(-2);
}
function getFormattedTime(time) {
  return `0${time?.$H}`.slice(-2) + ':' + `0${time?.$m}`.slice(-2) + ':' + `0${time?.$s}`.slice(-2);
}
export {
  getFormattedDate,
  getFormattedTime
};