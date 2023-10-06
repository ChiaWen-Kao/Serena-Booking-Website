/* 
    All Activity: display the result of activity
    
    - Display the result of user's condition search from home page.
*/

document.addEventListener("DOMContentLoaded", function() {

    const url = window.location.href;
    var urlParameters = {};
    var urlString = url.split("?")[1].split("&");    // return list
    for (let i = 0; i < urlString.length; i++) {
        let a = urlString[i].split("=");
        if (a[1] != "") {
            urlParameters[a[0]] = a[1].replace("+", " ");
        };
    };


    // create condition for API
    var conditionString = "";
    for (let i = 0; i < Object.keys(urlParameters).length; i++) {
        if (Object.keys(urlParameters)[i] == "location") {
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

    console.log(conditionString);

    // get activity from API
    const activityResultBaseURL = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community_events/";
    
    // query parameters
    const my_website_code = 'pete123';
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
                if (eval(conditionString)) {
                    
                    // create activity card
                    const activityResult = document.createElement("div");
                    activityResult.classList.add("card", "border-light", "p-1", "m-1");
                    activityResult.style.width = "20rem";

                    activityResult.innerHTML = `
                        <button type="button" class="wishlist" aria-label="add-wishlist"></button>
                        <span class="badge text-bg-warning text-center sale-label">Sale</span>
                        <img src="${item.photo}" class="img-fluid rounded card-img-top" alt="natural-meditation" />
                        <div class="card-body pb-2">
                            <h5 class="card-title">${item.name}</h5>
                            <div class="row mb-2">
                                <div class="col-md-2">
                                <img width="100%" src="https://img.icons8.com/ios/50/959595/navigation.png" alt="location"/>
                                </div>
                                <div class="col-sm-10 p-0">
                                <span class="text-muted fw-light">${item.location}</span>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-2">
                                <img width="100%" src="https://img.icons8.com/ios/50/959595/clock--v3.png" alt="time" />
                                </div>
                                <div class="col-md-10 p-0">
                                <span class="text-muted fw-light">${item.date_time}</span>
                                </div>
                            </div>
                            <a href="#" class="btn btn-primary" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">${item.event_type}</a>
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
                    
                    activityResultContainer.appendChild(activityResult);

                    // count total record
                    resultCount++;
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

