/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveTradeData, clearState } from '../../redux/slices/setTradeSlice';
import toast, { Toaster } from 'react-hot-toast';
import { fetchUserDetails } from '../../redux/slices/fetchUserSlice';
import { useNavigate } from 'react-router-dom';

const StockPair = ({
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
    setFieldValue('symbol', 'AMAZON');
    setSellFieldValue('symbol', 'AMAZON');
    setFieldValue('tradingPair', 'Stocks Pairs');
    setSellFieldValue('tradingPair', 'Stocks Pairs');
    setFieldValue('tradeType', 'buy');
    setSellFieldValue('tradeType', 'sell');
    dispatch(fetchUserDetails(storedUserId));
  }, []);

  const validateFields = (data) => {
    if (!data.amount || isNaN(data.amount)) return 'Amount is required and must be a number.';
    if (!data.stopLoss || isNaN(data.stopLoss)) return 'Stop Loss is required and must be a number.';
    if (!data.takeProfit || isNaN(data.takeProfit)) return 'Take Profit is required and must be a number.';
    if (!data.entryPrice || isNaN(data.entryPrice)) return 'Entry Price is required and must be a number.';
    if (parseFloat(data.amount) > parseFloat(user.balance)) return 'Insufficient balance.';
    return null;
  };

  const handleBuySubmit = (e) => {
    e.preventDefault();
    const error = validateFields(formFields);
    if (error) return toast.error(error);
    dispatch(saveTradeData(formFields));
  };

  const handleSellSubmit = (e) => {
    e.preventDefault();
    const error = validateFields(sellForm);
    if (error) return toast.error(error);
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
      const resetFields = {
        amount: '',
        symbol: 'AMAZON',
        interval: '60',
        leverage: '0.5X',
        stopLoss: '',
        takeProfit: '',
        entryPrice: '',
        userId: storedUserId,
        tradingPair: 'Stock Pairs',
        trade: null
      };

      setFormFields({ ...resetFields, tradeType: 'buy' });
      setSellForm({ ...resetFields, tradeType: 'sell' });

      dispatch(clearState());
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    }
  }, [loadingTrade, Tradeerror, tradeSuccess, dispatch]);

  return (
    <div className='grid grid-cols-12 gap-6 mt-6 forex-form-theme'>
      <Toaster position='top-center' />
           {/* Line chart  */}
           <div className='col-span-12 p-4 bg-Primary-bg rounded-xl lg:px-7 lg:py-6 xl:col-span-6'>
        <form onSubmit={handleBuySubmit}  ref={buyFormRef}>
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
                 <option value="AMAZON">AMAZON</option>
                            <option value="APPLE">APPLE</option>
                            <option value="COCA COLA">COCA COLA</option>
                            <option value="DAX30">DAX30</option>
                            <option value="AIRBNB INC">AIRBNB INC</option>
                            <option value="BOEING CO">BOEING CO</option>
                            <option value="GME STOCKS">GME STOCKS</option>
                            <option value="AMC ENTERTAINMENT">AMC ENTERTAINMENT</option>
                            <option value="BLACKBERRY">BLACKBERRY</option>
                            <option value="CITIGROUP INC">CITIGROUP INC</option>
                            <option value="CISCO SYSTEMS INC">CISCO SYSTEMS INC</option>
                            <option value="FACEBOOK">FACEBOOK</option>
                            <option value="TWITTER INC">TWITTER INC</option>
                            <option value="TESLA INC">TESLA INC</option>
                            <option value="SONY ENT">SONY ENT</option>
                            <option value="NASDAQ">NASDAQ</option>
                            <option value="ENTERPRISE GROUP INC">ENTERPRISE GROUP INC</option>
                            <option value="FORD MOTOR">FORD MOTOR</option>
                            <option value="GAZPROM">GAZPROM</option>
                            <option value="GLOBE LIFE INC">GLOBE LIFE INC</option>
                            <option value="WAYFAIR INC">WAYFAIR INC</option>
                            <option value="WALMART INC">WALMART INC</option>
                            <option value="WALT DISNEY CO.">WALT DISNEY CO.</option>
                            <option value="MACY'S INC">{`MACY'S INC`}</option>
                            <option value="MCDONALD'S CORPORATIONS">{`MCDONALD'S CORPORATIONS`}</option>
                            <option value="VISA INC">VISA INC</option>
                            <option value="VERIZON">VERIZON</option>
                            <option value="TMX GROUP LTD">TMX GROUP LTD</option>
                            <option value="ALPHABET INC">ALPHABET INC</option>
                            <option value="ORGANIGRAM HOLDINGS">ORGANIGRAM HOLDINGS</option>
                            <option value="PFIZER INC">PFIZER INC</option>

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
                            <option value="AMAZON">AMAZON</option>
                            <option value="APPLE">APPLE</option>
                            <option value="COCA COLA">COCA COLA</option>
                            <option value="DAX30">DAX30</option>
                            <option value="AIRBNB INC">AIRBNB INC</option>
                            <option value="BOEING CO">BOEING CO</option>
                            <option value="GME STOCKS">GME STOCKS</option>
                            <option value="AMC ENTERTAINMENT">AMC ENTERTAINMENT</option>
                            <option value="BLACKBERRY">BLACKBERRY</option>
                            <option value="CITIGROUP INC">CITIGROUP INC</option>
                            <option value="CISCO SYSTEMS INC">CISCO SYSTEMS INC</option>
                            <option value="FACEBOOK">FACEBOOK</option>
                            <option value="TWITTER INC">TWITTER INC</option>
                            <option value="TESLA INC">TESLA INC</option>
                            <option value="SONY ENT">SONY ENT</option>
                            <option value="NASDAQ">NASDAQ</option>
                            <option value="ENTERPRISE GROUP INC">ENTERPRISE GROUP INC</option>
                            <option value="FORD MOTOR">FORD MOTOR</option>
                            <option value="GAZPROM">GAZPROM</option>
                            <option value="GLOBE LIFE INC">GLOBE LIFE INC</option>
                            <option value="HYDRO ONE LTD">HYDRO ONE LTD</option>
                            <option value="LOTUS VENTURES INC">LOTUS VENTURES INC</option>
                            <option value="KELLOGG COMPANY">KELLOGG COMPANY</option>
                            <option value="MP1">MP1</option>
                            <option value="ZIP">ZIP</option>
                            <option value="PDN">PDN</option>
                            <option value="LTR">LTR</option>
                            <option value="360">360</option>
                            <option value="NAN">NAN</option>
                            <option value="RWC">RWC</option>
                            <option value="PNI">PNI</option>
                            <option value="ILU">ILU</option>
                            <option value="MFG">MFG</option>
                            <option value="LIC">LIC</option>
                            <option value="VUK">VUK</option>
                            <option value="PME">PME</option>
                            <option value="GMT">GMT</option>
                            <option value="TLW">TLW</option>
                            <option value="DOW">DOW</option>
                            <option value="JBH">JBH</option>
                            <option value="AKE">AKE</option>
                            <option value="PRU">PRU</option>
                            <option value="KLS">KLS</option>
                            <option value="HLS">HLS</option>
                            <option value="COL">COL</option>
                            <option value="ELD">ELD</option>
                            <option value="TYR">TYR</option>
                            <option value="XRO">XRO</option>
                            <option value="CUV">CUV</option>
                            <option value="NEC">NEC</option>
                            <option value="US30">US30</option>
                            <option value="US500">US500</option>
                            <option value="USNDX">USNDX</option>
                            <option value="GB100">GB100</option>
                            <option value="DE40">DE40</option>
                            <option value="FR40">FR40</option>
                            <option value="IT40">IT40</option>
                            <option value="ES35">ES35</option>
                            <option value="MOEX">MOEX</option>
                            <option value="NL25">NL25</option>
                            <option value="CH20">CH20</option>
                            <option value="STOCKHOLM">STOCKHOLM</option>
                            <option value="WIG">WIG</option>
                            <option value="BE20">BE20</option>
                            <option value="OSLO">OSLO</option>
                            <option value="ATX">ATX</option>
                            <option value="COPENHAGEN">COPENHAGEN</option>
                            <option value="HELSINKI">HELSINKI</option>
                            <option value="HELSINKI 25">HELSINKI 25</option>
                            <option value="ISEQ">ISEQ</option>
                            <option value="PSI 20">PSI 20</option>
                            <option value="BET">BET</option>
                            <option value="BUX">BUX</option>
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
        <form onSubmit={handleSellSubmit} ref={sellFormRef}>
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
                           <option value="AMAZON">AMAZON</option>
                            <option value="APPLE">APPLE</option>
                            <option value="COCA COLA">COCA COLA</option>
                            <option value="DAX30">DAX30</option>
                            <option value="AIRBNB INC">AIRBNB INC</option>
                            <option value="BOEING CO">BOEING CO</option>
                            <option value="GME STOCKS">GME STOCKS</option>
                            <option value="AMC ENTERTAINMENT">AMC ENTERTAINMENT</option>
                            <option value="BLACKBERRY">BLACKBERRY</option>
                            <option value="CITIGROUP INC">CITIGROUP INC</option>
                            <option value="CISCO SYSTEMS INC">CISCO SYSTEMS INC</option>
                            <option value="FACEBOOK">FACEBOOK</option>
                            <option value="TWITTER INC">TWITTER INC</option>
                            <option value="TESLA INC">TESLA INC</option>
                            <option value="SONY ENT">SONY ENT</option>
                            <option value="NASDAQ">NASDAQ</option>
                            <option value="ENTERPRISE GROUP INC">ENTERPRISE GROUP INC</option>
                            <option value="FORD MOTOR">FORD MOTOR</option>
                            <option value="GAZPROM">GAZPROM</option>
                            <option value="GLOBE LIFE INC">GLOBE LIFE INC</option>
                            <option value="WAYFAIR INC">WAYFAIR INC</option>
                            <option value="WALMART INC">WALMART INC</option>
                            <option value="WALT DISNEY CO.">WALT DISNEY CO.</option>
                            <option value="MACY'S INC">{`MACY'S INC`}</option>
                            <option value="MCDONALD'S CORPORATIONS">{`MCDONALD'S CORPORATIONS`}</option>
                            <option value="VISA INC">VISA INC</option>
                            <option value="VERIZON">VERIZON</option>
                            <option value="TMX GROUP LTD">TMX GROUP LTD</option>
                            <option value="ALPHABET INC">ALPHABET INC</option>
                            <option value="ORGANIGRAM HOLDINGS">ORGANIGRAM HOLDINGS</option>
                            <option value="PFIZER INC">PFIZER INC</option>

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
                            <option value="AMAZON">AMAZON</option>
                            <option value="APPLE">APPLE</option>
                            <option value="COCA COLA">COCA COLA</option>
                            <option value="DAX30">DAX30</option>
                            <option value="AIRBNB INC">AIRBNB INC</option>
                            <option value="BOEING CO">BOEING CO</option>
                            <option value="GME STOCKS">GME STOCKS</option>
                            <option value="AMC ENTERTAINMENT">AMC ENTERTAINMENT</option>
                            <option value="BLACKBERRY">BLACKBERRY</option>
                            <option value="CITIGROUP INC">CITIGROUP INC</option>
                            <option value="CISCO SYSTEMS INC">CISCO SYSTEMS INC</option>
                            <option value="FACEBOOK">FACEBOOK</option>
                            <option value="TWITTER INC">TWITTER INC</option>
                            <option value="TESLA INC">TESLA INC</option>
                            <option value="SONY ENT">SONY ENT</option>
                            <option value="NASDAQ">NASDAQ</option>
                            <option value="ENTERPRISE GROUP INC">ENTERPRISE GROUP INC</option>
                            <option value="FORD MOTOR">FORD MOTOR</option>
                            <option value="GAZPROM">GAZPROM</option>
                            <option value="GLOBE LIFE INC">GLOBE LIFE INC</option>
                            <option value="HYDRO ONE LTD">HYDRO ONE LTD</option>
                            <option value="LOTUS VENTURES INC">LOTUS VENTURES INC</option>
                            <option value="KELLOGG COMPANY">KELLOGG COMPANY</option>
                            <option value="MP1">MP1</option>
                            <option value="ZIP">ZIP</option>
                            <option value="PDN">PDN</option>
                            <option value="LTR">LTR</option>
                            <option value="360">360</option>
                            <option value="NAN">NAN</option>
                            <option value="RWC">RWC</option>
                            <option value="PNI">PNI</option>
                            <option value="ILU">ILU</option>
                            <option value="MFG">MFG</option>
                            <option value="LIC">LIC</option>
                            <option value="VUK">VUK</option>
                            <option value="PME">PME</option>
                            <option value="GMT">GMT</option>
                            <option value="TLW">TLW</option>
                            <option value="DOW">DOW</option>
                            <option value="JBH">JBH</option>
                            <option value="AKE">AKE</option>
                            <option value="PRU">PRU</option>
                            <option value="KLS">KLS</option>
                            <option value="HLS">HLS</option>
                            <option value="COL">COL</option>
                            <option value="ELD">ELD</option>
                            <option value="TYR">TYR</option>
                            <option value="XRO">XRO</option>
                            <option value="CUV">CUV</option>
                            <option value="NEC">NEC</option>
                            <option value="US30">US30</option>
                            <option value="US500">US500</option>
                            <option value="USNDX">USNDX</option>
                            <option value="GB100">GB100</option>
                            <option value="DE40">DE40</option>
                            <option value="FR40">FR40</option>
                            <option value="IT40">IT40</option>
                            <option value="ES35">ES35</option>
                            <option value="MOEX">MOEX</option>
                            <option value="NL25">NL25</option>
                            <option value="CH20">CH20</option>
                            <option value="STOCKHOLM">STOCKHOLM</option>
                            <option value="WIG">WIG</option>
                            <option value="BE20">BE20</option>
                            <option value="OSLO">OSLO</option>
                            <option value="ATX">ATX</option>
                            <option value="COPENHAGEN">COPENHAGEN</option>
                            <option value="HELSINKI">HELSINKI</option>
                            <option value="HELSINKI 25">HELSINKI 25</option>
                            <option value="ISEQ">ISEQ</option>
                            <option value="PSI 20">PSI 20</option>
                            <option value="BET">BET</option>
                            <option value="BUX">BUX</option>
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

export default StockPair;
