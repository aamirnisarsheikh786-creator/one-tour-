// CREATE BACK BUTTON AUTOMATICALLY
function addBackButton() {

  const btn = document.createElement("div");
  btn.className = "ios-back-btn";

  btn.innerHTML = `<i class="fa-solid fa-chevron-left"></i>`;

  btn.onclick = function () {
    history.back(); // go previous page
  };

  document.body.appendChild(btn);
}

// AUTO RUN
window.addEventListener("DOMContentLoaded", addBackButton);