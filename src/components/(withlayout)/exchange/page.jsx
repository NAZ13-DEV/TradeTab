"use client";
import React,  { Fragment, useEffect} from "react";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, clearUserState } from '../../slices/fetchUserSlice';

const Exchange = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
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
    const container = document.querySelector(".tradingview-widget-container__widget");
    container.appendChild(script);

    return () => {
      container.innerHTML = ""; // Cleanup on component unmount
    };
  }, []);
   useEffect(() => {
     const uId = localStorage.getItem('uId');
     if (uId) {
       dispatch(fetchUserDetails(uId));
     }
     return () => {
       dispatch(clearUserState());
     };
   }, [dispatch]);
const { user, status, error } = useSelector((state) => state.fetchUserDetails);
  const router = useRouter();
   useEffect(() => {
    if (user?.kyc === "" || user?.kyc === null || user?.kyc === 'false' || user?.kyc === 'pending' && user?.verifi === 'false' || user?.verifi === ""|| user?.verifi === null|| user?.verifi === 'pending') {
      router.push('./kyc');
      // console.log(user?.kyc, user?.verifi)
    }
  }, [user, router]);
  return (
    <div className='bg-Primary-bg p-3 lg:p-6 min-h-screen'>
      {/* Chart part start  */}
      <section className='mt-6 gap-6 grid grid-cols-12'>
        {/* Doughunt chart  */}
        <div className='bg-Primary-3 col-span-12 xl:col-span-12 rounded-xl p-4 md:px-7 md:py-6'>
          {/* <DoughnutChart /> */}
          <div className='tradingview-widget-container bg-gray-900 p-4 rounded-md shadow-lg'>
            <div className='tradingview-widget-container__widget'></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Exchange;
