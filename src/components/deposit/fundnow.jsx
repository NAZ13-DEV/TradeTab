/* eslint-disable react/prop-types */
import api from '../../redux/slices/api';
import toast, { Toaster } from 'react-hot-toast';

const FundNow = ({
  amount,
  method,
  wallet,
  setWallet,
  isLoading,
  setMethod,
  setAmount,
  setIsLoading,
  setCurrentState,
  setCoinValue,
  setMethodSign,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (amount.trim() === '') {
      toast.error('Amount field cannot be empty. Please enter an amount to deposit.');
      return setIsLoading(false);
    }

    if (isNaN(amount)) {
      toast.error('Invalid amount. Please enter a numeric value.');
      return setIsLoading(false);
    }

    if (method.trim() === '') {
      toast.error('Deposit method field cannot be empty. Please choose a method.');
      return setIsLoading(false);
    }

    setIsLoading(true);
    try {
      const { status, data } = await api.get('fetchWallet');
      if (status === 201) {
        const { bitcoin, ethereum, tether } = data.message;
        const cryptoSymbol = method.toLowerCase();

        if (method === 'bitcoin') setWallet(bitcoin);
        if (method === 'ethereum') setWallet(ethereum);
        if (method === 'tether') setWallet(tether);

        if (cryptoSymbol) {
          const cryptoDataResponse = await fetch(
            `https://api.coingecko.com/api/v3/coins/${cryptoSymbol}`
          );
          const cryptoData = await cryptoDataResponse.json();

          const price = cryptoData.market_data.current_price.usd;
          const bitcoinFraction = amount / price;
          setCoinValue(bitcoinFraction);
          setMethodSign(cryptoData.symbol);

          const requestData = {
            cryptovalue: bitcoinFraction,
            cryptoAmt: amount,
            netWork: method,
            sessionGetUserID: localStorage.getItem('uId'),
            companyWallet: wallet,
            selectedPlan: null,
            createdAt: new Date().toLocaleString('en-US', {
              timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,}),
          };

          const depositResponse = await api.post('depositPage', requestData);
          if (depositResponse.status === 201) {
            const readResult = depositResponse.data.message;
            if (readResult.message === 'true') {
              toast.success(`Your deposit has been successfully recorded. Please proceed to pay ${amount} USD, equivalent to ${bitcoinFraction.toFixed(4)} ${method.toUpperCase()}.`);
              setTimeout(() => {
                setCurrentState('CopyWallet');
              }, 3000);
            }
          }
        }
      }
    } catch (error) {
      if (error.response?.status === 422) {
        const message = error.response.data?.errors?.[0] || "Validation failed.";
        toast.error(message);
      }
       else {
        console.error(error);
        toast.error('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
    
  };

  return (
    <div className="col-span-12 p-4 bg-Primary-bg rounded-xl lg:px-7 lg:py-4 xl:col-span-12">
      <Toaster position="top-center" />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 scrollable-container">
          <div className="w-full h-[300px] lg:h-[300px]">
            <h5 className="text-base text-customGreen font-bold leading-[24px] mb-3 text-center">
              Fund Your Account
            </h5>

            <div className="mt-6">
              <input
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10"
              />
            </div>

            <div className="flex gap-5 mt-6">
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="flex-1 items-center outline-none h-[4rem] w-full rounded-lg text-Neutral-6 bg-Primary-3 text-left sm:text-sm cursor-pointer px-4 py-5"
              >
                <option value="bitcoin">Bitcoin</option>
                <option value="ethereum">Ethereum Erc20</option>
                <option value="tether">Usdt Erc20</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-4 px-4 py-2 text-white font-semibold leading-[18px] border border-Neutral-8 rounded-lg hover:bg-Neutral-8"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Fund Now'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FundNow;
