/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
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
  plan,
  min,
  max,
  user
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currency = user?.currency || '$';

    if (!user) return toast.error("User not loaded. Please wait...");
    if (amount.trim() === '') return toast.error('Amount field cannot be empty.');
    if (isNaN(amount)) return toast.error('Invalid amount. Enter a number.');

    const numericAmount = parseFloat(amount);
    if (numericAmount < min || numericAmount > max) {
      return toast.error(`Amount must be between ${currency}${min} and ${currency}${max}.`);
    }

    if (method.trim() === '') return toast.error('Please choose a deposit method.');

    setIsLoading(true);

    try {
      const walletResponse = await api.get('fetchWallet');
      if (walletResponse.status === 201) {
        const { bitcoin, ethereum, tether } = walletResponse.data.message;
        const lowerMethod = method.toLowerCase();
        if (lowerMethod === 'bitcoin') setWallet(bitcoin);
        if (lowerMethod === 'ethereum') setWallet(ethereum);
        if (lowerMethod === 'tether') setWallet(tether);

        const cryptoDataResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${lowerMethod}`
        );
        const cryptoData = await cryptoDataResponse.json();
        const price = cryptoData.market_data.current_price.usd;
        const cryptoAmount = numericAmount / price;

        setCoinValue(cryptoAmount);
        setMethodSign(cryptoData.symbol);

        const payload = {
          cryptovalue: cryptoAmount,
          cryptoAmt: numericAmount,
          netWork: method,
          sessionGetUserID: localStorage.getItem('uId'),
          companyWallet: wallet,
          selectedPlan: plan,
        };

        const depositResponse = await api.post('plandepositPage', payload);

        if (depositResponse.status === 201 && depositResponse.data.message?.message === 'true') {
          toast.success(
            `Deposit recorded. Pay ${currency}${numericAmount} ≈ ${cryptoAmount.toFixed(4)} ${method.toUpperCase()}`
          );
          setTimeout(() => setCurrentState('CopyWallet'), 3000);
        }
      }
    } catch (error) {
      if (error.response?.status === 422) {
        toast.error(error.response.data.errors[0]);
      } else {
        console.error(error);
        toast.error('An error occurred. Try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="col-span-12">
      <Toaster position="top-center" />
      <form onSubmit={handleSubmit} className="mx-auto w-full space-y-6 md:w-full px-2 sm:px-4">
        <div className="text-center">
          <h5 className="text-xl font-semibold text-emerald-400">Subscribe to a Plan</h5>
          <p className="text-white text-sm mt-1">
            Selected Plan: <span className="font-bold">{plan}</span>
          </p>
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-1">Enter Amount</label>
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[#0F1C3F] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-1">Choose Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[#0F1C3F] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">-- Select Method --</option>
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum ERC20</option>
            <option value="tether">USDT ERC20</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Fund Now'}
        </button>
      </form>
    </div>
  );
};

export default FundNow;
