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

// Constants to keep track of current date:
const current = new Date();
const cur_weekday = current.getDay();
const cur_month = current.getMonth();
const cur_date = current.getDate();
const cur_year = current.getFullYear();
// Changeable display variables:
let display_month = cur_month;
let display_year = cur_year;
let temp_date;
let start_day;

// Get DOM elements:
let month_name = document.querySelector(".month-name");
let show_btn = document.querySelector(".show-btn");
let popout = document.querySelector(".popout-bg");
let hide_btn = document.querySelector(".hide-btn");
let next_btn = document.querySelector(".next-btn");
let prev_btn = document.querySelector(".prev-btn");
let calendar_grid = document.querySelector(".calendar-grid");

function findInitialStart() {
  start_day = cur_weekday;
  for (let i = 0; i < (cur_date % 7) - 1; i++) {
    if (start_day === 0) {
      // Loop around (sat -> sun):
      start_day = 6;
      continue;
    }
    start_day--;
  }
}

function nextMonth() {
  temp_date = 1;
  // Find new starting weekday:
  while (temp_date <= MONTH_DAYS[display_month]) {
    temp_date++;
    if (start_day === 6) {
      // Loop back to Sunday:
      start_day = 0;
    } else {
      start_day++;
    }
  }
  // Change display to next month:
  if (display_month === 11) {
    // Loop back to January and add one to year:
    display_month = 0;
    display_year++;
  } else {
    display_month++;
  }
  displayCalendar();
}

function previousMonth() {
  temp_date =
    display_month === 0 ? MONTH_DAYS[11] : MONTH_DAYS[display_month - 1];
  // Find new start day:
  while (temp_date >= 1) {
    temp_date--;
    if (start_day === 0) {
      // Loop to Saturday:
      start_day = 6;
    } else {
      start_day--;
    }
  }
  // Change display to previous month:
  if (display_month === 0) {
    // Loop to December:
    display_month = 11;
    // Subtract one from year:
    display_year--;
  } else {
    display_month--;
  }
  displayCalendar();
}

function showPopout() {
  // Reset display variables:
  display_month = cur_month;
  display_year = cur_year;
  findInitialStart();
  // Show the pop-out:
  popout.style.display = "flex";
  // Set up calendar:
  displayCalendar();
}

function hidePopout() {
  // Hide the pop-out:
  popout.style.display = "none";
}

function displayCalendar() {
  // Add month name and year:
  month_name.textContent = MONTH_NAMES[display_month] + " " + display_year;
  // Reset calendar:
  calendar_grid.innerHTML = "";
  // Add placeholders:
  for (let i = 0; i < start_day; i++) {
    calendar_grid.appendChild(document.createElement("div"));
  }
  // Add rest of the days:
  for (let i = 1; i <= MONTH_DAYS[display_month]; i++) {
    let date = document.createElement("div");
    date.classList = "cal-grid-date";
    date.textContent = i;
    if (
      cur_month === display_month &&
      cur_year === display_year &&
      i === cur_date
    ) {
      date.style.border = "2px solid black";
    }
    calendar_grid.appendChild(date);
  }
}

// Add event listeners on load:
show_btn.addEventListener("click", showPopout);
hide_btn.addEventListener("click", hidePopout);
next_btn.addEventListener("click", nextMonth);
prev_btn.addEventListener("click", previousMonth);
findInitialStart();
