// https://javascript.info/date#creation

// Creation
let date = new Date();//?

const f = new Date(date).toISOString().slice(0, 10);//? 


//////////////////////////////////////////////////
// BASIC
//////////////////////////////////////////////////

// The getFullYear() method returns the year of the specified date according to local time.
date.getFullYear();//?

// The getMonth() method returns the month in the specified date according to local time, as a zero-based value (where zero indicates the first month of the year).
date.getMonth();//?

// The getDate() method returns the day of the month for the specified date according to local time.
date.getDate();//?

// The getDay() method returns the day of the week for the specified date according to local time, where 0 represents Sunday.
date.getDay();//?

// The getHours() method returns the hour for the specified date, according to local time.
date.getHours();//?

// The getMinutes() method returns the minutes in the specified date according to local time.
date.getMinutes();//?

// The getSeconds() method returns the seconds in the specified date according to local time.
date.getSeconds();//?

// The getMilliseconds() method returns the milliseconds in the specified date according to local time.
date.getMilliseconds();//?

// Returns the timestamp for the date – a number of milliseconds passed from the January 1st of 1970 UTC+0.
date.getTime();//?

// Returns the difference between UTC and the local time zone, in minutes:
date.getTimezoneOffset();//?



//////////////////////////////////////////////////
// UTC
//////////////////////////////////////////////////

// The getUTCDate() method returns the day of the month(from 1 to 31) in the specified date according to universal time.
date.getUTCDate();//?

// The getUTCDay() method returns the day of the week in the specified date according to universal time, where 0 represents Sunday.
date.getUTCDay();//?

// The getUTCFullYear() method returns the year in the specified date according to universal time.
date.getUTCFullYear();//?

// The getUTCHours() method returns the hours in the specified date according to universal time.
date.getUTCHours();//?

// The getUTCMilliseconds() method returns the milliseconds portion of the time object's value according to universal time.
date.getUTCMilliseconds();//?

// The getUTCMinutes() method returns the minutes in the specified date according to universal time.
date.getUTCMinutes();//?

// The getUTCMonth() returns the month of the specified date according to universal time, as a zero-based value (where zero indicates the first month of the year).
date.getUTCMonth();//?

// The getUTCSeconds() method returns the seconds in the specified date according to universal time.
date.getUTCSeconds();//?



//////////////////////////////////////////////////
// to String
//////////////////////////////////////////////////





//////////////////////////////////////////////////
// MISC
//////////////////////////////////////////////////

//The toDateString() method returns the date portion of a Date object in English in the following format separated by spaces:
// First three letters of the week day name
// First three letters of the month name
// Two digit day of the month, padded on the left a zero if necessary
// Four digit year (at least), padded on the left with zeros if necessary
// E.g. "Thu Jan 01 1970".
date.toString();//?

date.toDateString();//?
date.toJSON();//?

// The toLocaleString() method returns a string with a language sensitive representation of this date.
date.toLocaleString();//?

// The toLocaleDateString() method returns a string with a language sensitive representation of the date portion of the specified date in the user agent's timezone.
date.toLocaleDateString();//?
date.toLocaleTimeString();//?
date.toTimeString();//?

// The toISOString() method returns a string in simplified extended ISO format (ISO 8601), which is always 24 or 27 characters long (YYYY-MM-DDTHH:mm:ss.sssZ 
// or ±YYYYYY-MM-DDTHH:mm:ss.sssZ, respectively). The timezone is always zero UTC offset, as denoted by the suffix "Z".
date.toISOString();//?


//////////////////////////////////////////////////
// DATE OBJECT
//////////////////////////////////////////////////

// The static Date.now() method returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.
Date.now();//?

// The Date.UTC() method accepts parameters similar to the Date constructor, but treats them as UTC. It returns the number of milliseconds since January 1, 1970, 00:00:00 UTC.
Date.UTC(1970, 0, 1);//?
Date(Date.UTC(96, 1, 2, 3, 4, 5)); //?



//////////////////////////////////////////////////
// UTILITY
//////////////////////////////////////////////////


// Create date from Jan 1, 1970. 0 means 01.01.1970 UTC +0
new Date(0);//?

// Add 1 day to date
const date2 = new Date(date.setDate(date.getDate() + 1)).toISOString();//?
date2

const date3 = new Date(1643846400000);
date3


