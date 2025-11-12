//Import the function initially
const { format } = require("date-fns");
const { zonedTimeToUtc } = require("date-fns-tz");

//today's date
format(new Date(), "dd.MM.yyyy");//?

// 1.  The reference - UTC or ISO date string represents a fixed point in time.
// 2.  Specific time zone - The time zone descriptor is usually offset or an IANA time zone name.

let timeZone = 'Europe/Paris';
const today = new Date();
const timeInBrisbane = zonedTimeToUtc(today, timeZone);//?
// Default time zone
format(today, 'yyy-MM-dd HH:mm:ss');//?
// Time in Paris
format(timeInBrisbane, 'yyy-MM-dd HH:mm:ss');//?

