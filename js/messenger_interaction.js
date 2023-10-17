function showMessengerDetail() {
  const messengerListCard = document.querySelector(".messenger-detail");
  if (messengerListCard == null) {
    const flexMessengerContainer = document.querySelector(".flex-messenger");
    flexMessengerContainer.style.gridTemplateColumns = "25% 55% 20%";
    const messengerDetail = document.createElement("div");
    messengerDetail.classList.add("messenger-detail");

    messengerDetail.innerHTML = `
      <div class="rounded-image">
        <img src="media/group_image/claymate-haven.jpg" alt="claymate-haven-group-chat" />
      </div>
      <h3>Claymate Haven</h3>
      <div class="messenger-more-detail">
        <p>Member</p>
        <i class="fa-solid fa-chevron-right" style="color: #475936;"></i>
      </div>
      <div class="messenger-more-detail">
        <p>Detail</p>
        <i class="fa-solid fa-chevron-right" style="color: #475936;"></i>
      </div>
    `;

    flexMessengerContainer.appendChild(messengerDetail);
  };
}