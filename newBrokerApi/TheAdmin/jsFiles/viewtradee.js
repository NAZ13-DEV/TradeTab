document.addEventListener('DOMContentLoaded', function () {
    const alltraders = document.querySelector("#alltraders");
    const userId = localStorage.getItem('uId') ? localStorage.getItem('uId') : null;
    let trader = '';

    // Fetch traders
    axios.get(`../api/task/ctraders`)
        .then((res) => {
            if (res.status === 201) {
                const readResult = res.data.message;
                readResult.forEach(e => {
                    const { id, traderName, traderNameAbb, winRate } = e;
                    trader += `
                        <div class="nk-tb-item">
                            <div class="nk-tb-col">
                                <div class="align-center">
                                    <div class="user-avatar" style="text-align: center; background-color: #3a25a7;">
                                        <span>${traderNameAbb}</span>
                                    </div>
                                    <span class="tb-sub ms-2">
                                        ${traderName}
                                        <img src="verified (1).png" style="width: 20px" />
                                    </span>
                                </div>
                            </div>
                            <div class="nk-tb-col" style="text-align: center">
                                <span class="tb-sub tb-amount" style="text-align: center">${winRate}%</span>
                            </div>
                            <div class="nk-tb-col">
                                <button class="btn btn-primary copy-trader-btn"
                                    style="background-color: black; padding: 7px; border-radius: 6px; border: none;" data-name="${traderName}"
                                    data-percentage="${winRate}" data-abbr="${traderNameAbb}">
                                    Copy Trader
                                </button>
                            </div>
                        </div>
                    `;
                });

                alltraders.insertAdjacentHTML('beforeend', trader);

                // Fetch subscribed traders
                axios.get(`../api/task/fetchcopiedtrade/${userId}`)
                    .then((res) => {
                        if (res.status === 201) {
                            const subscribedTraders = res.data.message.map(e => ({
                                id: e.id,
                                traderName: e.traderName
                            }));

                            // Update buttons based on subscription status
                            document.querySelectorAll('.copy-trader-btn').forEach(button => {
                                const traderName = button.getAttribute('data-name');
                                const subscribedTrader = subscribedTraders.find(trader => trader.traderName === traderName);

                                if (subscribedTrader) {
                                    button.textContent = 'unsubscribe';
                                    button.style.background = "red";
                                    button.setAttribute('data-id', subscribedTrader.id);
                                }
                            });
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                // Add event listeners to buttons
                document.querySelectorAll('.copy-trader-btn').forEach(button => {
                    button.addEventListener('click', function () {
                        const copiedtradeid = button.getAttribute('data-id');

                        if (this.textContent === 'unsubscribe') {
                            // Check if `data-id` exists before sending DELETE request
                            if (copiedtradeid) {
                                axios.delete(`../api/task/unsubscribe/${copiedtradeid}`)
                                    .then(response => {
                                        if (response.status === 201 && response.data.message === 'true') {
                                            button.textContent = 'Copy Trader';
                                            button.style.background = "black";
                                            button.removeAttribute('data-id'); // Optionally remove data-id
                                            location.reload();
                                        }
                                    })
                                    .catch(error => {
                                        console.error('Error:', error);
                                    });
                            } else {
                                console.error('Error: No valid ID found for unsubscribing');
                            }
                        } else {
                            // Handle subscription
                            setLoaderWithCustom(button, 'Loading..');
                            setTimeout(() => {
                                const name = this.getAttribute('data-name');
                                const percentage = this.getAttribute('data-percentage');
                                const abbr = this.getAttribute('data-abbr');
                                const data = {
                                    traderName: name,
                                    winRate: percentage,
                                    abbr: abbr,
                                    userId: userId
                                };
                                axios.post('../api/task/copyTrade', data)
                                    .then(response => {
                                        const result = response.data;
                                        if (response.status === 201 && result.message === 'true') {
                                            button.textContent = 'Trader Copied';
                                            setTimeout(() => {
                                                button.textContent = 'unsubscribe';
                                                button.style.background = "red";
                                                button.setAttribute('data-id', result.tradeId);
                                                location.reload();
                                            }, 3000);
                                        }
                                    })
                                    .catch(error => {
                                        console.error('Error:', error);
                                    }).finally(function () {
                                        unSetLoader(button, 'Copy Trader');
                                    });
                            }, 3000);
                        }
                    });
                });

            }
        })
        .catch(function (error) {
            console.log(error);
        });
});
