function showMessengerDetail() {
  const messengerListCard = document.querySelector(".messenger-detail");
  if (messengerListCard == null) {
    const flexMessengerContainer = document.querySelector(".flex-messenger");
    flexMessengerContainer.style.gridTemplateColumns = "25% 55% 20%";
    const messengerDetail = document.createElement("div");
    messengerDetail.classList.add("messenger-detail");

    messengerDetail.innerHTML = `
      <div class="rounded-image">
        <!--
          Photo by Mats Hagwall on Unsplash
          https://unsplash.com/photos/JL7z-PGJj4c?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
        -->
        <img src="https://images.unsplash.com/photo-1640623725972-a757223d6833?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1973" alt="claymate-haven-group-chat" />
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