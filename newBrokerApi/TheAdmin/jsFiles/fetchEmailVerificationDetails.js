$(function () {
  // Trigger AJAX request when the page is loaded
  fetchData();

  function fetchData() {
    // AJAX request
    $.ajax({
      type: "GET",
      url: "../src/fetchEmailStatus", // Replace with your server-side script
      dataType: "json",
      success: function (data) {
        // Handle the received data
        // displayData(data);
      },
      error: function (error) {
        console.log("Error:", error);
      },
    });
  }
});
