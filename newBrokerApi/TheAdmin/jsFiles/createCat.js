const submitButton = document.querySelector("button[name='submit']");
const inputfield = document.querySelector("input[name='categories']");
const form = document.querySelector("#createCat");
let item;
let errorr;
let requestData = {};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  setLoader(submitButton);
  if (inputfield.value === "") {
    toastr["error"]("input field cannot be empty");
    unSetLoader(submitButton, "Create Categories");
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
        .post("../newApi/api/task/createcat", formData)
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
          unSetLoader(submitButton, "Create Categories");
        });
    }
  }
});
// Lolwaswas5_
