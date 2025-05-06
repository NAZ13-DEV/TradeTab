document.addEventListener('DOMContentLoaded', function () {
  const mailText = document.querySelectorAll('#mail');
  const container = document.querySelector('#containerVer');
  const paraMeterFromUrl = getParamDetailsFromLinks();
  const emailReadFromUrl = paraMeterFromUrl.email;
  let html = '';
  let formattedMinutes;
  let formattedSeconds;
  let tickIntervalId;
  let time = 60;
  let defaultState;
  let resendClickCount = 0;

  const startCountdown = function () {
    formattedMinutes = '00';
    formattedSeconds = '00';

    if (time === 0) {
      clearInterval(tickIntervalId);
      // clearInterval(atickIntervalId);
    }

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    formattedMinutes = String(minutes).padStart(2, '0');
    formattedSeconds = String(seconds).padStart(2, '0');

    time--;

    // Call the setHTMLContent function here with the defaultState
    setHTMLContent(defaultState);
  };
  function resetCountdown() {
    time = 60; // Reset the countdown time in seconds (5 minutes)
    startCountdown();
    clearInterval(tickIntervalId);
    tickIntervalId = setInterval(startCountdown, 1000);
  }
  // Call the startCountdown function to initiate the countdown
  startCountdown();
  tickIntervalId = setInterval(startCountdown, 1000);

  let value;
  mailText.forEach((item) => (item.textContent = linkParam.email));

  function setHTMLContent(emailVer) {
    container.innerHTML = '';

    if (emailVer === 'False') {
      if (`${formattedMinutes}:${formattedSeconds}` === '00:00') {
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
            <span class="d-block text-dark fw-semibold mb-1" id="mail">${emailReadFromUrl}</span>
            <p>Check your email to confirm, if not found in a minute, check your spam folder.</p>
            <p id="timer">Didn't receive an email?${value}</p>
          </div>
        </div>
      `;
    } else if (emailVer === 'True') {
      html = `
        <div class="card card-lg mb-5">
          <div class="card-body text-center">
            <div class="mb-4">
              <img class="avatar avatar-xxl avatar-4x3" src="assets/svg/illustrations/undraw_confirmed_re_sef7.svg" alt="Image Description" data-hs-theme-appearance="default">
              <img class="avatar avatar-xxl avatar-4x3" src="assets/svg/illustrations/undraw_confirmed_re_sef7.svg" alt="Image Description" data-hs-theme-appearance="dark">
            </div>
            <h1 class="display-5">Your email has been verified</h1>
            <span class="d-block text-dark fw-semibold mb-1" id="mail">${emailReadFromUrl}</span>
            <p></p>
            <p>you will be redirected to login into your account</p>
          </div>
        </div>
      `;
    } else if (emailVer === 'empty') {
      html = ``;
    }
    container.insertAdjacentHTML('beforeend', html);
    const resend = document.querySelector('#resend');
    if (resend) {
      $(resend).on('mouseover', function () {
        $(this).css('cursor', 'pointer');
      });
      resend.addEventListener('click', function () {
        resendClickCount++;
        if (resendClickCount >= 5) {
          $('#statusErrorsModal').modal('show');
          setTimeout(function () {
            $('#statusErrorsModal').modal('hide');
          }, 5000);
        } else {
          const resendMailData = {
            mail: emailReadFromUrl,
          };
          axios
            .post(
              '../newApi/api/task/resendMail',
              resendMailData,
            )
            .then(function (response) {
              if (response.status === 201) {
                const message = response.data.message.status;

                if (message === 'true') {
                  $('#newMessage').text(
                    `A new email verification link has been sent to ${emailReadFromUrl}`,
                  );
                  $('#statusSuccessModal').modal('show');
                  $('.modal-body ').hide();
                  const inter = setInterval(function () {
                    $('#loader-container4').fadeOut(2000, function () {
                      $('.modal-body').show();
                    });
                  }, 3000);
                  setTimeout(function () {
                    const modalHide = $('#statusSuccessModal').modal('hide');
                    clearInterval(inter);
                    resetCountdown();
                  }, 10000);
                }
              }
            })
            .catch(function (error) {
              if (error.response && error.response.status === 422) {
                const message = error.response.data.errors[0];

                Toasty.showToast('danger', message);
              }
            });
        }
      });
    }
  }

  // Initial state for email verification
  defaultState = 'False';

  //   Set up a separate interval for fetchEmailStatusPromise
  let fetchEmailStatusIntervalId = setInterval(function () {
    axios
      .get(
        `../newApi/api/task/fetchEmailStatus/${emailReadFromUrl}`,
      )
      .then(function (response) {
        // console.log(response);
        if (response.status === 201) {
          const message = response.data.message.status;
          const status = response.data.message.message;
          setHTMLContent(status);
          defaultState = status;
          if (defaultState === 'True') {
            clearInterval(fetchEmailStatusIntervalId);
            setTimeout(function () {
              window.location.href = 'authentication-login-cover';
            }, 5000);
          }
        }
      })
      .catch(function (error) {
        if (error.response && error.response.status === 422) {
          const message = error.response.data.errors[0];

          Toasty.showToast('danger', message);
        }
      });
  }, 10000);

  // Clear the fetchEmailStatusIntervalId after 5 minutes
});
