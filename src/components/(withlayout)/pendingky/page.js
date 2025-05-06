"use client"
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../../slices/fetchUserSlice';
import { useRouter } from 'next/navigation';


  const KYCStatus = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { notifications, loading, error } = useSelector((state) => state.notifications);
  const { user } = useSelector((state) => state.fetchUserDetails);

  useEffect(() => {
    const storedUserId = localStorage.getItem('uId');
    if (storedUserId) {
      dispatch(fetchUserDetails(storedUserId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user?.kyc === "true"  && user?.verifi === 'true' ) {
      router.push('./dashboard');
    }
  }, [user, router]);
  return (
    <div className='min-h-screen bg-Primary-bg flex items-center justify-center'>
      <div>
        <h3 className='text-white text-2xl lg:text-[32px] font-semibold leading-[38px] mt-6 text-center'>
          KYC Submitted
        </h3>
        <p className='w-full lg:w-[610px] text-customGreen text-lg leading-[27px] mt-[17px] mx-auto text-center'>
          Your KYC submission has been received and is awaiting approval. We will notify you once the verification is complete.
        </p>
        <div className='text-center'>
          <div className='w-[190px] mx-auto rounded-lg px-2 py-1 mt-8 bg-gradient-to-r from-[#00bdff] to-[#00bdff] animate-gradient'></div>
        </div>
      </div>
    </div>
  );
};

export default KYCStatus;
