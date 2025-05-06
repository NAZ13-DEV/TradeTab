import { Listbox, Tab } from '@headlessui/react';
import Image from 'next/image';
import React, { Fragment, useState, useEffect  } from 'react';
import { curencys, curencysAmount } from '../../../public/data/exchangeData';
import { useDispatch, useSelector } from 'react-redux';
import { saveTradeData, clearState } from '../../app/slices/setTradeSlice';
import toast, { Toaster } from 'react-hot-toast';
import { fetchUserDetails, clearUserState } from '../../app/slices/fetchUserSlice';
import { useRouter } from 'next/navigation';

const RealestatePair = ({ formFields, sellForm, setFormFields, setSellForm,selectedOption, setSelectedOption,buyFormRef, sellFormRef }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.fetchUserDetails);
  const router = useRouter();


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
    setFieldValue('symbol', 'US 30');
    setSellFieldValue('symbol', 'US 30');
    setFieldValue('tradingPair', 'Real Estate Pairs');
    setSellFieldValue('tradingPair', 'Real Estate Pairs');
    setFieldValue('tradeType', 'buy');
    setSellFieldValue('tradeType', 'sell');
    dispatch(fetchUserDetails(storedUserId));
  }, []);

  const { loadingTrade, Tradeerror, tradeSuccess } = useSelector((state) => state.processTrade);
 
  const handleBuySubmit = (e) => {
    e.preventDefault();

    if (!formFields.amount || isNaN(formFields.amount)) {
      toast.error('Amount is required and must be a number.');
      return;
    }
    if (!formFields.stopLoss || isNaN(formFields.stopLoss)) {
      toast.error('Stop Loss is required and must be a number.');
      return;
    }
    if (!formFields.takeProfit || isNaN(formFields.takeProfit)) {
      toast.error('Take Profit is required and must be a number.');
      return;
    }
    if (!formFields.entryPrice || isNaN(formFields.entryPrice)) {
      toast.error('Entry Price is required and must be a number.');
      return;
    }

    if (parseFloat(formFields.amount) > parseFloat(user.balance)) {
      toast.error('Unable to process the trade due to insufficient balance');
      return;
    }
        dispatch(saveTradeData(formFields));
  };

  const handleSellSubmit = (e) => {
    e.preventDefault();

    if (!sellForm.amount || isNaN(sellForm.amount)) {
      toast.error('Amount is required and must be a number.');
      return;
    }
    if (!sellForm.stopLoss || isNaN(sellForm.stopLoss)) {
      toast.error('Stop Loss is required and must be a number.');
      return;
    }
    if (!sellForm.takeProfit || isNaN(sellForm.takeProfit)) {
      toast.error('Take Profit is required and must be a number.');
      return;
    }
    if (!sellForm.entryPrice || isNaN(sellForm.entryPrice)) {
      toast.error('Entry Price is required and must be a number.');
      return;
    }

    if (parseFloat(sellForm.amount) > parseFloat(user.balance)) {
      toast.error('Unable to process the trade due to insufficient balance');
      return;
    }
        dispatch(saveTradeData(sellForm));
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
    setFormFields({
      amount: '',
      symbol: 'US 30',
      interval: '60',
      leverage: '0.5X',
      stopLoss: '',
      takeProfit: '',
      entryPrice: '',
      tradeType: 'buy',
      tradingPair: 'Real Estate Pairs',
      userId: storedUserId,
      trade:null
    });

    setSellForm({
      amount: '',
      symbol: 'US 30',
      interval: '60',
      leverage: '0.5X',
      stopLoss: '',
      takeProfit: '',
      entryPrice: '',
      tradeType: 'sell',
      tradingPair: 'Real Estate Pairs',
      userId: storedUserId,
      trade:null
    });

    dispatch(clearState()); 
    
       setTimeout(() => {
         router.push('./dashboard');
           }, 3000);
  }
}, [loadingTrade, Tradeerror, tradeSuccess, dispatch, setFormFields, setSellForm]);


  return (
    <div className='mt-6 gap-6 grid grid-cols-12'>
      {/* Line chart  */}
       {/* Line chart  */}
      <div className='bg-Primary-bg rounded-xl p-4 lg:px-7 lg:py-6 col-span-12 xl:col-span-6'>
        <form onSubmit={handleBuySubmit} ref={buyFormRef}>
          <div className='flex gap-3 flex-wrap justify-between items-center mb-6 scrollable-container'>
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
              <div className='flex mt-6 gap-5'>
                <select
                  className='flex-1  items-center outline-none h-[4rem] relative w-full rounded-lg text-Neutral-6 bg-Primary-3 text-left sm:text-sm cursor-pointer px-4 py-5'
                  name='trading'
                  id='marketOrderSelect'
                  value={formFields.symbol}
                  onChange={(e) => setFieldValue('symbol', e.target.value)}
                >
                        <option value="US 30">US 30</option>
                            <option value="UKX">UKX</option>
                            <option value="VIX">VIX Volatility Index</option>
                            <option value="DE30">Germany 30</option>
                            <option value="US500">USA 500</option>
                            <option value="US100">US Tech 100</option>
                            <option value="Japan 225">Japan 225</option>
                            <option value="Europe 50">Europe 50</option>
                            <option value="US Wall St 30">US Wall St 30</option>
                            <option value="AUXAUD">AUXAUD</option>
                            <option value="BCOUSD">BCOUSD</option>
                            <option value="WEST TEXAS OIL">WEST TEXAS OIL</option>
                            <option value="CAC40">CAC40</option>
                            <option value="DXY">DXY</option>
                            <option value="EU50">EU50</option>
                            <option value="FR40">FR40</option>
                            <option value="GRXEUR">GRXEUR</option>
                            <option value="HELCHF">HELCHF</option>
                            <option value="JPXJPY">JPXJPY</option>
                            <option value="KRUUSD">KRUUSD</option>
                            <option value="LTNEUR">LTNEUR</option>
                            <option value="RUA">RUA</option>
                            <option value="TR03">TR03</option>
                            <option value="USDBRO">USDBRO</option>
                            <option value="S&P 100">S&P 100</option>
                            <option value="SXE5">REP/BTC</option>
                            <option value="DOECHF">DOECHF</option>
                            <option value="FAANG">FAANG</option>
                            <option value="GRXEUR">GRXEUR</option>
                            <option value="VRLCHF">VRLCHF</option>
                            <option value="XPTUSD">XPTUSD</option>
                            <option value="ZA20">ZA20</option>
                            <option value="HK50">HK50</option>
                            <option value="ID05Y">ID05Y</option>
                </select>
                <button
                  className='basis-1/10 text-white bg-customGreen p-2 rounded-lg'
                  type='button'
                >
                  Symbol
                </button>
              </div>
              <div className='flex mt-6 gap-5'>
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
                  className='basis-1/10 text-white bg-customGreen p-2 rounded-lg'
                  type='button'
                >
                  TIME INTERVAL
                </button>
              </div>
          
              <div className='flex mt-6 gap-5'>
                <input
                  type='text'
                  placeholder='0.0000'
                  className='w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10'
                  value={formFields.entryPrice}
                  onChange={(e) => setFieldValue('entryPrice', e.target.value)}
                />
                <button
                  className=' text-white bg-customGreen p-2 rounded-lg'
                  type='button'
                >
                  Entry Price
                </button>
              </div>
              <div className='flex mt-6 gap-5'>
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
                  className='basis-1/10 text-white bg-customGreen p-2 rounded-lg'
                  type='button'
                >
                  TRADE LEVERAGE
                </button>
              </div>
                   <div className='flex mt-6 gap-5'>
                <input
                  type='text'
                  placeholder='0.0000'
                  className='w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10'
                  value={formFields.takeProfit}
                  onChange={(e) => setFieldValue('takeProfit', e.target.value)}
                />
                <button
                  className=' text-white bg-customGreen p-2 rounded-lg'
                  type='button'
                >
                 TP[TAKE PROFIT]
                </button>
              </div>
              <div className='flex mt-6 gap-5'>
                <input
                  type='text'
                  placeholder='0.0000'
                  className='w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10'
                  value={formFields.stopLoss}
                  onChange={(e) => setFieldValue('stopLoss', e.target.value)}
                />
                <button
                  className=' text-white bg-customGreen p-2 rounded-lg'
                  type='button'
                >
                  SL [STOP LOSS]
                </button>
              </div>
 
              <div className='flex mt-6 gap-5'>
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

      <div className='bg-Primary-bg rounded-xl p-4 lg:px-7 lg:py-6 col-span-12 xl:col-span-6'>
        <form onSubmit={handleSellSubmit} ref={sellFormRef}>
          <Toaster position='top-center' />
          <div className='flex gap-3 flex-wrap justify-between items-center mb-6 scrollable-container'>
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
              <div className='flex mt-6 gap-5'>
                <select
                  className='flex-1  items-center outline-none h-[4rem] relative w-full rounded-lg text-Neutral-6 bg-Primary-3 text-left sm:text-sm cursor-pointer px-4 py-5'
                  name='trading'
                  id='marketOrderSelect'
                  value={sellForm.symbol}
                  onChange={(e) => setSellFieldValue('symbol', e.target.value)}
                >
                       <option value="US 30">US 30</option>
                            <option value="UKX">UKX</option>
                            <option value="VIX">VIX Volatility Index</option>
                            <option value="DE30">Germany 30</option>
                            <option value="US500">USA 500</option>
                            <option value="US100">US Tech 100</option>
                            <option value="Japan 225">Japan 225</option>
                            <option value="Europe 50">Europe 50</option>
                            <option value="US Wall St 30">US Wall St 30</option>
                            <option value="AUXAUD">AUXAUD</option>
                            <option value="BCOUSD">BCOUSD</option>
                            <option value="WEST TEXAS OIL">WEST TEXAS OIL</option>
                            <option value="CAC40">CAC40</option>
                            <option value="DXY">DXY</option>
                            <option value="EU50">EU50</option>
                            <option value="FR40">FR40</option>
                            <option value="GRXEUR">GRXEUR</option>
                            <option value="HELCHF">HELCHF</option>
                            <option value="JPXJPY">JPXJPY</option>
                            <option value="KRUUSD">KRUUSD</option>
                            <option value="LTNEUR">LTNEUR</option>
                            <option value="RUA">RUA</option>
                            <option value="TR03">TR03</option>
                            <option value="USDBRO">USDBRO</option>
                            <option value="S&P 100">S&P 100</option>
                            <option value="SXE5">REP/BTC</option>
                            <option value="DOECHF">DOECHF</option>
                            <option value="FAANG">FAANG</option>
                            <option value="GRXEUR">GRXEUR</option>
                            <option value="VRLCHF">VRLCHF</option>
                            <option value="XPTUSD">XPTUSD</option>
                            <option value="ZA20">ZA20</option>
                            <option value="HK50">HK50</option>
                            <option value="ID05Y">ID05Y</option>
                </select>
                <button
                  className='basis-1/10 text-white bg-customRed p-2 rounded-lg'
                  type='button'
                >
                  Symbol
                </button>
              </div>
              <div className='flex mt-6 gap-5'>
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
                  className='basis-1/10 text-white bg-customRed p-2 rounded-lg'
                  type='button'
                >
                  TIME INTERVAL
                </button>
              </div>
         <div className='flex mt-6 gap-5'>
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
                  className=' text-white bg-customRed p-2 rounded-lg'
                  type='button'
                >
                  Entry Price
                </button>
              </div>
              <div className='flex mt-6 gap-5'>
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
                  className='basis-1/10 text-white bg-customRed p-2 rounded-lg'
                  type='button'
                >
                  TRADE LEVERAGE
                </button>
              </div>

      
              <div className='flex mt-6 gap-5'>
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
                  className=' text-white bg-customRed p-2 rounded-lg'
                  type='button'
                >
                TP[TAKE PROFIT]
                </button>
              </div>
                      <div className='flex mt-6 gap-5'>
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
                  className=' text-white bg-customRed p-2 rounded-lg'
                  type='button'
                >
                   SL [STOP LOSS]
                </button>
              </div>
          
              <div className='flex mt-6 gap-5'>
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

export default RealestatePair;
