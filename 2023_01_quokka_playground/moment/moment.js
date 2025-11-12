const moment = require('moment');

// let s  = moment().diff(1627000000000, 'minutes');

// console.log(s);

// let a = moment('0 mins', 'mm');
// console.log(a);


let b = '0 mins';
let numbers = b.match(/\d/g).join('');
console.log('numbers:', typeof numbers)

