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
    const activityImageContainer = document.getElementById("activity-main-photo");    // carousel image
    const activityDescriptionContainer = document.getElementById("activity-description");    // about this event
    const activityTitleContainer = document.getElementById("activity-title");    // activity title

    fetch(urlWithParams, requestOptions)
        .then(response => response.json())
        .then(data => {

            data.forEach(item => {

                // if user enter this page from navbar, it will list all activity
                if (item.id == urlParameters.activityId) {

                    // carsousel image
                    const activityImage = document.createElement("img");
                    activityImage.classList.add("rounded");
                    activityImage.setAttribute("src", item.photo);
                    activityImage.style.width = "100%";
                    activityImage.style.height = "auto";
                    
                    activityImageContainer.appendChild(activityImage);

                    // activity title
                    const activityTitle = document.createElement("activity-title");
                    activityTitle.innerHTML = `
                        ${item.name}
                    `;
                    activityTitleContainer.appendChild(activityTitle);


                    // about this event
                    const activityDescription = document.createElement("p");
                    activityDescription.innerHTML = `
                        ${item.description}
                    `;

                    activityDescriptionContainer.appendChild(activityDescription);

                };
            });
        });
});