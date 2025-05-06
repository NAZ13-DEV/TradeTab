document.addEventListener('DOMContentLoaded', function () {
    const firstSelect = document.querySelector("#firstSelect");
    const secondSelect = document.querySelector("#secondSelect");
    const button = document.querySelector("#btn");
    const amount = document.querySelector("#amount");
    const currency = localStorage.getItem('currency')
    const userDetails = fetchUserDetailsWithAxios();
    userDetails
        .then((res) => {
            const data = JSON.parse(res.data.message);
            const { userBalance, Bitcoin, Etheruem, USDT, BitcoinCash, Doge, RIPPLE, id } = data;

            const html = `     <select
                                class="form-select js-select2"
                                data-search="on"
                                name="sfrom"
                                style="width: 100%; height: 40px"
                                class="form-control"
                                id="from"
                              > 
                                <option value="Bitcoin">Bitcoin - ${currency}${Number(Bitcoin)}</option>
                                <option value="Etheruem">
                                  Ethereum - ${currency}${Number(Etheruem)}
                                </option>
                                <option value="BitcoinCash">
                                  Bitcoin Cash - ${currency}${Number(USDT)}
                                </option>
                                <option value="Doge">Doge - ${currency}${Number(BitcoinCash)}</option>
                                <option value="USDT">USDT - ${currency}${Number(Doge)}</option>
                                <option value="XRP">XRP - ${currency}${Number(RIPPLE)}</option>
                              </select> `;
            firstSelect.insertAdjacentHTML('beforeend', html);
            const c = ` <select
                                class="form-select js-select2"
                                data-search="on"
                                name="sto"
                                style="width: 100%; height: 40px"
                                class="form-control" 
                                id="to"
                                >    
                            
                                <option value="Bitcoin">Bitcoin - ${currency}${Number(Bitcoin)}</option>
                                 <option value="Etheruem">
                                  Ethereum - ${currency}${Number(Etheruem)}
                                </option>
                             
                                <option value="BitcoinCash">
                                  Bitcoin Cash - ${currency}${Number(USDT)}</option>
                                <option value="Doge">Doge - ${currency}${Number(BitcoinCash)}</option>
                                <option value="USDT">USDT - ${currency}${Number(Doge)}</option>
                                <option value="XRP">XRP - ${currency}${Number(RIPPLE)}</option>
                              </select>`;
            secondSelect.insertAdjacentHTML('beforeend', c);

            const from = document.querySelector("#from");
            const to = document.querySelector("#to");
            const form = document.querySelector("#form");

            form.addEventListener('submit', function (e) {
                e.preventDefault();
                setLoaderWithCustom(button, 'Loading..');

                let hasError = false;

                setTimeout(() => {
                    if (from.value === to.value) {
                        Toasty.showToast('danger', 'You cannot swap a coin to the same coin');
                        unSetLoader(button, 'Swap Now');
                        hasError = true;
                    }

                    if (amount.value === '') {
                        Toasty.showToast('danger', 'Amount to be swapped cannot be empty');
                        unSetLoader(button, 'Swap Now');
                        hasError = true;
                    }

                    let coin;
                    if (from.value === 'Bitcoin') {
                        coin = Bitcoin;
                    } else if (from.value === 'Ethereum') {
                        coin = Etheruem;
                    } else if (from.value === 'BitcoinCash') {
                        coin = USDT;
                    } else if (from.value === 'Doge') {
                        coin = BitcoinCash;
                    } else if (from.value === 'USDT') {
                        coin = Doge;
                    } else if (from.value === 'XRP') {
                        coin = RIPPLE;
                    }

                    if (amount.value > Number(coin)) {
                        Toasty.showToast('danger', 'Request cannot be processed: amount greater than coin amount');
                        unSetLoader(button, 'Swap Now');
                        hasError = true;
                    }

                    if (!hasError) {
                        const formData = new FormData(this);
                        formData.append('id', id);
                        axios
                            .post("../newApi/api/task/swap", formData)
                            .then(function (response) {
                                const result = response.data;
                                if (response.status === 201) {
                                    if (result.message === 'true') {
                                        Toasty.showToast('success', 'Your swap has been proccessed successfully');
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
                                unSetLoader(button, 'Swap Now');
                            });
                    }
                }, 3000);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
});
