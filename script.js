const $hostname  = document.getElementById("hostname");
const $timezone  = document.getElementById("timezone");
const $date      = document.getElementById("date");
const $dayOfWeek = document.getElementById("dayOfWeek");
const $second    = document.getElementById("second");
const $minute    = document.getElementById("minute");
const $hour      = document.getElementById("hour");
const $meridiem  = document.getElementById("meridiem");
const monthString = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayString = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


//get the timezone
function getTimeZone() {
  const date = Date();
  let str = date.substring(date.search(/\(/), date.length);

  $timezone.innerHTML = str;
}

getTimeZone();


//get the hostname
function getCustomHostName() {
  let results = "";
  if (window.cookie) {
    let ck = window.cookie.split("; ");
    for (let cookie of ck) {
      let [key, value] = cookie.split("=");

      if (key == "hostname_custom") {
        result = value;
      }
    }
  }
  return results;
}

function resolveHostname() {
  const cookies = getCustomHostName();
  if (cookies) {
    $hostname.innerHTML = cookie;
  } else if (window.location.hostname) {
    $hostname.innerHTML = window.location.hostname;
  } else {
    $hostname.innerHTML = "The time is"
  }
}

resolveHostname();



//get the local time and date
function localDateTime() {
  const ddtt = new Date();
  $dayOfWeek.innerHTML = dayString[ddtt.getDay()];
  $date.innerHTML = `${monthString[ddtt.getMonth()]} ${ddtt.getDate()}, ${ddtt.getFullYear()} `; //date

  setInterval(() => {
    const $detoo = new Date();
    $second.innerHTML = $detoo.getSeconds();
    $hour.innerHTML = $detoo.getHours() % 12 || 12;
    $minute.innerHTML = $detoo.getMinutes();

    ($detoo.getHours() >= 12) ? $meridiem.innerHTML = "PM" : $meridiem.innerHTML = "AM";
  }, 1000);
}

localDateTime();
