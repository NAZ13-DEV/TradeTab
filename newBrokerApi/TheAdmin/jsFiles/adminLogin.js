const ValidationArray = [
  {
    selector: 'input[name="email"]',
    pattern: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/i,
    errorMEssage: "Email Address Is Invalid",
  },
  {
    selector: 'input[name="password"]',
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_\W])[\s\S]{8,16}$/,
    errorMEssage:
      "Password Must Contain One Lowercase Letter, One Uppercase Letter, One Digit And One Special Character ",
  },
];

const submitButton = document.querySelector("button[name='submit']");
const form = document.querySelector("#loginForm");
const logindetail = document.querySelector(".login");
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
          unSetLoader(submitButton, "Register");
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
            unSetLoader(submitButton, "Login ");
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
    for (var pair of formData.entries()) {
      formData.set(pair[0], pair[1].trim());
    }
    if (errorr === false) {
      axios
        .post("../api/task/Adminlogin", formData)
        .then(function (response) {
          const result = response.data.message;
          if (response.status === 201) {
            
            const message = result.message;
            const Adminid = result.id;
          
           Toasty.showToast('success', message);
            localStorage.setItem("Adminid", Adminid);
            setTimeout(() => {
              window.location.href = "index";
            }, 5000);
          }
        })
        .catch(function (error) {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
              Toasty.showToast(
                'danger',
                message
              );
          } else {
            console.error(error);
          }
        })
        .finally(function () {
          unSetLoader(submitButton, "Login ");
        });
    }
  }, 2500);
});
// Lolwaswas5_
