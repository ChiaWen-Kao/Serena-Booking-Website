displayFilter = () => {
  const filter = document.getElementById("mobile-filter");
  const floatBtn = document.getElementById("filter-btn");

  if (filter.style.display == "none") {
    filter.style.display = "grid";
    floatBtn.style.display = "none";
  } else {
    filter.style.display = "none";
  }
}

closeFilter = () => {
  const filter = document.getElementById("mobile-filter");
  const floatBtn = document.getElementById("filter-btn");
  filter.style.display = "none";
  floatBtn.style.display = "block";
}

/* 
  w3school: Create a dropdown menu by javascript
  https://www.w3schools.com/howto/howto_js_dropdown.asp
*/

function categorySearchDropdownMenu() {
  document.getElementById("activity-order").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches("#order")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

/* 
    Explore: display the result of activity
    
    - Display the result of user's condition search from home page.
*/
document.addEventListener("DOMContentLoaded", function() {

  const url = window.location.href;
  var urlParameters = {};

  // check if user is from search bar of index.html, if not (i.e. from navbar), the url won't pass parameters,
  // so it doesn't need to split the url
  if (url.includes("?")) {
      var urlString = url.split("?")[1].split("&");    // return list
      
      for (let i = 0; i < urlString.length; i++) {
          let a = urlString[i].split("=");
          if (a[1] != "") {
              urlParameters[a[0]] = a[1].replace("+", " ").replace("%2C+", ", ");
          };
      }
  };

  console.log(urlParameters)

  // create condition for API
  var conditionString = "";
  for (let i = 0; i < Object.keys(urlParameters).length; i++) {
      if (Object.keys(urlParameters)[i] == "location") {
          console.log(urlParameters.location)
          conditionString += "item.location == urlParameters.location";
      } else if (Object.keys(urlParameters)[i] == "category") {
          conditionString += "item.event_type == urlParameters.category";
      } else if (Object.keys(urlParameters)[i] == "dateTime") {
          conditionString += "item.date_time == urlParameters.dateTime";
      };

      if (i != (Object.keys(urlParameters).length-1)) {
          conditionString += "&&";
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

  // create card in this container
  const activityResultContainer = document.getElementById("activity-list");

  fetch(urlWithParams, requestOptions)
      .then(response => response.json())
      .then(data => {

          data.forEach(item => {
              // if user enter this page from navbar, it will list all activity
              if (!conditionString || eval(conditionString)) {

                  const convertedDateTime = convertDateTimeFormat(item.date_time);
                  const activityCard = document.createElement("div");
                  activityCard.classList.add("col-12", "col-md-6", "col-lg-4", "d-inline", "h-center");
        
                  activityCard.innerHTML = `
                  <div class="grid-row m-0 activity-card" id=${item.id} style="width: 18rem; height: fit-content; box-shadow: "0px 8px 16px 0px rgba(161, 161, 161, 0.2)">
                    <div class="col-12 col-md-12 col-lg-12">
                      <div class="rounded mb-2" id="activity-card-image" style="height: 200px; overflow: hidden;">
                        <img class="ratio-image" src="${item.photo}" style="width:100%;">
                      </div>
                      <div class="col-12 col-md-12 col-lg-12 p-1 card-title">${item.name}</div>
                      <div class="col-12 col-md-12 col-lg-12 p-1">
                        <i class="fa-solid fa-location-dot pe-1" style="color: #959595;"></i>
                        <span class="light-text font-sm" id="activity-location">${item.location}</span>
                      </div>
                      <div class="col-12 col-md-12 col-lg-12 p-1">
                        <i class="fa-solid fa-calendar-days pe-1" style="color: #959595;"></i>
                        <span class="light-text font-sm" id="activity-date">${convertedDateTime}</span>
                      </div>
                      <div class="col-12 col-md-12 col-lg-12 p-1">
                        <button class="dark-button button-sm">${item.event_type}</button>
                      </div>
                      <div class="grid-row m-0 p-1" style="height: 50px;">
                        <div class="col-6 col-md-6 col-lg-6 d-inline v-center h-start">
                          <i class="fa-solid fa-star" style="color: #f5a400;"></i>
                          <span class="light-text font-sm">4.8 (100)</span>
                        </div>
                        <div class="col-6 col-md-6 col-lg-6 d-inline v-center h-end">
                          <h2 style="color: var(--orange);">AU $85</h2>
                        </div>
                      </div>
                    </div>
                  `;

                  // count total record
                  resultCount++;

                  // card can be clicked and turn to the product detail page
                  activityCard.addEventListener("click", function() {
                    linkToProductDetailPage(item.id);
                  });

                  // create card in the container
                  activityResultContainer.appendChild(activityCard);

              }
          })

          // display total record which are match user's condition
          const totalRecordContainer = document.getElementById("result-total-record");    // create container of total record
          const totalRecord = document.createElement("span");
          totalRecord.innerHTML = `
              ${resultCount} results
          `;
          totalRecordContainer.appendChild(totalRecord);
      });    
});


function linkToProductDetailPage(activityId) {
  /*
      Parameters:
          1. activityId (int): activity id on api.
  */

  // construct a parameter string
  var queryParams = {
      activityId: activityId
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = "product.html"+"?"+queryString;
  
  // pass parameter via url
  document.location.href = urlWithParams;
}


