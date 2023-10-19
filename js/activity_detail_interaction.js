document.addEventListener("DOMContentLoaded", () => {

    const url = window.location.href;
    var urlParameters = {};

    // check if user is from search bar of index.html, if not (i.e. from navbar), the url won't pass parameters,
    // so it doesn't need to split the url
    if (url.includes("?")) {
        var urlString = url.split("?")[1].split("&");    // return list
        
        for (let i = 0; i < urlString.length; i++) {
            let a = urlString[i].split("=");
            if (a[1] !== "") {
                urlParameters[a[0]] = a[1].replace("+", " ");
            };
        }
    };

    // get activity from API
    const activityResultBaseURL = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community_events/";
    
    // query parameters
    const my_website_code = 'Sereno';
    const queryParams = {
        website_code: my_website_code
    };

    // url query string
    const queryString = new URLSearchParams(queryParams).toString();
    const urlWithParams = activityResultBaseURL+"?"+queryString;

    // request option
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    // count total records
    var resultCount = 0

    // create element in these containers
    
    fetch(urlWithParams, requestOptions)
    .then(response => response.json())
    .then(data => {
        
        data.forEach(item => {

            // if user enter this page from navbar, it will list all activity
            if (item.id == urlParameters.activityId) {

                // carsousel image
                const activityImageContainer = document.querySelectorAll(".activity-main-photo");    // multiple div need to show the same photo, pack all element as list
                const activityImage = document.createElement("img");
                activityImage.classList.add("rounded", "ratio-image", "h-100");
                activityImage.setAttribute("src", item.photo);

                activityImageContainer.forEach(container => {
                    container.appendChild(activityImage.cloneNode(true));    // copy its attribute to different elements
                });
                
                // navigation
                const navigationActivityTitleContainer = document.getElementById("navigation-activity-title")
                navigationActivityTitleContainer.innerHTML = item.name;

                // activity title
                const activityTitleContainer = document.getElementById("activity-title");
                activityTitleContainer.innerHTML = item.name
                    
                // activity location
                const activityLocationContainer = document.getElementById("activity-location");
                activityLocationContainer.innerHTML = item.location
                
                // activity date
                const activityDateContainer = document.getElementById("activity-date");
                activityDateContainer.innerHTML = convertDateTimeFormat(item.date_time);
                    
                // activity type
                const activityTypeContainer = document.getElementById("activity-type");
                activityTypeContainer.innerHTML = item.event_type;
                
                // about this event
                const activityDescriptionContainer = document.getElementById("activity-description");
                activityDescriptionContainer.innerHTML = item.description;
            };
        });
    });
});

/*
  Date Time Format
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