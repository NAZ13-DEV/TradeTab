const ValidationArray = [
  {
    selector: 'input[name="email"]',
    pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/i,
    errorMEssage: "Email Address Is Invalid",
  },
];
const submitButton = document.querySelector("button[class='btn-style-1']");
const form = document.querySelector("#forgot");
let item;
let errorr;
let requestData = {};
ValidationArray.forEach((items, ind) => {
  try {
    const Allselectors = document.querySelector(items.selector);
    // hideError(items.selector);

    const impli = implementValidationOnInput(
      items.selector,
      items.pattern,
      items.errorMEssage,
      submitButton
    );

    item = items.selector;
    const pattern = items.pattern;

    if (pattern.test(Allselectors.value) === true) {
      errorr = false;
    } else if (pattern.test(Allselectors.value) === false) {
      errorr = true;
      submitButton.setAttribute("disabled", "disabled");
      const errorMessageElement = document.querySelector(".errorMessage");
      if (errorMessageElement) {
        submitButton.disabled = true;
      }
    }
  } catch (error) {
    if (error.response && error.response.status === 422) {
      const message = error.response.data.errors[0];
      toastr["error"](message);
    } else {
      console.error(error);
    }
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  setLoader(submitButton);
  setTimeout(function () {
    ValidationArray.forEach((items, ind) => {
      try {
        const Allselector = document.querySelector(items.selector);

        if (Allselector.value === "") {
          showError(items.selector, "This Field is required");
          unSetLoader(submitButton, "Resend Password");
        }
        // hideError(items.selector);
        const impli = implementValidationOnInput(
          items.selector,
          items.pattern,
          items.errorMEssage,
          submitButton
        );
        item = items.selector;
        const pattern = items.pattern;

        if (pattern.test(Allselector.value) === true) {
          errorr = false;
        } else if (pattern.test(Allselector.value) === false) {
          errorr = true;
          submitButton.setAttribute("disabled", "disabled");
          const errorMessageElement = document.querySelector(".errorMessage");
          if (errorMessageElement) {
            submitButton.disabled = true;
          }
        }
        const Allselectors = document.querySelectorAll(item);
        Allselectors.forEach((selector) => {
          // console.log(selector);
          if (selector.value === "") {
            unSetLoader(submitButton, "Resend Password");
            error = true;
          } else {
            error = false;
            setLoader(submitButton);
          }
        });
      } catch (error) {
        if (error.response && error.response.status === 422) {
          const message = error.response.data.errors[0];
          toastr["error"](message);
        } else {
          console.error(error);
        }
      }
    });
    const formData = new FormData(form);
    if (errorr === false) {
      axios
        .post("newApi/api/task/forgotPassword", formData)
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
            console.error(error);
          }
        })
        .finally(function () {
          unSetLoader(submitButton, "Resend Password");
        });
    }
  }, 2500);
});
