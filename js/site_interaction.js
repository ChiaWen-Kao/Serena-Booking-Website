/*
  w3school: Create A Responsive Topnav
  https://www.w3schools.com/howto/howto_js_topnav_responsive.asp
*/

hamburgerMenu = () => {
  var x = document.getElementById("navbar");
  if (x.className === "flex-header-menu") {
    x.className += " responsive";
  } else {
    x.className = "flex-header-menu";
  }
}

convertDateTimeFormat = (dateTime) => {
  let objectDate = new Date(dateTime);

  // JavaScript returns a zero-based index for the month, meaning January is 0
  // add 1 to the month value, and both the day and hour values have two digits
  let day = objectDate.getDate().toString().padStart(2, '0');    
  let month = (objectDate.getMonth() + 1).toString().padStart(2, '0');
  let year = objectDate.getFullYear();
  let hour = objectDate.getHours().toString().padStart(2, '0');
  let minute = objectDate.getMinutes().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hour}:${minute}`;
}