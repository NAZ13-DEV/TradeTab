var Toasty = {
  // Function to show toast notification
  showToast: function (type, message) {
    // Remove existing toast if any
    var existingToast = document.querySelector(".toasty");
    if (existingToast) {
      existingToast.parentNode.removeChild(existingToast);
    }

    var toastBox = document.getElementById("toastyBox");
    if (!toastBox) {
      toastBox = document.createElement("div");
      toastBox.id = "toastyBox";
      document.body.appendChild(toastBox);
    }

    // Create toast element
    var toast = document.createElement("div");
    toast.classList.add("toasty");
    toast.classList.add("toasty-" + type); // Add type class to toast

    // Create icon element
    var icon = document.createElement("div");
    icon.classList.add("toasty-icon");
    toast.appendChild(icon);

    // Create icon element with appropriate color class
    var iconElement = document.createElement("i");
    iconElement.classList.add("fas"); // Font Awesome class
    if (type === "warning") {
      iconElement.classList.add("fa-exclamation-triangle"); // Warning icon
      iconElement.classList.add("toasty-icon-warning"); // Add warning color class
    } else if (type === "info") {
      iconElement.classList.add("fa-info-circle"); // Info icon
      iconElement.classList.add("toasty-icon-info"); // Add info color class
    } else if (type === "success") {
      iconElement.classList.add("fa-check-circle"); // Success icon
      iconElement.classList.add("toasty-icon-success"); // Add success color class
    } else if (type === "danger") {
      iconElement.classList.add("fa-times-circle"); // Danger icon
      iconElement.classList.add("toasty-icon-danger"); // Add danger color class
    } else if (type === "primary") {
      iconElement.classList.add("fa-user"); // Primary icon
      iconElement.classList.add("toasty-icon-primary"); // Add primary color class
    } else if (type === "secondary") {
      iconElement.classList.add("fa-cog"); // Secondary icon
      iconElement.classList.add("toasty-icon-secondary"); // Add secondary color class
    }
    icon.appendChild(iconElement);

    // Create message element and append to toast
    var messageElement = document.createElement("div");
    messageElement.classList.add("toasty-message");
    messageElement.classList.add("toasty-message-" + type); // Add type class to message
    messageElement.textContent = message;
    toast.appendChild(messageElement);

    // Append toast to toastBox
    toastBox.appendChild(toast);

    setTimeout(function () {
      // Check if toast is a child of toastBox before removing it
      if (toast.parentNode === toastBox) {
        toastBox.removeChild(toast);
      }
    }, 10 * 1000);
  },
};
