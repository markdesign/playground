const { format } = require("date-fns");

const date = "2021-10-15T00:00:00.000";

const d = new Date(date);
const f = format(d, "yyyy-MM-dd");
f;

