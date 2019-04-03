"use strict";

//CHECK ORDER PAGE

//add order of first basket page to order summary

const swapQty = document.querySelector("#swapqty"); //input
const swapNumber = document.querySelector("#swapnumber"); //table output
const swapTotal = document.querySelector("#swaptotal");
const powerQty = document.querySelector("#powerqty");
const powerNumber = document.querySelector("#powernumber");
const powerTotal = document.querySelector("#powertotal");
const totalSum = document.querySelector("#totalsum");
const totalVAT = document.querySelector("#totalvat");

let quantityObj;

//fetch quantities
function getQuantities() {
  fetch(
    "https://denisekea-93a9.restdb.io/rest/volt-quantities?sort=_created&dir=-1&max=1",
    {
      method: "get",
      headers: {
        "content-type": "application/json; charset=utf-8",
        "x-apikey": "5c85985ecac6621685acbd92",
        "cache-control": "no-cache"
      }
    }
  )
    .then(res => res.json())
    .then(data => {
      quantityObj = data[0];
      updateTotals(quantityObj);
    });
}

getQuantities();

//when ship home is checked add price to order

const pickupInput = document.querySelector("#freepickup");
const shipInput = document.querySelector("#shiphome");
const shipSum = document.querySelector("#shippingprice");
const addressInfo = document.querySelector("#shippinginfo");

//default number instead of string shipping price
let shipPrice = 0;

pickupInput.addEventListener("click", checkShipping);
shipInput.addEventListener("click", checkShipping);

function checkShipping() {
  if (shipInput.checked) {
    shipPrice = 50;
    addressInfo.classList.remove("hide");
    updateTotals(quantityObj);
  } else {
    shipPrice = 0;
    addressInfo.classList.add("hide");
    updateTotals(quantityObj);
  }
}

let swapPrice;
let powerPrice;
let totalPrice;
let vatPrice;
let completeOrder;

function updateTotals(quantityObj) {
  swapNumber.textContent = quantityObj.swapquantity;
  powerNumber.textContent = quantityObj.powerquantity;

  swapPrice = quantityObj.swapquantity * 179;
  powerPrice = quantityObj.powerquantity * 200;

  swapTotal.textContent = swapPrice + " DKK";
  powerTotal.textContent = powerPrice + " DKK";
  shipSum.textContent = shipPrice + " DKK";

  totalPrice = swapPrice + powerPrice + shipPrice;
  vatPrice = Math.round((totalPrice / 125) * 25);

  totalSum.textContent = totalPrice + " DKK";
  totalVAT.textContent = vatPrice + " DKK";

  getAddress();
}

const streetInput = document.querySelector("#shipaddress1");
const zipInput = document.querySelector("#shipaddress2");
const cityInput = document.querySelector("#shipaddress3");

streetInput.addEventListener("change", getAddress);
zipInput.addEventListener("change", getAddress);
cityInput.addEventListener("change", getAddress);

function getAddress() {
  if (streetInput.value.length > 0) {
    completeOrder = {
      totalswap: swapPrice + " DKK",
      totalpower: powerPrice + " DKK",
      totalship: shipPrice + " DKK",
      totalamount: totalPrice + " DKK",
      totalvatsum: vatPrice + " DKK",
      shippingaddress: `${streetInput.value}, ${zipInput.value} ${
        cityInput.value
      } `
    };
  } else {
    completeOrder = {
      totalswap: swapPrice + " DKK",
      totalpower: powerPrice + " DKK",
      totalship: shipPrice + " DKK",
      totalamount: totalPrice + " DKK",
      totalvatsum: vatPrice + " DKK"
    };
  }
}

function post(newOrder) {
  fetch("https://denisekea-93a9.restdb.io/rest/volt-orders", {
    method: "post",
    body: JSON.stringify(newOrder),
    headers: {
      "content-type": "application/json; charset=utf-8",
      "x-apikey": "5c85985ecac6621685acbd92",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      alert("Your order is placed");
    });
}

const submitOrderBtn = document.querySelector("#submitOrder");
submitOrderBtn.addEventListener("click", submitOrder);

function submitOrder() {
  event.preventDefault();
  post(completeOrder);
}
