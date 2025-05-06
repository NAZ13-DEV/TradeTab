document.addEventListener('DOMContentLoaded', function () {
  const fetchUser = fetchUserDetailsWithAxios();
  const userName = document.querySelectorAll('#userName') ?? null;
  const phoneNumber = document.querySelectorAll('#phoneNumber') ?? null;
  const abbrName = document.querySelectorAll('#abbrName') ?? null;
  const userEmail = document.querySelectorAll('#userEmail') ?? null;
  const location = document.querySelector('#location') ?? null;
  const dateJoined = document.getElementById('dateJoined') ?? null;
  const userlink = document.querySelector('#userlink') ?? null;
  const userrPlan = document.getElementById('userPlan') ?? null;
  const userBalanc = document.querySelectorAll('#userBalance') ?? null;
  const userProfi = document.querySelectorAll('#userProfi') ?? null;
  const copyLink = document.querySelectorAll('#copyLink') ?? null;
  const amountDeposit = document.querySelectorAll('#amountDeposit') ?? null;
  const anotheruserName = document.querySelector('.anotheruserName') ?? null;
  const alertMEss = document.querySelector('#alertMEss') ?? null;
  const twofactor = document.querySelector('#twofactor') ?? null;
  const message = document.querySelector('#message') ?? null;
  const messagenum = document.querySelector('#messagenumbbb') ?? null;
  const stock = document.querySelector('#stock') ?? null;
  const el = document.querySelector('#el') ?? null;
  const fullName = document.querySelectorAll('#fullName') ?? null;
  const countrys = document.querySelectorAll('#country') ?? null;
  const currencys = document.querySelectorAll('#currency') ?? null;
  const Fname = document.querySelectorAll('#Fname') ?? null;
  const Lname = document.querySelectorAll('#Lname') ?? null;
  const checkid = document.querySelector('#checkid') ?? null;
// console.log(checkid);
  // const currencySign = document.querySelector('#currencySign') ?? null;
  const userid = localStorage.getItem('uId');
  let sig = '';
  let verifyid = ""
  let verifyPending = ""

  fetchUser
    .then((response) => {
      if (response.status === 201) {
        const readResult = JSON.parse(response.data.message);
        const {
   
 
id,
fname,
lname,
username,
email,
pwd,
phonenumber,
address,
country,
state,
city,
zip_code,
ssn,
dob,
nationality,
currency,
experience,
employment,
referral,
encryptedPassword,
dateOc,
verifyUser,
userId,
UserLogin,
AllowLogin,
emailVerication,
userBalance,
userProfit,
amountDeposited,
amountWithdrawal,
UserStatus,
ipAdress,
userPlan,
referralBonus,
AccountManager,
TradingPercentage,
Message,
allowMessage,
image,
        } = readResult;
        

        // console.log(fullName);  // Check the values of fname and lname
        if (fullName !== null) {
          // Assuming fullName is a NodeList (from querySelectorAll)
          fullName.forEach((e) => {
            e.value = `${fname} ${lname}`;
          });
        }
        if (userEmail !== null) {
          // Assuming fullName is a NodeList (from querySelectorAll)
          userEmail.forEach((e) => {
            e.value = `${email}`;
          });
        }
        if (phoneNumber !== null) {
          // Assuming fullName is a NodeList (from querySelectorAll)
          phoneNumber.forEach((e) => {
            e.value = `${phonenumber}`;
          });
        }
        if (countrys !== null) {
          // Assuming fullName is a NodeList (from querySelectorAll)
          countrys.forEach((e) => {
            e.value = `${country}`;
          });
        }
        if (currencys !== null) {
          // Assuming fullName is a NodeList (from querySelectorAll)
          currencys.forEach((e) => {
            e.value = `${currency}`;
          });
        }
        if (Fname !== null) {
          // Assuming fullName is a NodeList (from querySelectorAll)
          Fname.forEach((e) => {
            e.value = `${fname}`;
          });
        }
        if (Lname !== null) {
          // Assuming fullName is a NodeList (from querySelectorAll)
          Lname.forEach((e) => {
            e.value = `${lname}`;
          });
        }
        
        if (userName !== null) {
          // Assuming fullName is a NodeList (from querySelectorAll)
          userName.forEach((e) => {
            e.value = `${username}`;
          });
        }
        
              if (checkid !== null) {
if (verifyUser === "" || verifyUser === null || verifyUser === "False" ) {
    verifyid = `   <div class="card border border-danger">
    <div class="card-body">
      <h6>Verify Your Identity</h6>
      <p>
        Kindly complete your profile and upload a photo of your
        state ID, driver's license or passport so we can finish
        processing your application.
      </p>
      <a
        href="javascript:void(0)"
        data-bs-toggle="modal"
        data-bs-target=".bs-example-modal-center"
      >
        Upload Document Now
      </a>
    </div>
  </div>`;
  checkid.insertAdjacentHTML('afterbegin', verifyid);
}
if (verifyUser === "Pending" ) {
  verifyPending = ` <div class="card border border-warning">
    <div class="card-body">
        <h6>Document uploaded and pending approval</h6>
    </div>
</div>`;
  checkid.insertAdjacentHTML('afterbegin', verifyPending);
}
        }
              if (el !== null) {

          const html = `
          <button type="button" class="btn header-item bg-soft-light border-start border-end" id="page-header-user-dropdown"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img class="rounded-circle header-profile-user" src="img/avatar.png"
                             alt="Header Avatar">
                        <span class="d-none d-xl-inline-block ms-1 fw-medium" id="fullName"> ${fname} ${lname}</span>
                        <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                    </button>
          `;
          el.insertAdjacentHTML('afterbegin', html);
        }


        if (UserStatus === 'Pending') {
          // window.location.href = 'userVerification';
        }

        if (UserLogin === 'disabled') {
          axios
            .post(`../newApi/api/task/logoutUser`)
            .then((response) => {
              if (response.status === 201) {
                const readResult = response.data.message;
                if (readResult === 'true') {
                  const getLInk = window.location.href;
                  localStorage.setItem('url', getLInk);
                  window.location.href = '../login';
                }
              }
            })
            .catch((error) => {
              if (error.response && error.response.status === 422) {
                const message = error.response.data.errors[0];
                Toasty.showToast('danger', message);
              }
            });
        }
        // if (AlertMessage === 'enabled') {
        //   $('#statusSuccessModal').modal('show');
        //   SignalMessage === null
        //     ? (sig = `You Are Required To Subscribe To An Active User Plan`)
        //     : (sig = SignalMessage);
        //   alertMEss.innerHTML = sig;
        // }
        if (userrPlan !== null) {
          userrPlan.innerHTML = `${userPlan === '' || userPlan === 'none' ? 'none' : userPlan}`;
        }
        if (location !== null) {
          location.innerHTML = `${country} ${state}`;
        }
        if (dateJoined !== null) {
          dateJoined.innerHTML = convertDateFormat(dateoc); // Assuming convertDateFormat function exists
        }

        if (userBalanc !== null) {
          userBalanc.forEach((e) =>
            e.insertAdjacentHTML('afterbegin', `${currency}${formatNumberWithCommasAndDecimal(Number(userBalance))}`),
          );
        }
        if (userProfi !== null) {
          userProfi.forEach((e) =>
            e.insertAdjacentHTML('afterbegin', `${currency}${formatNumberWithCommasAndDecimal(Number(userProfit))} <em class="icon ni ni-arrow-long-up"></em>`),
          );
        }

        // if (currencySign !== null) {

        //   currencySign.insertAdjacentHTML('afterbegin', ` Preferred Deposit Amount <em class="icon ni ni-chevron-right-fill-c"></em> ${currency}`);

        // }

        if (userEmail !== null) {
          userEmail.forEach((e) =>
            e.insertAdjacentHTML('afterbegin', email),
          );
          // console.log(email)
        if (countrys !== null) {
          countrys.forEach((e) =>
            e.insertAdjacentHTML('afterbegin', country),
          );
        if (phoneNumber !== null) {
          phoneNumber.forEach((e) =>
            e.insertAdjacentHTML('afterbegin', phonenumber),
          );
        }
        if (amountDeposit !== null) {
          amountDeposit.forEach((e) =>
            e.insertAdjacentHTML('afterbegin', `${currency}${formatNumberWithCommasAndDecimal(Number(amountDeposited))}`),
          );
        }

        if (userlink !== null) {
          userlink.value = `${sitelink}dashboard/sign-up?u=${userId}`;
        }
       

        if (userName !== null) {
          userName.forEach((e) =>
            e.insertAdjacentHTML('afterbegin', username),
          );
        }
     
        // if (abbrName !== null) {
        //   const split = userName.split(" ");
        //   const initials = split.map(part => part.charAt(0)).join("").toUpperCase();
        //   abbrName.forEach((e) =>
        //     e.insertAdjacentHTML('afterbegin', initials),
        //   );
        // }
      }
    }}})
    .catch(function (error) {
      console.error(error);
    });
  axios
    .get(`../newApi/api/task/fetchUserActivity/${userid}`)
    .then(function (response) {
      if (response.status === 201) {
        const result = response.data.message;
        const activity = result.activity;
        const unreadActivities = activity.filter((e) => e.status !== 'Read');
        unreadActivities.length !== 0
          ? (messagenum.innerHTML = unreadActivities.length)
          : (messagenum.style.display = 'none');
        unreadActivities.length === 0
          ? (message.style.display = 'none')
          : 'new';
        if (bell !== null) {
          unreadActivities.length === 0 ? (bell.style.display = 'none') : '';
        }
      }
    })
    .catch(function (error) {
      if (error.response && error.response.status === 422) {
        const message = error.response.data.errors[0];
        // Toasty.showToast('danger', message);
      }
    });
});
