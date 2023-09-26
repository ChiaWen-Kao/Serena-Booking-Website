/* Comment */
const baseURL = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/comments/";

const getCommentsURL = `${baseURL}?website_code=sereno`;
const getCommentsMethod = "GET";

// Fetch comment API
fetch(getCommentsURL, {
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
        