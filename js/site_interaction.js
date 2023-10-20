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


/*
  Convert date time format (YYYY-MM-DD HOURS(24):MINUTES)
*/

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


/*
  Coding Nepal: Sleep
  https://www.codingnepalweb.com/create-email-checker-javascript/
*/
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


/*
  Validate input format
*/

subscribeNewsletter = () => {

  // validate email input format

  const subscribeForm = document.getElementById("newsletter");
  const emailInput = document.getElementById("subscribe-input").value;
  const subscribeValid = document.getElementById("news-letter-validation");

  subscribeValid.innerHTML = ``;
  
  if (emailInput.includes("@")) {
    subscribeValid.innerHTML = `Correct email format.`;

    // inform user successfully subscribe
    sleep(1000).then(() => {
      alert("Thanks for you subscribe, keep following our latest news!");    // inform user successfully subscribe
    });
  } else {
    subscribeValid.innerHTML = `Wrong email format.`;
  }
  
  subscribeForm.appendChild(subscribeValid);
}


/*
  Join activity: Inform user that they are successfully sign up for the activity.
  - This function will be used in index.html and product.html page.
*/

joinActivity = () => {

  alert("Thanks for join the activity! We already sign up for you.")
}