/* 
    Home: Search bar
    
    - Before turn to all-activity.html, the search bar in index.html will collect user's search conditions.
    - After collecting, it will list related activity in all-activity.html
*/

document.addEventListener("DOMContentLoaded", function() {
    
    const searchSubmit = document.getElementById("searchbar-submit");    // button
    
    searchSubmit.addEventListener("click", function() {

        // get condition value of search
        var searchKeyword = document.getElementById("keyword-search").value;    // name, description...
        var searchLocation = document.getElementById("location").value;    // location
        var searchCategory = document.getElementById("advanced-search-category").value;    // event_type
        var searchDateTime = document.getElementById("activity-date").value;    // date_time

        // construct a string
        var queryParams = {
            keyword: searchKeyword,
            location: searchLocation,
            category: searchCategory,
            dateTime:searchDateTime
        }
        const queryString = new URLSearchParams(queryParams).toString();
        const urlWithParams = "all-activity.html"+"?"+queryString;

        // pass parameter via url
        document.location.href = urlWithParams;
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
        console.log(data)

        const reviewCardContainer = document.getElementById("review-card");    // create card in this container
        
        data.forEach(item => {
            // Create card
            const reviewCard = document.createElement("div");
            reviewCard.classList.add("card", "me-3", "review-background");
            reviewCard.style.width = "25rem";

            reviewCard.innerHTML = `
                <div class="card-body p-4">
                    <div class="row">
                        <div class="col-sm-2 ps-0">
                            <div class="rounded-image">
                                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1961&q=80" alt="avatar1" />
                            </div>
                        </div>
                        <div class="col-sm-10 d-flex align-items-center ps-0">
                            <h5 class="card-title mb-0" id="review-username">${item.username}</h5>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-sm-1 ps-0">
                            <img src="https://img.icons8.com/ios-glyphs/60/FFFFFF/quote-right.png" style="width: 100%; transform: rotate(180deg);" alt="quote-left" />
                        </div>
                        <div class="col-sm-10">
                            <p class="card-text">${item.comment}</p>
                        </div>
                        <div class="col-sm-1 d-flex align-items-end pe-0">
                            <img src="https://img.icons8.com/ios-glyphs/60/FFFFFF/quote-right.png" style="width: 100%;" alt="quote-right" />
                        </div>
                    </div>
                </div>
            `;

            // Create card in the container
            reviewCardContainer.appendChild(reviewCard);
        });
    });


/*
    Get Activity
*/
$(document).ready(function () {
    // pagination
    const cardPerPage = 4;
    const popularActivityCardContainer = document.getElementById("popular-activity-card");    // create card in this container
    const prevButton = document.getElementById("popular-activity-prev");    // previous button
    const nextButton = document.getElementById("popular-activity-next");    // next button
    let currentPage = 1;

    // fetch activity data from api
    const activityBaseURL = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community_events/";
    
    const my_website_code = 'pete123'
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

        console.log(data)

        // display cards for specific page
        function displayPage(page) {
            popularActivityCardContainer.innerHTML = "";    // clear cards in container
            const startIndex = (page - 1) * cardPerPage;
            const endIndex = startIndex + cardPerPage;

            for (let i = startIndex; i < endIndex; i++) {
                const cardData = data[i];
                const popularActivityCard = document.createElement("div");
                popularActivityCard.classList.add("card", "border-light", "p-1", "m-1");
                popularActivityCard.style.width = "20rem";

                popularActivityCard.innerHTML = `
                    <button type="button" class="wishlist" aria-label="add-wishlist"></button>
                    <span class="badge text-bg-warning text-center sale-label">Sale</span>
                    <img src="${cardData.photo}" class="img-fluid rounded card-img-top" alt="natural-meditation" />
                    <div class="card-body pb-2">
                        <h5 class="card-title">${cardData.name}</h5>
                        <div class="row mb-2">
                            <div class="col-md-2">
                            <img width="100%" src="https://img.icons8.com/ios/50/959595/navigation.png" alt="location"/>
                            </div>
                            <div class="col-sm-10 p-0">
                            <span class="text-muted fw-light">${cardData.location}</span>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-2">
                            <img width="100%" src="https://img.icons8.com/ios/50/959595/clock--v3.png" alt="time" />
                            </div>
                            <div class="col-md-10 p-0">
                            <span class="text-muted fw-light">${cardData.date_time}</span>
                            </div>
                        </div>
                        <a href="#" class="btn btn-primary" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">${cardData.event_type}</a>
                        <div class="row align-items-center mt-4">
                            <div class="col-md-2 pe-0">
                            <img width="70%" src="https://img.icons8.com/ios-filled/50/FFC500/star--v1.png" alt="star--v1"/>
                            </div>
                            <div class="col-md-4 ps-0">
                            <span>4.8</span>
                            <span>(100)</span>
                            </div>
                            <div class="col-md-6 text-end fw-bold fs-5" style="color: var(--orange);">AUD $85</div>
                        </div>
                    </div>
                `;

                // Create card in the container
                popularActivityCardContainer.appendChild(popularActivityCard);
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
    Current Location (current location and nearby activity marks)
*/
navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    console.log(latitude, longitude)
    
    // Show a map centered at latitude / longitude.
    const mapContainer = document.getElementById("map");    // create map in this container

    mapContainer.innerHTML = `
        <iframe width="100%" height="auto" style="border:0" allowfullscreen referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCIPd3N7noO3Mv0KFGY40KC2pvWX04oXjE&q=${latitude},${longitude}"></iframe>
    `;
});


/*
    all activity: total result records
*/
var resultRecord = 0;


/*
    all activity: sorted by
*/
// $(document).ready(function() {
//     const sorteddropdownMenu = document.getElementById("dropdown-menu-sorted");    // get the action value from this element
//     sorteddropdownMenu.addEventListener("click", function() {
        
//     })
// });
// var value = sorteddropdownMenu.value;
// console.log(value)