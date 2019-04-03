"use strict";

// SIGN UP PAGE

//when overlay is clicked hide selected overlay

const loginOverlay = document.querySelector("#loginoverlay");
const registerOverlay = document.querySelector("#registeroverlay");

loginOverlay.addEventListener("click", () => {
  loginOverlay.classList.add("hide");
  registerOverlay.classList.remove("hide");
});

registerOverlay.addEventListener("click", () => {
  registerOverlay.classList.add("hide");
  loginOverlay.classList.remove("hide");
});

//add registration form to restdb

function post(newAccount) {
  fetch("https://denisekea-93a9.restdb.io/rest/volt-accounts", {
    method: "post",
    body: JSON.stringify(newAccount),
    headers: {
      "content-type": "application/json; charset=utf-8",
      "x-apikey": "5c85985ecac6621685acbd92",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      form.elements.submit.disabled = false;
      console.log(data);
      window.location.href = "checkorder.html";
    });
}

const form = document.querySelector("#registerform");
form.setAttribute("novalidate", true);

form.addEventListener("submit", e => {
  e.preventDefault();
  form.elements.submit.disabled = true;

  console.log("submitted");

  let marketingStatus = checkMarketing();
  function checkMarketing() {
    if (form.elements.marketing.checked) {
      return true;
    } else {
      return false;
    }
  }

  const submittedAccount = {
    email: form.elements.email.value,
    password: form.elements.password.value,
    fullname: form.elements.fullname.value,
    country: form.elements.country.value,
    phoneno: form.elements.phoneno.value,
    marketing: marketingStatus
  };

  if (form.reportValidity() == true) {
    post(submittedAccount);
  } else {
    form.elements.submit.disabled = false;
  }
  console.log(form.reportValidity());
});
