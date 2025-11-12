function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

let date = "2021-10-15T04:00:00.000";
let currentDate = new Date(date);
let regularDate = currentDate.toISOString();
console.log("getTime:", currentDate.getTime());
console.log("regularDate:", currentDate.getUTCHours());
console.log("regularDate:", formatAMPM(currentDate));
