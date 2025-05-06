/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveTradeData, clearState } from '../../redux/slices/setTradeSlice';
import { fetchUserDetails, clearUserState } from '../../redux/slices/fetchUserSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ForexPair = ({
  formFields,
  sellForm,
  setFormFields,
  setSellForm,
  selectedOption,
  setSelectedOption,
  buyFormRef,
  sellFormRef
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.fetchUserDetails);
  const { loadingTrade, Tradeerror, tradeSuccess } = useSelector((state) => state.processTrade);

  const setFieldValue = (fieldName, value) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      [fieldName]: value,
    }));
  };

  const setSellFieldValue = (fieldName, value) => {
    setSellForm((prevFields) => ({
      ...prevFields,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('uId');
    setFieldValue('userId', storedUserId);
    setSellFieldValue('userId', storedUserId);
    setFieldValue('symbol', 'USD/CHF');
    setSellFieldValue('symbol', 'USD/CHF');
    setFieldValue('tradingPair', 'Forex Pairs');
    setSellFieldValue('tradingPair', 'Forex Pairs');
    setFieldValue('tradeType', 'buy');
    setSellFieldValue('tradeType', 'sell');
    dispatch(fetchUserDetails(storedUserId));
  }, [dispatch]);

  const transformKeys = (fields) => {
    return {
      amount: fields.amount,
      symbol: fields.symbol,             // for PHP logic
      Symbol: fields.symbol,             // for DB
      interval: fields.interval,         // for PHP logic ($data['interval'])
      Intervah: fields.interval,         // for DB insert
      Leverage: fields.leverage,
      stploss: fields.stopLoss,
      takeprofit: fields.takeProfit,
      EntryPrice: fields.entryPrice,
      tradeType: fields.tradeType,
      tradingPair: fields.tradingPair,      // for PHP logic
      trading_pairs: fields.tradingPair,    // for DB insert
      userId: fields.userId,
      trade: fields.trade || null,
      dateo: new Date().toLocaleString('en-US', {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,}),
    };
    
    
    
    
    

    
    
    
    
  };

  const handleBuySubmit = (e) => {
    e.preventDefault();
    if (!formFields.amount || isNaN(formFields.amount)) return toast.error('Amount is required and must be a number.');
    if (!formFields.stopLoss || isNaN(formFields.stopLoss)) return toast.error('Stop Loss must be a number.');
    if (!formFields.takeProfit || isNaN(formFields.takeProfit)) return toast.error('Take Profit must be a number.');
    if (!formFields.entryPrice || isNaN(formFields.entryPrice)) return toast.error('Entry Price must be a number.');
    if (parseFloat(formFields.amount) > parseFloat(user.balance)) return toast.error('Insufficient balance.');
    dispatch(saveTradeData(transformKeys(formFields)));
  };

  const handleSellSubmit = (e) => {
    e.preventDefault();
    if (!sellForm.amount || isNaN(sellForm.amount)) return toast.error('Amount is required and must be a number.');
    if (!sellForm.stopLoss || isNaN(sellForm.stopLoss)) return toast.error('Stop Loss must be a number.');
    if (!sellForm.takeProfit || isNaN(sellForm.takeProfit)) return toast.error('Take Profit must be a number.');
    if (!sellForm.entryPrice || isNaN(sellForm.entryPrice)) return toast.error('Entry Price must be a number.');
    if (parseFloat(sellForm.amount) > parseFloat(user.balance)) return toast.error('Insufficient balance.');
    dispatch(saveTradeData(transformKeys(sellForm)));
  };

  useEffect(() => {
    if (loadingTrade) {
      toast.loading('Processing the trade...', { id: 'tradeToast' });
    } else {
      toast.dismiss('tradeToast');
    }

    if (Tradeerror) {
      toast.error(Tradeerror, { id: 'tradeErrorToast' });
      dispatch(clearState());
    }

    if (tradeSuccess) {
      toast.success('Trade Successful!', { id: 'tradeSuccessToast' });

      const storedUserId = localStorage.getItem('uId');
      const resetFields = {
        amount: '',
        symbol: 'USD/CHF',
        interval: '60',
        leverage: '0.5X',
        stopLoss: '',
        takeProfit: '',
        entryPrice: '',
        tradeType: '',
        tradingPair: 'Forex Pairs',
        userId: storedUserId,
        trade: null
      };

      setFormFields({ ...resetFields, tradeType: 'buy' });
      setSellForm({ ...resetFields, tradeType: 'sell' });

      dispatch(clearState());

      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    }
  }, [loadingTrade, Tradeerror, tradeSuccess, dispatch, setFormFields, setSellForm, navigate]);

  return (
    <>
      <div className='grid grid-cols-12 gap-6 mt-6 forex-form-theme'>
        {/* Quick Buy Form */}
        <div className='col-span-12 p-4 bg-Primary-bg rounded-xl lg:px-7 lg:py-6 xl:col-span-6'>
          <form onSubmit={handleBuySubmit} ref={buyFormRef}>
            <Toaster position='top-center' />
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
                   <option value="USD/CAD">USD/CAD</option>
                            <option value="USD/CHF">USD/CHF</option>
                            <option value="USD/JPY">USD/JPY</option>
                            <option value="EUR/USD">EUR/USD</option>
                            <option value="GBP/USD">GBP/USD</option>
                            <option value="NZD/USD">NZD/USD</option>
                            <option value="AUD/CAD">AUD/CAD</option>
                            <option value="AUD/USD">AUD/USD</option>
                            <option value="EUR/GBP">EUR/GBP</option>
                            <option value="GBP/AUD">GBP/AUD</option>
                            <option value="EUR/AUD">EUR/AUD</option>
                            <option value="AUD/CHF">AUD/CHF</option>
                            <option value="GBP/CHF">GBP/CHF</option>
                            <option value="GBP/JPY">GBP/JPY</option>
                            <option value="AUD/JPY">AUD/JPY</option>
                            <option value="EUR/JPY">EUR/JPY</option>
                            <option value="AUD/NZD">AUD/NZD</option>
                            <option value="EUR/CHF">EUR/CHF</option>
                            <option value="NZD/JPY">NZD/JPY</option>
                            <option value="CAD/CHF">CAD/CHF</option>
                            <option value="GBP/NZD">GBP/NZD</option>
                            <option value="CHF/JPY">CHF/JPY</option>
                            <option value="NZD/CAD">NZD/CAD</option>
                            <option value="NZD/CHF">NZD/CHF</option>
                            <option value="GOLD">GOLD</option>
                            <option value="CRUDE OIL">CRUDE OIL</option>
                            <option value="XAU/USD">XAU/USD</option>
                            <option value="XAU/CHF">XAU/CHF</option>
                            <option value="XAU/GBP">XAU/GBP</option>
                            <option value="XAU/EUR">XAU/EUR</option>
                            <option value="S&P500">S&P500</option>
                            <option value="DOW 30">DOW 30</option>
                            <option value="NISSAN MOTORS">NISSAN MOTORS</option>
                            <option value="AMAZON">AMAZON</option>
                            <option value="FACEBOOK">FACEBOOK</option>
                            <option value="COCA COLA">COCA COLA</option>
                            <option value="AMERICAN EXPRESS">AMERICAN EXPRESS</option>
                            <option value="MOTOROLA">MOTOROLA</option>
                            <option value="APPLE">APPLE</option>
                            <option value="VERIZON">VERIZON</option>
                            <option value="PFIZER">PFIZER</option>
                            <option value="BOEING">BOEING</option>
                            <option value="AUD/USD">AUD/USD</option>
                            <option value="EUR/CHF">EUR/CHF</option>
                            <option value="EUR/USD">EUR/USD</option>
                            <option value="EUR/CAD">EUR/CAD</option>
                            <option value="GBP/USD">GBP/USD</option>
                            <option value="EUR/GBP">EUR/GBP</option>
                            <option value="USD/CAD">USD/CAD</option>
                            <option value="EUR/JPY">EUR/JPY</option>
                            <option value="USD/JPY">USD/JPY</option>
                            <option value="EUR/NZD">EUR/NZD</option>
                            <option value="USD/CHF">USD/CHF</option>
                            <option value="GBP/AUD">GBP/AUD</option>
                            <option value="AUD/CAD">AUD/CAD</option>
                            <option value="GBP/CAD">GBP/CAD</option>
                            <option value="AUD/CHF">AUD/CHF</option>
                            <option value="GBP/CHF">GBP/CHF</option>
                            <option value="AUD/JPY">AUD/JPY</option>
                            <option value="GBP/JPY">GBP/JPY</option>
                            <option value="AUD/NZD">AUD/NZD</option>
                            <option value="GBP/NZD">GBP/NZD</option>
                            <option value="CAD/CHF">CAD/CHF</option>
                            <option value="NZD/CAD">NZD/CAD</option>
                            <option value="CAD/JPY">CAD/JPY</option>
                            <option value="NZD/CHF">NZD/CHF</option>
                            <option value="CHF/JPY">CHF/JPY</option>
                            <option value="NZD/JPY">NZD/JPY</option>
                            <option value="EUR/AUD">EUR/AUD</option>
                            <option value="NZD/USD">NZD/USD</option>
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

        {/* Quick Sell Form */}
        <div className='col-span-12 p-4 bg-Primary-bg rounded-xl lg:px-7 lg:py-6 xl:col-span-6'>
          <form onSubmit={handleSellSubmit} ref={sellFormRef}>
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
                  <option value='USD/CAD'>USD/CAD</option>
                  <option value='USD/CHF'>USD/CHF</option>
                  <option value='USD/JPY'>USD/JPY</option>
                  <option value='EUR/USD'>EUR/USD</option>
                  <option value='GBP/USD'>GBP/USD</option>
                  <option value='NZD/USD'>NZD/USD</option>
                  <option value='AUD/CAD'>AUD/CAD</option>
                  <option value='AUD/USD'>AUD/USD</option>
                  <option value='EUR/GBP'>EUR/GBP</option>
                  <option value='GBP/AUD'>GBP/AUD</option>
                  <option value='EUR/AUD'>EUR/AUD</option>
                  <option value='AUD/CHF'>AUD/CHF</option>
                  <option value='GBP/CHF'>GBP/CHF</option>
                  <option value='GBP/JPY'>GBP/JPY</option>
                  <option value='AUD/JPY'>AUD/JPY</option>
                  <option value='EUR/JPY'>EUR/JPY</option>
                  <option value='AUD/NZD'>AUD/NZD</option>
                  <option value='EUR/CHF'>EUR/CHF</option>
                  <option value='NZD/JPY'>NZD/JPY</option>
                  <option value='CAD/CHF'>CAD/CHF</option>
                  <option value='GBP/NZD'>GBP/NZD</option>
                  <option value='CHF/JPY'>CHF/JPY</option>
                  <option value='NZD/CAD'>NZD/CAD</option>
                  <option value='NZD/CHF'>NZD/CHF</option>
                  <option value='GOLD'>GOLD</option>
                  <option value='CRUDE OIL'>CRUDE OIL</option>
                  <option value='XAU/USD'>XAU/USD</option>
                  <option value='XAU/CHF'>XAU/CHF</option>
                  <option value='XAU/GBP'>XAU/GBP</option>
                  <option value='XAU/EUR'>XAU/EUR</option>
                  <option value='S&P500'>S&P500</option>
                  <option value='DOW 30'>DOW 30</option>
                  <option value='NISSAN MOTORS'>NISSAN MOTORS</option>
                  <option value='AMAZON'>AMAZON</option>
                  <option value='FACEBOOK'>FACEBOOK</option>
                  <option value='COCA COLA'>COCA COLA</option>
                  <option value='AMERICAN EXPRESS'>AMERICAN EXPRESS</option>
                  <option value='MOTOROLA'>MOTOROLA</option>
                  <option value='APPLE'>APPLE</option>
                  <option value='VERIZON'>VERIZON</option>
                  <option value='PFIZER'>PFIZER</option>
                  <option value='BOEING'>BOEING</option>
                  <option value='AUD/USD'>AUD/USD</option>
                  <option value='EUR/CHF'>EUR/CHF</option>
                  <option value='EUR/USD'>EUR/USD</option>
                  <option value='EUR/CAD'>EUR/CAD</option>
                  <option value='GBP/USD'>GBP/USD</option>
                  <option value='EUR/GBP'>EUR/GBP</option>
                  <option value='USD/CAD'>USD/CAD</option>
                  <option value='EUR/JPY'>EUR/JPY</option>
                  <option value='USD/JPY'>USD/JPY</option>
                  <option value='EUR/NZD'>EUR/NZD</option>
                  <option value='USD/CHF'>USD/CHF</option>
                  <option value='GBP/AUD'>GBP/AUD</option>
                  <option value='AUD/CAD'>AUD/CAD</option>
                  <option value='GBP/CAD'>GBP/CAD</option>
                  <option value='AUD/CHF'>AUD/CHF</option>
                  <option value='GBP/CHF'>GBP/CHF</option>
                  <option value='AUD/JPY'>AUD/JPY</option>
                  <option value='GBP/JPY'>GBP/JPY</option>
                  <option value='AUD/NZD'>AUD/NZD</option>
                  <option value='GBP/NZD'>GBP/NZD</option>
                  <option value='CAD/CHF'>CAD/CHF</option>
                  <option value='NZD/CAD'>NZD/CAD</option>
                  <option value='CAD/JPY'>CAD/JPY</option>
                  <option value='NZD/CHF'>NZD/CHF</option>
                  <option value='CHF/JPY'>CHF/JPY</option>
                  <option value='NZD/JPY'>NZD/JPY</option>
                  <option value='EUR/AUD'>EUR/AUD</option>
                  <option value='NZD/USD'>NZD/USD</option>
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
    </>
  );
};

export default ForexPair;
