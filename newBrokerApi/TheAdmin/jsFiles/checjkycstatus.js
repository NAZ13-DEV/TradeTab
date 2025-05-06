document.addEventListener('DOMContentLoaded', function () {
  const userId = localStorage.getItem('uId');
  const body = document.getElementById('body');
  const checkkyc = document.getElementById('checkkyc');

  let html = '';
  axios
    .get(`../newApi/api/task/fetchKycWithuserId/${userId}`)
    .then(function (response) {
      if (response.status === 201) {
        const result = response.data.message.depositDetails;
        const user = response.data.message.userDetails;

        const { first_name, last_name } = user;
        const { DocumentType } = result;
        html = `     <img
              class="img-fluid mb-5"
              src="assets/svg/illustrations/oc-thinking.svg"
              alt="Image Description"
              data-hs-theme-appearance="default"
            />
            <img
              class="img-fluid mb-5"
              src="assets/svg/illustrations/oc-thinking.svg"
              alt="Image Description"
              data-hs-theme-appearance="dark"
            />
            <h1>Hello ${first_name} ${last_name}</h1>
            <p>
             We're happy to see you in our community. You Just Submitted Your ${DocumentType} Document And it is been reviewed Kindly exercise some patience
            </p>`;
        body.insertAdjacentHTML('afterbegin', html);
      }
    })
    .catch(function (error) {
      if (error.response && error.response.status === 422) {
        const message = error.response.data.errors[0];
        Toasty.showToast('danger', message);
      } else {
        console.error(error);
      }
    });

  checkkyc.addEventListener('click', function (e) {
    e.preventDefault();
    setLoader(checkkyc);
    setTimeout(() => {
      axios
        .get(`../newApi/api/task/checkUserStatus/${userId}`)
        .then(function (response) {
          if (response.status === 201) {
            const result = response.data.message;
            if (result === 'Approved') {
              unSetLoader(checkkyc, ' Check Kyc Verification Status');
              Toasty.showToast('success', 'Your Kyc Has Been Approved');
              setTimeout(() => {
                window.location.href = `index`;
              }, 5000);
            }
            if (result === 'Declined') {
              setTimeout(() => {
                Toasty.showToast(
                  'danger',
                  'Your Document Was Declined You Will Be Redirected To Upload It Again',
                );
                window.location.href = `userVerification`;
              }, 8000);
            }
          }
        })
        .catch(function (error) {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            Toasty.showToast('danger', message);
          } else {
            console.error(error);
          }
        })
        .finally(function () {
          unSetLoader(checkkyc, 'Check Kyc Verification Status');
        });
    }, 3000);
  });
});
