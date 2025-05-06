/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { saveTradeData, clearState } from '../../redux/slices/setTradeSlice';
import { fetchUserDetails } from '../../redux/slices/fetchUserSlice';

const CyptoPair = ({
  formFields,
  sellForm,
  setFormFields,
  setSellForm,
  selectedOption,
  setSelectedOption,
  buyFormRef,
  sellFormRef,
  onSuccess, // pass function to navigate to dashboard
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.fetchUserDetails);
  const { loadingTrade, Tradeerror, tradeSuccess } = useSelector(
    (state) => state.processTrade
  );

  const setFieldValue = (field, value) => {
    setFormFields((prev) => ({ ...prev, [field]: value }));
  };

  const setSellFieldValue = (field, value) => {
    setSellForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('uId');
    setFieldValue('userId', storedUserId);
    setSellFieldValue('userId', storedUserId);
    setFieldValue('symbol', 'BCH/BTC');
    setSellFieldValue('symbol', 'BCH/BTC');
    setFieldValue('tradingPair', 'Crypto Pairs');
    setSellFieldValue('tradingPair', 'Crypto Pairs');
    setFieldValue('tradeType', 'buy');
    setSellFieldValue('tradeType', 'sell');
    dispatch(fetchUserDetails(storedUserId));
  }, [dispatch]);

  const validateFields = (data) => {
    if (!data.amount || isNaN(data.amount)) return 'Amount is required and must be a number.';
    if (!data.stopLoss || isNaN(data.stopLoss)) return 'Stop Loss is required and must be a number.';
    if (!data.takeProfit || isNaN(data.takeProfit)) return 'Take Profit is required and must be a number.';
    if (!data.entryPrice || isNaN(data.entryPrice)) return 'Entry Price is required and must be a number.';
    if (parseFloat(data.amount) > parseFloat(user.balance)) return 'Insufficient balance.';
    return null;
  };

  const handleSubmit = (e, isBuy = true) => {
    e.preventDefault();
    const data = isBuy ? formFields : sellForm;
    const error = validateFields(data);
    if (error) return toast.error(error);
    dispatch(saveTradeData(data));
  };

  useEffect(() => {
    if (loadingTrade) toast.loading('Processing the trade...', { id: 'tradeToast' });
    else toast.dismiss('tradeToast');

    if (Tradeerror) {
      toast.error(Tradeerror, { id: 'tradeErrorToast' });
      dispatch(clearState());
    }

    if (tradeSuccess) {
      toast.success('Trade Successful!', { id: 'tradeSuccessToast' });

      const storedUserId = localStorage.getItem('uId');
      const resetFields = {
        amount: '',
        symbol: 'BCH/BTC',
        interval: '60',
        leverage: '0.5X',
        stopLoss: '',
        takeProfit: '',
        entryPrice: '',
        tradeType: '',
        tradingPair: 'Crypto Pairs',
        userId: storedUserId,
        trade: null
      };

      setFormFields({ ...resetFields, tradeType: 'buy' });
      setSellForm({ ...resetFields, tradeType: 'sell' });

      dispatch(clearState());
      setTimeout(() => {
        if (typeof onSuccess === 'function') onSuccess();
      }, 3000);
    }
  }, [loadingTrade, Tradeerror, tradeSuccess, dispatch, setFormFields, setSellForm, onSuccess]);

  return (
    <div className='grid grid-cols-12 gap-6 mt-6 forex-form-theme'>
      <Toaster position='top-center' />
      {/* You can keep the rest of your UI unchanged, including the Buy and Sell sections */}
      <div className='col-span-12 p-4 bg-Primary-bg rounded-xl lg:px-7 lg:py-6 xl:col-span-6'>
        <form onSubmit={(e) => handleSubmit(e, false)} ref={buyFormRef}>
          <div className='flex flex-wrap items-center justify-between gap-3 mb-6 scrollable-container'>
            <div className='h-[700px] lg:h-[700px] w-full'>
              {/* Embed TradingView Widget */}
              <h5 className='text-base text-customGreen font-bold leading-[24px] mb-3 text-center'>
                Quick Buy
              </h5>
              <div className='mt-6'>
                <input
                  type='text'
                  placeholder='Amount'
                  className='w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10'
                  value={formFields.amount}
                  onChange={(e) => setFieldValue('amount', e.target.value)}
                />
              </div>
              <div className='flex gap-5 mt-6'>
                <select
                  className='flex-1  items-center outline-none h-[4rem] relative w-full rounded-lg text-Neutral-6 bg-Primary-3 text-left sm:text-sm cursor-pointer px-4 py-5'
                  name='trading'
                  id='marketOrderSelect'
                  value={formFields.symbol}
                  onChange={(e) => setFieldValue('symbol', e.target.value)}
                >
                   <option value="BCH/BTC">BCH/BTC</option>
                            <option value="BCH/EUR">BCH/EUR</option>
                            <option value="BCH/GBP">BCH/GBP</option>
                            <option value="BTC-EOS">BTC-EOS</option>
                            <option value="BTC/EUR">BTC/EUR</option>
                            <option value="BTC/GBP">BTC/GBP</option>
                            <option value="BTC/USD">BTC/USD</option>
                            <option value="BTC/USDC">BTC/USDC</option>
                            <option value="EOS/BTC">EOS/BTC</option>
                            <option value="EOS/EUR">EOS/EUR</option>
                            <option value="EOS/USD">EOS/USD</option>
                            <option value="ETC/BTC">ETC/BTC</option>
                            <option value="ETC/EUR">ETC/EUR</option>
                            <option value="ETC/GBP">ETC/GBP</option>
                            <option value="ETC/USD">ETC/USD</option>
                            <option value="ETH/BTC">ETH/BTC</option>
                            <option value="ETH/EUR">ETH/EUR</option>
                            <option value="ETH/GBP">ETH/GBP</option>
                            <option value="ETH/USD">ETH/USD</option>
                            <option value="LTC/BTC">LTC/BTC</option>
                            <option value="LTC/EUR">LTC/EUR</option>
                            <option value="LTC/GBP">LTC/GBP</option>
                            <option value="LTC/USD">LTC/USD</option>
                            <option value="MKR/BTC">MKR/BTC</option>
                            <option value="PCP-BTC">PCP-BTC</option>
                            <option value="PCP-BTC">REP/BTC</option>
                            <option value="REP/USD">REP/USD</option>
                            <option value="TXR/GBP">TXR/GBP</option>
                            <option value="XLM/BTC">XLM/BTC</option>
                            <option value="XLM/EUR">XLM/EUR</option>
                            <option value="XLM/USD">XLM/USD</option>
                            <option value="XRP/BTC">XRP/BTC</option>
                            <option value="XRP/EUR">XRP/EUR</option>
                            <option value="XRP/USD">XRP/USD</option>
                            <option value="ZEC/BTC">ZEC/BTC</option>
                            <option value="ZRX/BTC">ZRX/BTC</option>
                            <option value="ZRX/EUR">ZRX/EUR</option>
                            <option value="ZRX/USD">ZRX/USD</option>
                            <option value="C/USDT">C/USDT</option>
                            <option value="XAI/USDT">XAI/USDT</option>
                            <option value="STX/USDT">STX/USDT</option>
                            <option value="LINK/USDT">LINK/USDT</option>
                            <option value="FTM/USDT">FTM/USDT</option>
                            <option value="AI/USDT">AI/USDT</option>
                            <option value="JUP/USDT">JUP/USDT</option>
                            <option value="ACE/USDT">ACE/USDT</option>
                            <option value="CAKE/USDT">CAKE/USDT</option>
                            <option value="RON/USDT">RON/USDT</option>
                            <option value="JASMY/USDT">JASMY/USDT</option>
                            <option value="MANTA/USDT">MANTA/USDT</option>
                            <option value="MANA/USDT">MANA/USDT</option>
                            <option value="FLOKI/TRY">FLOKI/TRY</option>
                            <option value="UNI/USDT">UNI/USDT</option>
                            <option value="SLP/USDT">SLP/USDT</option>
                            <option value="CTXC/USDT">CTXC/USDT</option>
                            <option value="TIA/USDT">TIA/USDT</option>
                            <option value="ZRX/USDT">ZRX/USDT</option>
                            <option value="MINA/USDT">MINA/USDT</option>
                            <option value="BTC/USDC">BTC/USDC</option>
                            <option value="LUNC/USDT">LUNC/USDT</option>
                            <option value="PHB/USDT">PHB/USDT</option>
                            <option value="ATOM/USDT">ATOM/USDT</option>
                            <option value="ID/USDT">ID/USDT</option>
                            <option value="PYTH/USDT">PYTH/USDT</option>
                            <option value="AR/USDT">AR/USDT</option>
                            <option value="INJ/USDT">INJ/USDT</option>
                            <option value="VANRY/USDT">VANRY/USDT</option>
                            <option value="BCH/USDT">BCH/USDT</option>
                            <option value="CKB/USDT">CKB/USDT</option>
                            <option value="ETC/USDT">ETC/USDT</option>
                            <option value="APT/USDT">APT/USDT</option>
                            <option value="LPT/USDT">LPT/USDT</option>
                            <option value="ICP/USDT">ICP/USDT</option>
                            <option value="SC/USDT">SC/USDT</option>
                            <option value="ILV/USDT">ILV/USDT</option>
                            <option value="MAGIC/USDT">MAGIC/USDT</option>
                            <option value="DYDX/USDT">DYDX/USDT</option>
                            <option value="SHIB/TRY">SHIB/TRY</option>
                            <option value="BNB/BTC">BNB/BTC</option>
                            <option value="PEOPLE/USDT">PEOPLE/USDT</option>
                            <option value="APE/USDT">APE/USDT</option>
                            <option value="XRP/FDUSD">XRP/FDUSD</option>
                            <option value="GALA/TRY">GALA/TRY</option>
                            <option value="PEPE/TRY">PEPE/TRY</option>
                            <option value="EUR/USDT">EUR/USDT</option>
                            <option value="POLYX/USDT">POLYX/USDT</option>
                            <option value="DYM/USDT">DYM/USDT</option>
                            <option value="CHR/USDT">CHR/USDT</option>
                            <option value="BTC/FDUSD">BTC/FDUSD</option>
                            <option value="BTC/USDT">BTC/USDT</option>
                            <option value="FDUSD/USDT">FDUSD/USDT</option>
                            <option value="ETH/USDT">ETH/USDT</option>
                            <option value="ETH/FDUSD">ETH/FDUSD</option>
                            <option value="BNB/FDUSD">BNB/FDUSD</option>
                            <option value="BNB/USDT">BNB/USDT</option>
                            <option value="DOGE/USDT">DOGE/USDT</option>
                            <option value="PEPE/USDT">PEPE/USDT</option>
                            <option value="SHIB/USDT">SHIB/USDT</option>
                            <option value="WLD/USDT">WLD/USDT</option>
                            <option value="SOL/USDT">SOL/USDT</option>
                            <option value="GALA/USDT">GALA/USDT</option>
                            <option value="USDC/USDT">USDC/USDT</option>
                            <option value="PIXEL/USDT">PIXEL/USDT</option>
                            <option value="DOGE/FDUSD">DOGE/FDUSD</option>
                            <option value="FLOKI/USDT">FLOKI/USDT</option>
                            <option value="RUNE/USDT">RUNE/USDT</option>
                            <option value="SOL/FDUSD">SOL/FDUSD</option>
                            <option value="XRP/USDT">XRP/USDT</option>
                            <option value="ARKM/USDT">ARKM/USDT</option>
                            <option value="RNDR/USDT">RNDR/USDT</option>
                            <option value="YGG/USDT">YGG/USDT</option>
                            <option value="FET/USDT">FET/USDT</option>
                            <option value="STRK/USDT">STRK/USDT</option>
                            <option value="IQ/USDT">IQ/USDT</option>
                            <option value="ARB/USDT">ARB/USDT</option>
                            <option value="MATIC/USDT">MATIC/USDT</option>
                            <option value="GRT/USDT">GRT/USDT</option>
                            <option value="BONK/USDT">BONK/USDT</option>
                            <option value="SAND/USDT">SAND/USDT</option>
                            <option value="GMT/USDT">GMT/USDT</option>
                            <option value="FIL/USDT">FIL/USDT</option>
                            <option value="USDT/TRY">USDT/TRY</option>
                            <option value="WIF/USDT">WIF/USDT</option>
                            <option value="NEAR/USDT">NEAR/USDT</option>
                            <option value="SUI/USDT">SUI/USDT</option>
                            <option value="PORTAL/USDT">PORTAL/USDT</option>
                            <option value="AGIX/USDT">AGIX/USDT</option>
                            <option value="AVAX/USDT">AVAX/USDT</option>
                            <option value="SEI/USDT">SEI/USDT</option>
                            <option value="ALT/USDT">ALT/USDT</option>
                            <option value="AXS/USDT">AXS/USDT</option>
                            <option value="ETH/BTC">ETH/BTC</option>
                            <option value="NFP/USDT">NFP/USDT</option>
                            <option value="OP/USDT">OP/USDT</option>
                            <option value="ADA/USDT">ADA/USDT</option>
                            <option value="ORDI/USDT">ORDI/USDT</option>
                            <option value="MEME/USDT">MEME/USDT</option>
                            <option value="DOT/USDT">DOT/USDT</option>
                            <option value="CHR/USDT">CHR/USDT</option>
                            <option value="OCEAN/USDT">OCEAN/USDT</option>
                            <option value="NMR/USDT">NMR/USDT</option>
                            <option value="MKR/USDT">MKR/USDT</option>
                            <option value="DOGE/BTC">DOGE/BTC</option>
                            <option value="VET/USDT">VET/USDT</option>
                            <option value="MTL/USDT">MTL/USDT</option>
                            <option value="MASK/USDT">MASK/USDT</option>
                            <option value="PIXEL/TRY">PIXEL/TRY</option>
                            <option value="GLM/USDT">GLM/USDT</option>
                            <option value="VOXEL/USDT">VOXEL/USDT</option>
                            <option value="CHZ/USDT">CHZ/USDT</option>
                            <option value="THETA/USDT">THETA/USDT</option>
                            <option value="SOL/BTC">SOL/BTC</option>
                            <option value="JTO/USDT">JTO/USDT</option>
                            <option value="TRX/USDT">TRX/USDT</option>
                            <option value="ICX/USDT">ICX/USDT</option>
                            <option value="CYBER/USDT">CYBER/USDT</option>
                            <option value="BEAM/USDT">BEAM/USDT</option>
                            <option value="DAR/USDT">DAR/USDT</option>
                            <option value="MBOX/USDT">MBOX/USDT</option>
                            <option value="ENS/USDT">ENS/USDT</option>
                            <option value="ALICE/USDT">ALICE/USDT</option>
                            <option value="PROS/USDT">PROS/USDT</option>
                            <option value="BONK/TRY">BONK/TRY</option>
                            <option value="ENJ/USDT">ENJ/USDT</option>
                            <option value="COTI/USDT">COTI/USDT</option>
                            <option value="BLUR/USDT">BLUR/USDT</option>
                            <option value="BTC/TUSD">BTC/TUSD</option>
                            <option value="TLM/USDT">TLM/USDT</option>
                            <option value="CRV/USDT">CRV/USDT</option>
                            <option value="FLOW/USDT">FLOW/USDT</option>
                            <option value="EOS/USDT">EOS/USDT</option>
                            <option value="FET/BTC">FET/BTC</option>
                            <option value="CFX/USDT">CFX/USDT</option>
                            <option value="IMX/USDT">IMX/USDT</option>
                            <option value="HBAR/USDT">HBAR/USDT</option>
                            <option value="GAL/USDT">GAL/USDT</option>
                            <option value="FUN/USDT">FUN/USDT</option>
                            <option value="ROSE/USDT">ROSE/USDT</option>
                            <option value="RLC/USDT">RLC/USDT</option>
                            <option value="LEVER/USDT">LEVER/USDT</option>
                            <option value="GLMR/USDT">GLMR/USDT</option>
                            <option value="AAVE/USDT">AAVE/USDT</option>
                            <option value="BAKE/USDT">BAKE/USDT</option>
                            <option value="RDNT/USDT">RDNT/USDT</option>
                            <option value="WAVES/USDT">WAVES/USDT</option>
                            <option value="ZIL/USDT">ZIL/USDT</option>
                            <option value="DOGE/TRY">DOGE/TRY</option>
                            <option value="ALGO/USDT">ALGO/USDT</option>
                            <option value="ALPHA/BTC">ALPHA/BTC</option>
                            <option value="EOS/TRY">EOS/TRY</option>
                            <option value="AST/BTC">AST/BTC</option>
                            <option value="LTC/TRY">LTC/TRY</option>
                            <option value="USDT/RON">USDT/RON</option>
                            <option value="LTC/EUR">LTC/EUR</option>
                            <option value="TUSD/TRY">TUSD/TRY</option>
                            <option value="CTK/BNB">CTK/BNB</option>
                            <option value="ANKR/BTC">ANKR/BTC</option>
                            <option value="IMX/BTC">IMX/BTC</option>
                            <option value="NEAR/EUR">NEAR/EUR</option>
                            <option value="ATOM/FDUSD">ATOM/FDUSD</option>

                </select>
                <button
                  className='p-2 text-white rounded-lg basis-1/10 bg-customGreen'
                  type='button'
                >
                  Symbol
                </button>
              </div>
              <div className='flex gap-5 mt-6'>
                <select
                  className='flex-1  items-center outline-none h-[4rem] relative w-full rounded-lg text-Neutral-6 bg-Primary-3 text-left sm:text-sm cursor-pointer px-4 py-5'
                  name='trading'
                  id='marketOrderSelect'
                  value={formFields.interval}
                  onChange={(e) => setFieldValue('interval', e.target.value)}
                >
                  <option value='60'>1 min</option>
                  <option value='180'>3 min</option>
                  <option value='300'>5 min</option>
                  <option value='900'>15 mins</option>
                  <option value='1800'>30 mins</option>
                  <option value='3600'>1 hr</option>
                  <option value='7200'>2 hr</option>
                  <option value='86400'>1 day</option>
                </select>
                <button
                  className='p-2 text-white rounded-lg basis-1/10 bg-customGreen'
                  type='button'
                >
                  TIME INTERVAL
                </button>
              </div>
          
              <div className='flex gap-5 mt-6'>
                <input
                  type='text'
                  placeholder='0.0000'
                  className='w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10'
                  value={formFields.entryPrice}
                  onChange={(e) => setFieldValue('entryPrice', e.target.value)}
                />
                <button
                  className='p-2 text-white rounded-lg bg-customGreen'
                  type='button'
                >
                  Entry Price
                </button>
              </div>
              <div className='flex gap-5 mt-6'>
                <select
                  className='flex-1  items-center outline-none h-[4rem] relative w-full rounded-lg text-Neutral-6 bg-Primary-3 text-left sm:text-sm cursor-pointer px-4 py-5'
                  name='trading'
                  id='marketOrderSelect'
                  value={formFields.leverage}
                  onChange={(e) => setFieldValue('leverage', e.target.value)}
                >
                  <option
                    value='0.5X'
                    data-rate='high_sell'
                    data-buy=''
                    data-sell='3'
                  >
                    0.5X
                  </option>
                  <option
                    value='1X'
                    data-rate='high_sell'
                    data-buy=''
                    data-sell='3'
                  >
                    1.0X
                  </option>
                  <option
                    value='1.5X'
                    data-rate='high_sell'
                    data-buy=''
                    data-sell='3'
                  >
                    1.5X
                  </option>
                  <option
                    value='2X'
                    data-rate='high_sell'
                    data-buy=''
                    data-sell='3'
                  >
                    2.0X
                  </option>
                  <option
                    value='5X'
                    data-rate='high_sell'
                    data-buy=''
                    data-sell='3'
                  >
                    5X
                  </option>
                  <option
                    value='10X'
                    data-rate='high_sell'
                    data-buy=''
                    data-sell='3'
                  >
                    10X
                  </option>
                </select>
                <button
                  className='p-2 text-white rounded-lg basis-1/10 bg-customGreen'
                  type='button'
                >
                  TRADE LEVERAGE
                </button>
              </div>
                   <div className='flex gap-5 mt-6'>
                <input
                  type='text'
                  placeholder='0.0000'
                  className='w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10'
                  value={formFields.takeProfit}
                  onChange={(e) => setFieldValue('takeProfit', e.target.value)}
                />
                <button
                  className='p-2 text-white rounded-lg bg-customGreen'
                  type='button'
                >
                 TP[TAKE PROFIT]
                </button>
              </div>
              <div className='flex gap-5 mt-6'>
                <input
                  type='text'
                  placeholder='0.0000'
                  className='w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10'
                  value={formFields.stopLoss}
                  onChange={(e) => setFieldValue('stopLoss', e.target.value)}
                />
                <button
                  className='p-2 text-white rounded-lg bg-customGreen'
                  type='button'
                >
                  SL [STOP LOSS]
                </button>
              </div>
 
              <div className='flex gap-5 mt-6'>
                <button
                  type='submit'
                  className='mt-4 px-4 py-2 text-white font-semibold leading-[18px] border border-Neutral-8 rounded-lg hover:bg-Neutral-8 w-full'
                  disabled={isLoading}
                >
                  {isLoading ? 'Placing Trade...' : 'Buy'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className='col-span-12 p-4 bg-Primary-bg rounded-xl lg:px-7 lg:py-6 xl:col-span-6'>
        <form onSubmit={(e) => handleSubmit(e, true)}  ref={sellFormRef}>
          <Toaster position='top-center' />
          <div className='flex flex-wrap items-center justify-between gap-3 mb-6 scrollable-container'>
            <div className='h-[700px] lg:h-[700px] w-full'>
              {/* Embed TradingView Widget */}
              <h5 className='text-base text-customRed font-bold leading-[24px] mb-3 text-center'>
                Quick Sell
              </h5>
              <div className='mt-6'>
                <input
                  type='text'
                  placeholder='Amount'
                  className='w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10'
                  value={sellForm.amount}
                  onChange={(e) => setSellFieldValue('amount', e.target.value)}
                />
              </div>
              <div className='flex gap-5 mt-6'>
                <select
                  className='flex-1  items-center outline-none h-[4rem] relative w-full rounded-lg text-Neutral-6 bg-Primary-3 text-left sm:text-sm cursor-pointer px-4 py-5'
                  name='trading'
                  id='marketOrderSelect'
                  value={sellForm.symbol}
                  onChange={(e) => setSellFieldValue('symbol', e.target.value)}
                >
                  <option value="BCH/BTC">BCH/BTC</option>
                            <option value="BCH/EUR">BCH/EUR</option>
                            <option value="BCH/GBP">BCH/GBP</option>
                            <option value="BTC-EOS">BTC-EOS</option>
                            <option value="BTC/EUR">BTC/EUR</option>
                            <option value="BTC/GBP">BTC/GBP</option>
                            <option value="BTC/USD">BTC/USD</option>
                            <option value="BTC/USDC">BTC/USDC</option>
                            <option value="EOS/BTC">EOS/BTC</option>
                            <option value="EOS/EUR">EOS/EUR</option>
                            <option value="EOS/USD">EOS/USD</option>
                            <option value="ETC/BTC">ETC/BTC</option>
                            <option value="ETC/EUR">ETC/EUR</option>
                            <option value="ETC/GBP">ETC/GBP</option>
                            <option value="ETC/USD">ETC/USD</option>
                            <option value="ETH/BTC">ETH/BTC</option>
                            <option value="ETH/EUR">ETH/EUR</option>
                            <option value="ETH/GBP">ETH/GBP</option>
                            <option value="ETH/USD">ETH/USD</option>
                            <option value="LTC/BTC">LTC/BTC</option>
                            <option value="LTC/EUR">LTC/EUR</option>
                            <option value="LTC/GBP">LTC/GBP</option>
                            <option value="LTC/USD">LTC/USD</option>
                            <option value="MKR/BTC">MKR/BTC</option>
                            <option value="PCP-BTC">PCP-BTC</option>
                            <option value="PCP-BTC">REP/BTC</option>
                            <option value="REP/USD">REP/USD</option>
                            <option value="TXR/GBP">TXR/GBP</option>
                            <option value="XLM/BTC">XLM/BTC</option>
                            <option value="XLM/EUR">XLM/EUR</option>
                            <option value="XLM/USD">XLM/USD</option>
                            <option value="XRP/BTC">XRP/BTC</option>
                            <option value="XRP/EUR">XRP/EUR</option>
                            <option value="XRP/USD">XRP/USD</option>
                            <option value="ZEC/BTC">ZEC/BTC</option>
                            <option value="ZRX/BTC">ZRX/BTC</option>
                            <option value="ZRX/EUR">ZRX/EUR</option>
                            <option value="ZRX/USD">ZRX/USD</option>
                            <option value="C/USDT">C/USDT</option>
                            <option value="XAI/USDT">XAI/USDT</option>
                            <option value="STX/USDT">STX/USDT</option>
                            <option value="LINK/USDT">LINK/USDT</option>
                            <option value="FTM/USDT">FTM/USDT</option>
                            <option value="AI/USDT">AI/USDT</option>
                            <option value="JUP/USDT">JUP/USDT</option>
                            <option value="ACE/USDT">ACE/USDT</option>
                            <option value="CAKE/USDT">CAKE/USDT</option>
                            <option value="RON/USDT">RON/USDT</option>
                            <option value="JASMY/USDT">JASMY/USDT</option>
                            <option value="MANTA/USDT">MANTA/USDT</option>
                            <option value="MANA/USDT">MANA/USDT</option>
                            <option value="FLOKI/TRY">FLOKI/TRY</option>
                            <option value="UNI/USDT">UNI/USDT</option>
                            <option value="SLP/USDT">SLP/USDT</option>
                            <option value="CTXC/USDT">CTXC/USDT</option>
                            <option value="TIA/USDT">TIA/USDT</option>
                            <option value="ZRX/USDT">ZRX/USDT</option>
                            <option value="MINA/USDT">MINA/USDT</option>
                            <option value="BTC/USDC">BTC/USDC</option>
                            <option value="LUNC/USDT">LUNC/USDT</option>
                            <option value="PHB/USDT">PHB/USDT</option>
                            <option value="ATOM/USDT">ATOM/USDT</option>
                            <option value="ID/USDT">ID/USDT</option>
                            <option value="PYTH/USDT">PYTH/USDT</option>
                            <option value="AR/USDT">AR/USDT</option>
                            <option value="INJ/USDT">INJ/USDT</option>
                            <option value="VANRY/USDT">VANRY/USDT</option>
                            <option value="BCH/USDT">BCH/USDT</option>
                            <option value="CKB/USDT">CKB/USDT</option>
                            <option value="ETC/USDT">ETC/USDT</option>
                            <option value="APT/USDT">APT/USDT</option>
                            <option value="LPT/USDT">LPT/USDT</option>
                            <option value="ICP/USDT">ICP/USDT</option>
                            <option value="SC/USDT">SC/USDT</option>
                            <option value="ILV/USDT">ILV/USDT</option>
                            <option value="MAGIC/USDT">MAGIC/USDT</option>
                            <option value="DYDX/USDT">DYDX/USDT</option>
                            <option value="SHIB/TRY">SHIB/TRY</option>
                            <option value="BNB/BTC">BNB/BTC</option>
                            <option value="PEOPLE/USDT">PEOPLE/USDT</option>
                            <option value="APE/USDT">APE/USDT</option>
                            <option value="XRP/FDUSD">XRP/FDUSD</option>
                            <option value="GALA/TRY">GALA/TRY</option>
                            <option value="PEPE/TRY">PEPE/TRY</option>
                            <option value="EUR/USDT">EUR/USDT</option>
                            <option value="POLYX/USDT">POLYX/USDT</option>
                            <option value="DYM/USDT">DYM/USDT</option>
                            <option value="CHR/USDT">CHR/USDT</option>
                            <option value="BTC/FDUSD">BTC/FDUSD</option>
                            <option value="BTC/USDT">BTC/USDT</option>
                            <option value="FDUSD/USDT">FDUSD/USDT</option>
                            <option value="ETH/USDT">ETH/USDT</option>
                            <option value="ETH/FDUSD">ETH/FDUSD</option>
                            <option value="BNB/FDUSD">BNB/FDUSD</option>
                            <option value="BNB/USDT">BNB/USDT</option>
                            <option value="DOGE/USDT">DOGE/USDT</option>
                            <option value="PEPE/USDT">PEPE/USDT</option>
                            <option value="SHIB/USDT">SHIB/USDT</option>
                            <option value="WLD/USDT">WLD/USDT</option>
                            <option value="SOL/USDT">SOL/USDT</option>
                            <option value="GALA/USDT">GALA/USDT</option>
                            <option value="USDC/USDT">USDC/USDT</option>
                            <option value="PIXEL/USDT">PIXEL/USDT</option>
                            <option value="DOGE/FDUSD">DOGE/FDUSD</option>
                            <option value="FLOKI/USDT">FLOKI/USDT</option>
                            <option value="RUNE/USDT">RUNE/USDT</option>
                            <option value="SOL/FDUSD">SOL/FDUSD</option>
                            <option value="XRP/USDT">XRP/USDT</option>
                            <option value="ARKM/USDT">ARKM/USDT</option>
                            <option value="RNDR/USDT">RNDR/USDT</option>
                            <option value="YGG/USDT">YGG/USDT</option>
                            <option value="FET/USDT">FET/USDT</option>
                            <option value="STRK/USDT">STRK/USDT</option>
                            <option value="IQ/USDT">IQ/USDT</option>
                            <option value="ARB/USDT">ARB/USDT</option>
                            <option value="MATIC/USDT">MATIC/USDT</option>
                            <option value="GRT/USDT">GRT/USDT</option>
                            <option value="BONK/USDT">BONK/USDT</option>
                            <option value="SAND/USDT">SAND/USDT</option>
                            <option value="GMT/USDT">GMT/USDT</option>
                            <option value="FIL/USDT">FIL/USDT</option>
                            <option value="USDT/TRY">USDT/TRY</option>
                            <option value="WIF/USDT">WIF/USDT</option>
                            <option value="NEAR/USDT">NEAR/USDT</option>
                            <option value="SUI/USDT">SUI/USDT</option>
                            <option value="PORTAL/USDT">PORTAL/USDT</option>
                            <option value="AGIX/USDT">AGIX/USDT</option>
                            <option value="AVAX/USDT">AVAX/USDT</option>
                            <option value="SEI/USDT">SEI/USDT</option>
                            <option value="ALT/USDT">ALT/USDT</option>
                            <option value="AXS/USDT">AXS/USDT</option>
                            <option value="ETH/BTC">ETH/BTC</option>
                            <option value="NFP/USDT">NFP/USDT</option>
                            <option value="OP/USDT">OP/USDT</option>
                            <option value="ADA/USDT">ADA/USDT</option>
                            <option value="ORDI/USDT">ORDI/USDT</option>
                            <option value="MEME/USDT">MEME/USDT</option>
                            <option value="DOT/USDT">DOT/USDT</option>
                            <option value="CHR/USDT">CHR/USDT</option>
                            <option value="OCEAN/USDT">OCEAN/USDT</option>
                            <option value="NMR/USDT">NMR/USDT</option>
                            <option value="MKR/USDT">MKR/USDT</option>
                            <option value="DOGE/BTC">DOGE/BTC</option>
                            <option value="VET/USDT">VET/USDT</option>
                            <option value="MTL/USDT">MTL/USDT</option>
                            <option value="MASK/USDT">MASK/USDT</option>
                            <option value="PIXEL/TRY">PIXEL/TRY</option>
                            <option value="GLM/USDT">GLM/USDT</option>
                            <option value="VOXEL/USDT">VOXEL/USDT</option>
                            <option value="CHZ/USDT">CHZ/USDT</option>
                            <option value="THETA/USDT">THETA/USDT</option>
                            <option value="SOL/BTC">SOL/BTC</option>
                            <option value="JTO/USDT">JTO/USDT</option>
                            <option value="TRX/USDT">TRX/USDT</option>
                            <option value="ICX/USDT">ICX/USDT</option>
                            <option value="CYBER/USDT">CYBER/USDT</option>
                            <option value="BEAM/USDT">BEAM/USDT</option>
                            <option value="DAR/USDT">DAR/USDT</option>
                            <option value="MBOX/USDT">MBOX/USDT</option>
                            <option value="ENS/USDT">ENS/USDT</option>
                            <option value="ALICE/USDT">ALICE/USDT</option>
                            <option value="PROS/USDT">PROS/USDT</option>
                            <option value="BONK/TRY">BONK/TRY</option>
                            <option value="ENJ/USDT">ENJ/USDT</option>
                            <option value="COTI/USDT">COTI/USDT</option>
                            <option value="BLUR/USDT">BLUR/USDT</option>
                            <option value="BTC/TUSD">BTC/TUSD</option>
                            <option value="TLM/USDT">TLM/USDT</option>
                            <option value="CRV/USDT">CRV/USDT</option>
                            <option value="FLOW/USDT">FLOW/USDT</option>
                            <option value="EOS/USDT">EOS/USDT</option>
                            <option value="FET/BTC">FET/BTC</option>
                            <option value="CFX/USDT">CFX/USDT</option>
                            <option value="IMX/USDT">IMX/USDT</option>
                            <option value="HBAR/USDT">HBAR/USDT</option>
                            <option value="GAL/USDT">GAL/USDT</option>
                            <option value="FUN/USDT">FUN/USDT</option>
                            <option value="ROSE/USDT">ROSE/USDT</option>
                            <option value="RLC/USDT">RLC/USDT</option>
                            <option value="LEVER/USDT">LEVER/USDT</option>
                            <option value="GLMR/USDT">GLMR/USDT</option>
                            <option value="AAVE/USDT">AAVE/USDT</option>
                            <option value="BAKE/USDT">BAKE/USDT</option>
                            <option value="RDNT/USDT">RDNT/USDT</option>
                            <option value="WAVES/USDT">WAVES/USDT</option>
                            <option value="ZIL/USDT">ZIL/USDT</option>
                            <option value="DOGE/TRY">DOGE/TRY</option>
                            <option value="ALGO/USDT">ALGO/USDT</option>
                            <option value="ALPHA/BTC">ALPHA/BTC</option>
                            <option value="EOS/TRY">EOS/TRY</option>
                            <option value="AST/BTC">AST/BTC</option>
                            <option value="LTC/TRY">LTC/TRY</option>
                            <option value="USDT/RON">USDT/RON</option>
                            <option value="LTC/EUR">LTC/EUR</option>
                            <option value="TUSD/TRY">TUSD/TRY</option>
                            <option value="CTK/BNB">CTK/BNB</option>
                            <option value="ANKR/BTC">ANKR/BTC</option>
                            <option value="IMX/BTC">IMX/BTC</option>
                            <option value="NEAR/EUR">NEAR/EUR</option>
                            <option value="ATOM/FDUSD">ATOM/FDUSD</option>

                </select>
                <button
                  className='p-2 text-white rounded-lg basis-1/10 bg-customRed'
                  type='button'
                >
                  Symbol
                </button>
              </div>
              <div className='flex gap-5 mt-6'>
                <select
                  className='flex-1  items-center outline-none h-[4rem] relative w-full rounded-lg text-Neutral-6 bg-Primary-3 text-left sm:text-sm cursor-pointer px-4 py-5'
                  name='trading'
                  id='marketOrderSelect'
                  value={sellForm.interval}
                  onChange={(e) =>
                    setSellFieldValue('interval', e.target.value)
                  }
                >
                  <option value='60'>1 min</option>
                  <option value='180'>3 min</option>
                  <option value='300'>5 min</option>
                  <option value='900'>15 mins</option>
                  <option value='1800'>30 mins</option>
                  <option value='3600'>1 hr</option>
                  <option value='7200'>2 hr</option>
                  <option value='86400'>1 day</option>
                </select>
                <button
                  className='p-2 text-white rounded-lg basis-1/10 bg-customRed'
                  type='button'
                >
                  TIME INTERVAL
                </button>
              </div>
         <div className='flex gap-5 mt-6'>
                <input
                  type='text'
                  placeholder='0.0000'
                  className='w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10'
                  value={sellForm.entryPrice}
                  onChange={(e) =>
                    setSellFieldValue('entryPrice', e.target.value)
                  }
                />
                <button
                  className='p-2 text-white rounded-lg bg-customRed'
                  type='button'
                >
                  Entry Price
                </button>
              </div>
              <div className='flex gap-5 mt-6'>
                <select
                  className='flex-1  items-center outline-none h-[4rem] relative w-full rounded-lg text-Neutral-6 bg-Primary-3 text-left sm:text-sm cursor-pointer px-4 py-5'
                  name='trading'
                  id='marketOrderSelect'
                  value={sellForm.leverage}
                  onChange={(e) =>
                    setSellFieldValue('leverage', e.target.value)
                  }
                >
                  <option
                    value='0.5X'
                    data-rate='high_sell'
                    data-buy=''
                    data-sell='3'
                  >
                    0.5X
                  </option>
                  <option
                    value='1X'
                    data-rate='high_sell'
                    data-buy=''
                    data-sell='3'
                  >
                    1.0X
                  </option>
                  <option
                    value='1.5X'
                    data-rate='high_sell'
                    data-buy=''
                    data-sell='3'
                  >
                    1.5X
                  </option>
                  <option
                    value='2X'
                    data-rate='high_sell'
                    data-buy=''
                    data-sell='3'
                  >
                    2.0X
                  </option>
                  <option
                    value='5X'
                    data-rate='high_sell'
                    data-buy=''
                    data-sell='3'
                  >
                    5X
                  </option>
                  <option
                    value='10X'
                    data-rate='high_sell'
                    data-buy=''
                    data-sell='3'
                  >
                    10X
                  </option>
                </select>
                <button
                  className='p-2 text-white rounded-lg basis-1/10 bg-customRed'
                  type='button'
                >
                  TRADE LEVERAGE
                </button>
              </div>

      
              <div className='flex gap-5 mt-6'>
                <input
                  type='text'
                  placeholder='0.0000'
                  className='w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10'
                  value={sellForm.takeProfit}
                  onChange={(e) =>
                    setSellFieldValue('takeProfit', e.target.value)
                  }
                />
                <button
                  className='p-2 text-white rounded-lg bg-customRed'
                  type='button'
                >
                TP[TAKE PROFIT]
                </button>
              </div>
                      <div className='flex gap-5 mt-6'>
                <input
                  type='text'
                  placeholder='0.0000'
                  className='w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10'
                  value={sellForm.stopLoss}
                  onChange={(e) =>
                    setSellFieldValue('stopLoss', e.target.value)
                  }
                />
                <button
                  className='p-2 text-white rounded-lg bg-customRed'
                  type='button'
                >
                   SL [STOP LOSS]
                </button>
              </div>
          
              <div className='flex gap-5 mt-6'>
                <button
                  type='submit'
                  className='mt-4 px-4 py-2 text-white font-semibold leading-[18px] border border-customRed rounded-lg hover:bg-customRed w-full'
                  disabled={isLoading}
                >
                  {isLoading ? 'Placing Trade...' : 'Sell'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      
    </div>
  );
};

export default CyptoPair;
