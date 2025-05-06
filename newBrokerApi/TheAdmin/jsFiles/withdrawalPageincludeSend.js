document.addEventListener("DOMContentLoaded", function () {
  const user = document.querySelector(".userbalance_amt");
  const bal = document.querySelector("input[name='bal']");

  const userDetails = fetchUserDetailsWithAxios();
  userDetails
    .then((res) => {
      // Handle the data returned from the server
      // console.log(data);
      const data = JSON.parse(res.data.message);
      balance = data.userBalance;
      curency = data.currency;
      user.textContent = `you have ${curency}${formatNumberWithCommasAndDecimal(balance)} Available`;
      4;
      bal.value = balance;
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      console.error("Error fetching user details:", error);
    });
});
