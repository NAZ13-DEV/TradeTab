document.addEventListener('DOMContentLoaded', function () {
  const sessionGetUserID = localStorage.getItem('uId');
  const tablebody = document.getElementById('tbody');
  const numberOfReferaal = document.getElementById('numberOfReferaal');
  const AmtEarned = document.getElementById('AmtEarned');
  const completedReferal = document.getElementById('completedReferal');
  const lastReferall = document.getElementById('lastReferal');
  let html = '';
 
  try {
    if (sessionGetUserID) {
      axios
        .get(`../newApi/api/task/fetchReferral/${sessionGetUserID}`)
        .then(function (response) {
          if (response.status === 201) {
            const message = response.data.message;
            const { currency } = message.referrerDetails[0];
            const allreferral = message.referralDetails;
            numberOfReferaal.innerHTML = allreferral.length;
            const amounts = allreferral.map((referral) =>
              parseFloat(referral.amtEarned),
            );
            const totalAmount = amounts.reduce((acc, curr) => acc + curr, 0);
            AmtEarned.innerHTML = `${currency}${totalAmount.toFixed(2)}`;
            const approvedReferrals = allreferral.filter(
              (referral) => referral.status === 'Approved',
            );
           completedReferal.innerHTML = approvedReferrals.length;

        
            allreferral.forEach((element, index) => {
              const {
                amtEarned,
                dateOfReferral,
                nameOfRefers,
                referralId,
                status,
              } = element;

            

              html += `   <tr>
                <td>${index + 1}</td>
                
                  <td>
                    <a class="d-flex align-items-center">
                      <div class="flex-shrink-0">
                        <div class="avatar avatar-circle">
                          <img
                            class="avatar-img"
                            src="assets/img/160x160/img10.jpg"
                            alt="Image Description"
                          />
                        </div>
                      </div>
                      <div class="flex-grow-1 ms-3">
                        <span class="d-block h5 text-inherit mb-0">
                        ${nameOfRefers}
                          <i
                            class="${status === 'Pending' ? 'bi bi-patch-exclamation-fill text-warning' : status === 'Approved' ? 'bi bi-patch-check-fill text-success' : ''}"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Top endorsed"
                          ></i>
                        </span>
                      </div>
                    </a>
                  </td>
                  <td>#${referralId}</td>
                  <td>${dateOfReferral}</td>
                  <td>${currency}${amtEarned}</td>
                  <td>${status}</td>
                </tr>
              `;
            });
            tablebody.innerHTML = html;
            
          }
        })
        .catch(function (error) {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            Toasty.showToast('danger', message);
               html = `<tr><td valign="top" colspan="6" class="dataTables_empty"><div class="text-center p-4">
              <img class="mb-3" src="./assets/svg/illustrations/oc-error.svg" alt="Image Description" style="width: 10rem;" data-hs-theme-appearance="default">
              <img class="mb-3" src="./assets/svg/illustrations-light/oc-error.svg" alt="Image Description" style="width: 10rem;" data-hs-theme-appearance="dark">
            <p class="mb-0">No Refferal Yet</p>
            </div></td></tr>`;
               tablebody.innerHTML = html;
          }
        });
    }
  } catch (error) {
    console.log(error);
  }
});
