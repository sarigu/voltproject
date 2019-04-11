let navBtn = document.querySelector("#navButton");
let explanationBtn = document.querySelector("#explanationBtn");
let pricingBtn = document.querySelector("#pricingBtn");
let discountBtn = document.querySelector("#discountBtn");
let question1 = document.querySelector("#question1");

window.addEventListener("DOMContentLoaded", init);

function init() {
  alert(
    "Welcome! Please notice that this website is a school project. It is not an official Volt website."
  );
  navBtn.addEventListener("click", openPurchaseflow);
  explanationBtn.addEventListener("click", openPurchaseflow);
  pricingBtn.addEventListener("click", openPurchaseflow);
  discountBtn.addEventListener("click", openPurchaseflow);
  question1.addEventListener("click", showAnswer);
}

function openPurchaseflow() {
  window.open("flow-start.html", "_self"); //the pruchase flow html
}

function showAnswer() {
  if (document.querySelector("#question1Txt").style.display === "none") {
    document.querySelector("#question1Txt").style.display = "block";
    document.querySelector("#lastQuestion").style.display = "none";
  } else {
    document.querySelector("#question1Txt").style.display = "none";
  }
}
