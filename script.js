const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const current_date = new Date();
const weekday = current_date.getDay();
console.log(weekday);

let month_name = document.querySelector("#month-name");
let show_btn = document.querySelector("#show-btn");
let popout = document.querySelector(".popout-bg");
let hide_btn = document.querySelector("#hide-btn");

month_name.textContent = MONTH_NAMES[current_date.getMonth()];

function showCalendar() {
  popout.style.display = "flex";
}

function hideCalendar() {
  popout.style.display = "none";
}

show_btn.addEventListener("click", showCalendar);
hide_btn.addEventListener("click", hideCalendar);
