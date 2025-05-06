const submitButton = document.querySelector("button[name='submit']");
const inputfield = document.querySelector("input[name='meth']");
const form = document.querySelector("#createCat");
const per = document.querySelector("#per");
const amt = document.querySelector("#amt");
const ecotax = document.querySelector("#ecotax");
const delivery = document.querySelector("#delivery");

let item;
let errorr;
let requestData = {};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  setLoader(submitButton);
  if (
    inputfield.value === "" ||
    inputfield.value === "" ||
    per.value === "" ||
    ecotax.value === "" ||
    delivery.value === ""
  ) {
    toastr["error"]("all input field cannot be empty");
    unSetLoader(submitButton, "Create Info");
  } else {
    errorr = false;

    setLoader(submitButton);

    const formData = new FormData(form);
    for (const value of formData.values()) {
      if (typeof value === "string") {
        formData.set(value, value.trim());
      }
    }
    if (errorr === false) {
      axios
        .post("../newApi/api/task/createinfo", formData)
        .then(function (response) {
          const result = response.data;
          console.log(response);
          if (response.status === 201) {
            const message = result.message;
            toastr["success"](message);
          }
        })
        .catch(function (error) {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            toastr["error"](message);
          } else {
            if (error.response && error.response.status === 422) {
              const message = error.response.data.errors[0];
              toastr["error"](message);
            } else {
              console.error(error);
            }
          }
        })
        .finally(function () {
          unSetLoader(submitButton, "Create Info");
        });
    }
  }
});
// Lolwaswas5_
