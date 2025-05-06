'use client'
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, clearUserState } from '../../slices/fetchUserSlice';
import Coin from '../../../components/Exchange/Coin';
import OrderHistory from '../../../components/order_history/page';
// import DoughnutChart from '../../../components/chart/DoughnutChart';
// import KycCheck from '../../../components/verificationcheck/page';
import { useRouter } from 'next/navigation';
const DashBoard = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);
  const [mounted, setMounted] = useState(false);
  const { user, status, error } = useSelector((state) => state.fetchUserDetails);
  // console.log(error);
 const router = useRouter();

  const [formFields, setFormFields] = useState({
    amount: '',
    symbol: '',
    interval: '60',
    leverage: '0.5X',
    stopLoss: '',
    takeProfit: '',
    entryPrice: '',
    tradeType: 'buy',
    tradingPair: '',
    userId: null
  });
  const [sellForm, setSellForm] = useState({
    amount: '',
    symbol: '',
    interval: '60',
    leverage: '0.5X',
    stopLoss: '',
    takeProfit: '',
    entryPrice: '',
    tradeType: 'sell',
    tradingPair: '',
    userId: null
  });
 const [selectedOption, setSelectedOption] = useState(''); 
  const buyFormRef = useRef(null);
  const sellFormRef = useRef(null);

  useEffect(() => {
    setMounted(true); 
  }, []);

  useEffect(() => {
    if (mounted) {
      if (typeof window !== 'undefined') {
        const storedUserId = localStorage.getItem('uId');
        setUserId(storedUserId);
      }
    }
  }, [mounted]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserDetails(userId));
    }
    return () => {
      dispatch(clearUserState());
    };
  }, [dispatch, userId]);
   useEffect(() => {
    if (user?.kyc === "" || user?.kyc === null || user?.kyc === 'false' || user?.kyc === 'pending' && user?.verifi === 'false' || user?.verifi === ""|| user?.verifi === null|| user?.verifi === 'pending') {
      router.push('./kyc');
      // console.log(user?.kyc, user?.verifi)
    }
  }, [user, router]);
  if (!mounted) return null; 

  return (
    // <KycCheck />
    <div className='p-3 bg-Primary-bg lg:p-6'>
      {/* Small charts */}
  {/* {user?.kyc === "true" && user?.verifi === "true" ? '' : <KycCheck />} */}
      <section className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
      <div className='px-5 py-4 rounded-lg bg-Primary-3'>
          <div className='flex flex-wrap items-center justify-between'>
            <div>
              <span className='text-base text-Neutral-9'>Deposit</span>
              <h4 className='mt-2 text-2xl font-semibold text-Neutral-9'>
                {user
                  ? `${user.currency}${new Intl.NumberFormat('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(user.total_depo)}`
                  : 'Loading...'}
              </h4>
            </div>
          </div>
          {/* <div className='h-[55px] w-full mt-2 lg:mt-5'>{'chart.chart'}</div> */}
        </div>
        <div className='px-5 py-4 rounded-lg bg-Primary-3'>
          <div className='flex flex-wrap items-center justify-between'>
            <div>
              <span className='text-base text-Neutral-9'>Profit</span>
              <h4 className='mt-2 text-2xl font-semibold text-Neutral-9'>
                {user
                  ? `${user.currency}${new Intl.NumberFormat('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(user.total_pro)}`
                  : 'Loading...'}
              </h4>
            </div>
          </div>
          {/* <div className='h-[55px] w-full mt-2 lg:mt-5'>{'chart.chart'}</div> */}
        </div>
        <div className='px-5 py-4 rounded-lg bg-Primary-3'>
          <div className='flex flex-wrap items-center justify-between'>
            <div>
              <span className='text-base text-Neutral-9'>Total Balance</span>
              <h4 className='mt-2 text-2xl font-semibold text-Neutral-9'>
                {user
                  ? `${user.currency}${new Intl.NumberFormat('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(user.balance)}`
                  : 'Loading...'}
              </h4>
            </div>
          </div>
          {/* <div className='h-[55px] w-full mt-2 lg:mt-5'>{'chart.chart'}</div> */}
        </div>



      </section>

      {/* Monthly Overall Growth */}
      <section className='grid grid-cols-12 gap-6 mt-6'>
        {/* Line chart */}
        <div className='col-span-12 p-4 bg-Primary-3 rounded-xl lg:px-7 lg:py-6 xl:col-span-9'>
          <div className='flex flex-wrap items-center justify-between gap-3 mb-6'>
            <div className='h-[600px] lg:h-[600px] w-full'>
              {/* Embed TradingView Widget */}
              <iframe
                src='https://s.tradingview.com/widgetembed/?frameElementId=tradingview_a0a91&symbol=NASDAQ:AAPL&interval=D&hidesidetoolbar=1&hidetoptoolbar=1&theme=dark&style=1&locale=en'
                width='100%'
                height='100%'
                frameBorder='0'
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* Doughnut chart */}
        <div className='col-span-12 p-4 bg-Primary-3 xl:col-span-3 rounded-xl xxl:px-7 md:py-6'>
          <div className='mt-2 text-center lg:mt-5'>
            <div className='tradingview-widget-container'>
              <iframe
                frameBorder='0'
                src='https://www.tradingview-widget.com/embed-widget/screener/?locale=en#%7B%22width%22%3A%22220%22%2C%22height%22%3A600%2C%22defaultColumn%22%3A%22overview%22%2C%22defaultScreen%22%3A%22general%22%2C%22market%22%3A%22forex%22%2C%22showToolbar%22%3Afalse%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Afalse%2C%22enableScrolling%22%3Atrue%2C%22utm_source%22%3A%22phoenxfx.theaang.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22forexscreener%22%7D'
                style={{
                  boxSizing: 'border-box',
                  height: '600px',
                  width: '100%',
                  margin: '0px',
                  padding: '0px',
                  background: '#000000',
                }}
              ></iframe>
              <style jsx>{`
                .tradingview-widget-copyright {
                  font-size: 13px !important;
                  line-height: 32px !important;
                  text-align: center !important;
                  vertical-align: middle !important;
                  font-family: 'Trebuchet MS', Arial, sans-serif !important;
                  color: #9db2bd !important;
                }
                .tradingview-widget-copyright .blue-text {
                  color: #2962ff !important;
                }
                .tradingview-widget-copyright a {
                  text-decoration: none !important;
                  color: #9db2bd !important;
                }
                .tradingview-widget-copyright a:visited {
                  color: #9db2bd !important;
                }
                .tradingview-widget-copyright a:hover .blue-text {
                  color: #1e53e5 !important;
                }
                .tradingview-widget-copyright a:visited .blue-text {
                  color: #2962ff !important;
                }
                .tradingview-widget-chart {
                  background-color: #000000;
                }
                #marketOrderSelect {
                  width: 100%;
                  background-color: black;
                  color: white;
                }
                #marketOrderSelect option {
                  background-color: black;
                  color: white;
                }
              `}</style>
            </div>
          </div>
        </div>
      </section>

      <section className='mt-6'>
      <Coin formFields={formFields} sellForm={sellForm} setFormFields={setFormFields} setSellForm={setSellForm} selectedOption = {selectedOption} setSelectedOption = {setSelectedOption} buyFormRef={buyFormRef} sellFormRef={sellFormRef} />
      </section>

      <section className='mt-6'>
        <OrderHistory setFormFields={setFormFields} setSellForm={setSellForm} selectedOption = {selectedOption} setSelectedOption = {setSelectedOption} buyFormRef={buyFormRef} sellFormRef={sellFormRef} />
      </section>
    </div>
  );
};

export default DashBoard;
