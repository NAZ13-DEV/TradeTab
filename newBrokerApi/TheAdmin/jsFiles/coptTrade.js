const userId = localStorage.getItem('uId')
    ? localStorage.getItem('uId')
    : null;
document.querySelectorAll('.copy-trader-btn').forEach(button => {
    button.addEventListener('click', function (e) {
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
            axios.post('../newApi/api/task/copyTrade', data)
                .then(response => {
                    const result = response.data;
                    if (response.status === 201) {
                        if (result.message === 'true') {
                            button.textContent = 'Trader Copied';
                            setTimeout(() => {
                                button.disabled = true;
                                button.textContent = 'subscribed';
                                button.style.background = "red";
                            }, 3000);
                        }
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                }).finally(function () {
                    unSetLoader(button, ' Copy Trader');
                });
        }, 3000);
    });
});