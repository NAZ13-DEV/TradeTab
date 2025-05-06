document.addEventListener('DOMContentLoaded', function () {
    const regsell = document.querySelector("#regsell");
    const regbuy = document.querySelector("#regbuy");
    const buttonSell = document.querySelector("#buttonSell");
    const buttonBuy = document.querySelector("#buttonBuy");
    const amount = document.querySelector("#volumeInput");
    const currency = localStorage.getItem('currency')
    const userDetails = fetchUserDetailsWithAxios();
    userDetails.then((res) => {
        const data = JSON.parse(res.data.message);
        const {verifyUser ,userBalance, id } = data;
      if (verifyUser === '' || verifyUser === null ||  verifyUser === 'False' || verifyUser === "Pending") {
        window.location.href = 'index';
        return;
      }
        regbuy.addEventListener('submit', function (e) {
            e.preventDefault();
            setLoaderWithCustom(buttonBuy, 'Loading..');
            setTimeout(() => {
                if (parseFloat(amount.value) >= parseFloat(userBalance)) {
                    Toasty.showToast('danger', 'cannot process trade amount greater than balance');
                }
                console.log(typeof parseFloat(amount.value), typeof parseFloat(userBalance));
                const formData = new FormData(this);
                formData.append('id', id);
                axios
                    .post("../newApi/api/task/regBuy", formData)
                    .then(function (response) {
                        const result = response.data;
                        if (response.status === 201) {
                            if (result.message === 'true') {
                                Toasty.showToast('success', 'Your trade has been placed successfully');
                                location.reload();
                            }
                        }
                    })
                    .catch(function (error) {
                        if (error.response && error.response.status === 422) {
                            const message = error.response.data.errors[0];
                            console.log(message);
                        }
                    })
                    .finally(function () {
                        unSetLoader(buttonBuy, 'buy by Market');
                    });

            }, 3000);
        });
        regsell.addEventListener('submit', function (e) {
            e.preventDefault();
            setLoaderWithCustom(buttonSell, 'Loading..');
            setTimeout(() => {
                if (parseFloat(amount.value) >= parseFloat(userBalance)) {
                    Toasty.showToast('danger', 'cannot process trade amount greater than balance');
                }
                console.log(typeof parseFloat(amount.value), typeof parseFloat(userBalance));
                const formData = new FormData(this);
                formData.append('id', id);
                axios
                    .post("../newApi/api/task/regSell", formData)
                    .then(function (response) {
                        const result = response.data;
                        if (response.status === 201) {
                            if (result.message === 'true') {
                                Toasty.showToast('success', 'Your trade has been placed successfully');
                                location.reload();
                            }
                        }
                    })
                    .catch(function (error) {
                        if (error.response && error.response.status === 422) {
                            const message = error.response.data.errors[0];
                            console.log(message);
                        }
                    })
                    .finally(function () {
                        unSetLoader(buttonSell, 'Sell by Market');
                    });

            }, 3000);
        });
    })
        .catch(function (error) {
            console.log(error);
        });
});
