document.addEventListener("DOMContentLoaded", function () {
  const mailText = document.querySelectorAll("#mail");
  const container = document.querySelector("#containerVer");
  const linkParam = getParamDetailsFromLinks();
  const mail = linkParam.email;
  let html = "";
  let formattedMinutes;
  let formattedSeconds;

  let tickIntervalId;
  let time = 60; // Set the countdown time in seconds (5 minutes)
  let defaultState;
  let resendClickCount = 0;
  const startCountdown = function () {
    formattedMinutes = "00";
    formattedSeconds = "00";

    if (time === 0) {
      clearInterval(tickIntervalId);
    }

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    formattedMinutes = String(minutes).padStart(2, "0");
    formattedSeconds = String(seconds).padStart(2, "0");

    time--;
  };

  // Call the startCountdown function to initiate the countdown
  startCountdown();
  tickIntervalId = setInterval(startCountdown, 1000);

  let value;
  mailText.forEach((item) => (item.textContent = linkParam.email));

  function setHTMLContent(emailVer) {
    container.innerHTML = "";

    if (emailVer === "False") {
      if (`${formattedMinutes}:${formattedSeconds}` === "00:00") {
        value = '<a id="resend"> click to resend</a>';
      } else {
        value = `<span> Resend</span> in ${formattedMinutes}:${formattedSeconds}`;
      }
      html = `
        <div class="card card-lg mb-5">
          <div class="card-body text-center">
            <div class="mb-4">
              <img class="avatar avatar-xxl avatar-4x3" src="assets/svg/illustrations/oc-email-verification.svg" alt="Image Description" data-hs-theme-appearance="default">
              <img class="avatar avatar-xxl avatar-4x3" src="assets/svg/illustrations/oc-email-verification.svg" alt="Image Description" data-hs-theme-appearance="dark">
            </div>
            <h1 class="display-5">Verify your email</h1>
            <p class="mb-1">We've sent a link to your email address:</p>
            <span class="d-block text-dark fw-semibold mb-1" id="mail">${mail}</span>
            <p>Check your email to confirm, if not found in a minute, check your spam folder.</p>
            <p id="timer">Didn't receive an email?${value}</p>
          </div>
        </div>
      `;
    } else if (emailVer === "True") {
      html = `
        <div class="card card-lg mb-5">
          <div class="card-body text-center">
            <div class="mb-4">
              <img class="avatar avatar-xxl avatar-4x3" src="assets/svg/illustrations/undraw_confirmed_re_sef7.svg" alt="Image Description" data-hs-theme-appearance="default">
              <img class="avatar avatar-xxl avatar-4x3" src="assets/svg/illustrations/undraw_confirmed_re_sef7.svg" alt="Image Description" data-hs-theme-appearance="dark">
            </div>
            <h1 class="display-5">Your email has been verified</h1>
            <span class="d-block text-dark fw-semibold mb-1" id="mail">${mail}</span>
            <p>Please follow the link inside to continue.</p>
          </div>
        </div>
      `;
    }
    container.insertAdjacentHTML("beforeend", html);
    const resend = document.querySelector("#resend");
    if (resend) {
      $(resend).on("mouseover", function () {
        $(this).css("cursor", "pointer");
      });
      resend.addEventListener("click", function () {
        resendClickCount++;
        if (resendClickCount >= 5) {
          $("#statusErrorsModal").modal("show");
          setTimeout(function () {
            $("#statusErrorsModal").modal("hide");
          }, 5000);
        } else {
          $.ajax({
            type: "POST",
            url: "../src/resendMail",
            data: { mail: linkParam.email },
            success: function (result) {
              const resultObj = JSON.parse(result);
              const output = resultObj.success;
              if (output === 1) {
                $("#newMessage").text(
                  `A new email verification link has been sent to ${mail}`
                );
                $("#statusSuccessModal").modal("show");
                $(".modal-body ").hide();
                setInterval(function () {
                  $("#loader-container4").fadeOut(2000, function () {
                    $(".modal-body").show();
                  });
                }, 3000);

                // Set timeout to restart the countdown after modal is closed
                setTimeout(function () {
                  const modalHide = $("#statusSuccessModal").modal("hide");

                  if (modalHide) {
                    defaultState = "False";
                    time = 60;
                    clearInterval(tickIntervalId); // Clear previous interval
                    tickIntervalId = setInterval(startCountdown, 1000); // Start new interval
                    const firstINterval = setInterval(function () {
                      setHTMLContent(defaultState);
                    }, 1000);
                    setTimeout(function () {
                      clearInterval(firstINterval, tickIntervalId);
                    }, 5000);
                  }
                }, 10000);
              }
            },
            error: function (xhr, status, error) {
              console.log("AJAX Error:", status, error);
            },
          });
        }
      });
    }
  }

  defaultState = "False";
  const firstINterval = setInterval(function () {
    setHTMLContent(defaultState);
  }, 1000);
  setTimeout(function () {
    clearInterval(firstINterval, tickIntervalId);
    const fetchEmailStatusPromise = new Promise((resolve, reject) => {
      const intervalId = setInterval(function () {
        $.ajax({
          type: "POST",
          url: "../src/fetchEmailStatus",
          data: { mail: linkParam.email },
          success: function (result) {
            const resultObj = JSON.parse(result);
            const emailVer = resultObj.emailVerication;
            setHTMLContent(emailVer);
            resolve(); // Resolve the promise after successful AJAX call
          },
          error: function (xhr, status, error) {
            console.log("AJAX Error:", status, error);
            reject(); // Reject the promise on AJAX error
          },
        });
      }, 1000);

      // Clear the interval after 5 minutes
      setTimeout(() => {
        clearInterval(intervalId);
        resolve(); // Resolve the promise even if the interval is cleared
      }, 1 * 60 * 1000);
    });

    // Wait for both intervals to resolve before continuing
    Promise.all([fetchEmailStatusPromise, firstINterval])
      .then(() => {
        console.log("Both intervals have completed.");
      })
      .catch(() => {
        console.log("Error occurred during intervals.");
      });
  }, 1 * 60 * 1000);
});
