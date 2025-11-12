let myDate = new Date('February 1, 2018 00:00:00');
myDate.getDate();//?

// set day
myDate.setDate(2);
myDate.getDate();//?

// shortcut
myDate.setDate(myDate.getDate() + 2);
myDate