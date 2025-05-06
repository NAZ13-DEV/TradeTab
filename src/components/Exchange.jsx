/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, clearUserState } from '../redux/slices/fetchUserSlice';
// import Kyc from './Kyc'; 

const Exchange = () => {
  const dispatch = useDispatch();
  // const [showKyc, setShowKyc] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: 900,
      defaultColumn: "overview",
      defaultScreen: "general",
      market: "crypto",
      showToolbar: true,
      colorTheme: "dark",
      locale: "en",
    });

    const container = document.querySelector('.tradingview-widget-container__widget');
    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, []);

  const { user } = useSelector((state) => state.fetchUserDetails);

  useEffect(() => {
    const uId = localStorage.getItem('uId');
    if (uId) {
      dispatch(fetchUserDetails(uId));
    }
    return () => {
      dispatch(clearUserState());
    };
  }, [dispatch]);

  // useEffect(() => {
  //   const kycInvalid =
  //     !user?.kyc || user?.kyc === 'false' || user?.kyc === 'pending';
  //   const verifiInvalid =
  //     !user?.verifi || user?.verifi === 'false' || user?.verifi === 'pending';

  //   if (kycInvalid || verifiInvalid) {
  //     setShowKyc(true);
  //   }
  // }, [user]);

  // if (showKyc) {
  //   return <Kyc />;
  // }

  return (
    <div className='min-h-screen p-3 bg-Primary-bg lg:p-6'>
      <section className='grid grid-cols-12 gap-6 mt-6'>
        <div className='col-span-12 p-4 bg-Primary-3 xl:col-span-12 rounded-xl md:px-7 md:py-6'>
          <div className='p-4 bg-gray-900 rounded-md shadow-lg tradingview-widget-container'>
            <div className='tradingview-widget-container__widget'></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Exchange;
