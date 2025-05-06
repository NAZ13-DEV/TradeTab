const submitButton = document.querySelector("button[name='submit']");
const form = document.querySelector("#uploadProduct");
const children = form.querySelectorAll("input, select, textarea");
const link = form.querySelector("#uploadOption");
let hasEmptyField = false;
let element;
let inputFields = [
  "productName",
  "description",
  "categories",
  "price",
  "slashedPrice",
];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  setLoader(submitButton); // Display loader

  // Clear existing toasts
  toastr.clear();
  // const formData = {};
  if (link.value === "file") {
    const uploadfiled = "images[]";
    inputFields.length = 5; // Trim the array to 5 elements
    inputFields.push(uploadfiled); // Push "images" to the array
  } else if (link.value === "link") {
    const uploadfile = "image_url";
    inputFields.pop(); // Remove the last element from the array
    inputFields.push(uploadfile); // Push "image_url" to the array
  }
  const formData = new FormData(form); // Create FormData object to handle file uploads

  // Check for empty fields
  let hasEmptyField = false;
  inputFields.forEach((name) => {
    const element = document.getElementsByName(name)[0];
    const labelName = element.parentNode.parentNode.children[0].textContent;

    if (element.value === "") {
      hasEmptyField = true;
      toastr["error"](`This ${labelName} input field is required`);
    } else {
      hasEmptyField = false;
    }
  });

  // If there are no empty fields, submit the form
  if (!hasEmptyField) {
    for (const value of formData.values()) {
      if (typeof value === "string") {
        formData.set(value, value.trim());
      }
    }
    axios
      .post("../newApi/api/task/createPost", formData)
      .then((response) => {
        const result = response.data;
        // console.log(response);
        if (response.status === 201) {
          const message = result.message;
          toastr["success"](message);
        }
      })
      .catch((error) => {
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
      .finally(() => {
        unSetLoader(submitButton, "Upload Product"); // Hide loader after Axios request is complete
      });
  } else {
    unSetLoader(submitButton, "Upload Product"); // Hide loader if there are empty fields
  }
});
