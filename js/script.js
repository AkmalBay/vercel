
// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu diklik
document.querySelector("#hamburger-menu").onclick = (e) => {
  navbarNav.classList.toggle("active");
  e.preventDefault();
};

// toggle class active untuk search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// toogle class active untuk shopping cart
// const shoppingCart = document.querySelector(".shopping-cart");
// document.querySelector("#shopping-cart-button").onclick = (e) => {
//   shoppingCart.classList.toggle("active");
//   e.preventDefault();
// };

// klik diluar elemen
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }

});

// modal box
const itemDetailModal = document.querySelector("#item-detail-modal");
const itemDetailbuttons = document.querySelectorAll(".item-detail-button");

itemDetailbuttons.forEach((btn) =>{
  btn.onclick=(e)=>{
    itemDetailModal.style.display='flex';
    e.preventDefault();
  }
});

itemDetailbuttons.onclick = (e) => {
  itemDetailModal.style.display = "flex";
  e.preventDefault();
};

// klik tomol close
document.querySelector(".modal .close-icon").onclick = (e) => {
  itemDetailModal.style.display = "none";
  e.preventDefault();
};

// klik diluar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = "none";
  }
};
