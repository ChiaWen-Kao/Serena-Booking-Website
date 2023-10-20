/* 
  w3school: Create a dropdown menu by javascript
  https://www.w3schools.com/howto/howto_js_dropdown.asp
*/

function categorySearchDropdownMenu() {
  document.getElementById("activity-category").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('#category')) {
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
    Home: Search bar
    
    - Before turn to explore.html, the search bar in index.html will collect user's search conditions.
    - After collecting, it will list related activity in explore.html
*/

document.addEventListener("DOMContentLoaded", function() {
    
  const searchSubmit = document.getElementById("searchbar-submit");    // button
  
  searchSubmit.addEventListener("click", function() {

    // get condition value of search
    var searchKeyword = document.getElementById("keyword").value;    // name, description...
    var searchLocation = document.getElementById("activity-location").value;    // location
    var searchCategory = document.getElementById("category").value;    // event_type
    var searchDateTime = document.getElementById("activity-date").value;    // date_time

    // construct a parameter string
    var queryParams = {
        keyword: searchKeyword,
        location: searchLocation,
        category: searchCategory,
        dateTime:searchDateTime
    }
    const queryString = new URLSearchParams(queryParams).toString();
    const urlWithParams = "explore.html"+"?"+queryString;

    // pass parameter via url
    document.location.href = urlWithParams;
  });
});


/*
    Popular Activity: Display cards
*/

$(document).ready(function () {
  // pagination
  const cardPerPage = 4;
  const popularActivityCardContainer = document.querySelector(".flex-popular-activity-cards");    // create card in this container
  const nearbyActivityCardContainer = document.getElementById("flex-nearby-activity-cards");    // create card in this container
  const prevButton = document.getElementById("popular-activity-prev");    // previous button
  const nextButton = document.getElementById("popular-activity-next");    // next button
  let currentPage = 1;

  // fetch activity data from api
  const activityBaseURL = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community_events/";
  
  const my_website_code = 'Sereno'
  const queryParams = {
      website_code: my_website_code,
  }
  
  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = activityBaseURL+"?"+queryString;
  
  const requestOptions = {
      method: 'GET',
      redirect: 'follow'
  };

  fetch(urlWithParams, requestOptions)
    .then(response => response.json())
    .then(data => {

      // display cards for popular activity
      function displayPage(page) {
        popularActivityCardContainer.innerHTML = ``;    // clear cards in container
        const startIndex = (page - 1) * cardPerPage;
        const endIndex = startIndex + cardPerPage;

        for (let i = startIndex; i < endIndex; i++) {
          const cardData = data[i]
          const convertedDateTime = convertDateTimeFormat(cardData.date_time);
          const popularActivityCard = document.createElement("div");
          popularActivityCard.classList.add("activity-card");
          popularActivityCard.setAttribute("id", cardData.id);

          popularActivityCard.innerHTML = `
            <img class="activity-card-image ratio-image" src="${cardData.photo}" alt="clay-workshop" />
            <div class="activity-card-content">
              <h4>${cardData.name}</h4>
              <div class="row-content-icon-text">
                <i class="fa-solid fa-location-crosshairs fa-sm" style="color: #92a07e;"></i>
                <span>${cardData.location}</span>
              </div>
              <div class="row-content-icon-text">
                  <i class="fa-regular fa-clock fa-sm" style="color: #92a07e;"></i>
                  <span>${convertedDateTime}</span>
              </div>
              <span class="dark-button button-sm">${cardData.event_type}</span>
              <div class="row-content-price">
                <i class="fa-solid fa-star" style="color: #f5a400;"></i>
                <span style="font-size: small;">4.8(100)</span>
                <span class="price">AUD $85</span>
              </div>
            </div>
          `;              

          // card can be clicked and turn to the product detail page
          popularActivityCard.addEventListener("click", function() {
            linkToProductDetailPage(cardData.id);
          });

          // create card in the container
          popularActivityCardContainer.appendChild(popularActivityCard);

          // display today's nearby activity
          if ((convertDateTimeFormat(cardData.date_time) >= getCurrentTime()) && (cardData.location == "St. Lucia, Australia")) {
            const nearbyActivityCard = document.createElement("div");
            nearbyActivityCard.classList.add("nearby-activity-card", "mb-2");
            nearbyActivityCard.setAttribute("id", cardData.id);
            nearbyActivityCard.innerHTML = `
              <img class="rounded" src="${cardData.photo}" alt="${cardData.name}" />
              <div>
                <h4>${cardData.name}</h4>
                <div class="row-content-icon-text">
                  <i class="fa-regular fa-clock fa-sm" style="color: #92a07e;"></i>
                  <span>${cardData.location}</span>
                </div>
                <p>${cardData.description}</p>
              </div>
              <button class="dark-button" id="join" onclick="joinActivity()">Join</button>
              `;

              nearbyActivityCardContainer.appendChild(nearbyActivityCard);
          }
          
        }
      }

      // initialize pagination
      function initPagination() {
        
        const totalCards = data.length;
        const totalPages = Math.ceil(totalCards / cardPerPage);

        // disable or enable the previous and next buttons based on the current page
        function updateButtons() {

          if (currentPage == 1) {
              prevButton.setAttribute("disabled", true);
          } else if (currentPage == totalPages) {
              nextButton.setAttribute("disabled", true);
              prevButton.removeAttribute("disabled");
          } else {
              prevButton.removeAttribute("disabled");
              nextButton.removeAttribute("disabled");
          }
        }

        prevButton.addEventListener("click", function () {
          if (currentPage > 1){
              currentPage --;
              displayPage(currentPage);
              updateButtons();
          }
        });
        
        nextButton.addEventListener("click", function () {
          if (currentPage < totalPages) {
              currentPage++;
              displayPage(currentPage);
              updateButtons();
          }
        });

        displayPage(currentPage);
        updateButtons();
      }

      initPagination();
  });
});


/* 
    Comment 
*/

const commentBaseURL = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/comments/";

const getCommentsURL = `${commentBaseURL}?website_code=sereno`;
const getCommentsMethod = "GET";

fetch(getCommentsURL, {    // Fetch comment API
    method: getCommentsMethod,
})
  .then(response => response.json())
  .then(data => {

    const reviewCardContainer = document.querySelector(".flex-comment-cards");    // create card in this container
    
    data.forEach(item => {
        // Create card
      const reviewCard = document.createElement("div");
      reviewCard.classList.add("review-card");

      reviewCard.innerHTML = `
        <div class="row-content-icon-text">
          <div class="rounded-image">
            <!--
              Photo by Jake Nackos on Unsplash
              https://unsplash.com/photos/IF9TK5Uy-KI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
            -->
            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1961&q=80" alt="avatar" />
          </div>
          <h4 id="review-username">${item.username}</h4>
        </div>
        <div class="review-card-content">
          <i class="fa-solid fa-quote-left" style="color: #ffffff;"></i>
          <div>${item.comment}</div>
          <i class="fa-solid fa-quote-right" style="color: #ffffff;"></i>
        </div>
      `;

      // Create card in the container
      reviewCardContainer.appendChild(reviewCard);
    });
  });


/* 
  Dispaly Comment Modal
  https://www.w3schools.com/howto/howto_css_modals.asp
*/
displayCommentWindow = () => {
  // Get the modal
  var modal = document.getElementById("commentModal");

  // Get the button that opens the modal
  var btn = document.getElementById("add-comment");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal 
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    modal.style.display = "block";
  });

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

/*
  Add Comment
*/

// const commentForm = document.getElementById("comment")
// function submitForm(event){

//   //Preventing page refresh
//   event.preventDefault();
// }

// commentForm.addEventListener('submit', submitForm);

addComment = (event) => {

  // validate input
  const name = document.getElementById("comment-name");
  const content = document.getElementById("comment-content");
  const rate = document.getElementById("comment-rate");
  const commentInform = document.getElementById("comment-inform");
  commentInform.style.color = "red";
  commentInform.innerHTML = ``;

  if (isNaN(rate.value) || name.value.trim() === "") {
    commentInform.innerHTML = `Please enter number`;
  } else if (name == null) {
    commentInform.innerHTML = `Please enter your name`;
  } else if (content == null) {
    commentInform.innerHTML = `Please enter your comment`;
  } else {
    const baseURL = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/comments/";

    const postCommentURL = baseURL;
    const postCommentMethod = "POST";
    const postCommentHeaders = {
      'Content-Type': 'application/json'
    };

    const postCommentBody = JSON.stringify({
      username: name.value,
      comment: content.value,
      rating: rate.value,
      website_code: "sereno"
    });

    fetch(postCommentURL, {
      method: postCommentMethod,
      headers: postCommentHeaders,
      body: postCommentBody
    })

    .then(response => response.json())
    .then(data => {
      console.log(data)
      commentInform.style.color = "green";
      commentInform.innerHTML = "Comment successfully added!";
      sleep(4000);
      var modal = document.getElementById("commentModal");
      modal.style.display = "none";
    })
    .catch(error => {
      console.error("Error:", error);
      commentInform.innerHTML = "An error occurred while adding the comment.";

    });
  }
}


/* 
  Current Location (current location and nearby activity marks)
  https://www.w3schools.com/html/html5_geolocation.asp
*/

navigator.geolocation.getCurrentPosition(position => {
  const { latitude, longitude } = position.coords;
  
  // show a map centered at latitude / longitude
  const mapContainer = document.getElementById("map");    // create map in this container
  // if user didn't accept sharing location, default map will be shown.
  mapContainer.innerHTML = ``;
  mapContainer.innerHTML = `
    <iframe width="100%" height="450" style="border:0" allowfullscreen referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCIPd3N7noO3Mv0KFGY40KC2pvWX04oXjE&q=${latitude},${longitude}"></iframe>
  `;
});


/*
    Get current time
*/

function getCurrentTime() {
  let currentDateTime = new Date();

  return convertDateTimeFormat(currentDateTime);
}


/*
  See the detail page of activity
*/

function linkToProductDetailPage(activityId) {
  // construct a parameter string
  var queryParams = {
      activityId: activityId
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = "product.html"+"?"+queryString;
  
  // pass parameter via url
  document.location.href = urlWithParams;
}


alert("Welcome to share location with Sereno to see today's activity around you.");