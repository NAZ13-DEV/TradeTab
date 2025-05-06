'use client';
import React, { Fragment, useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, clearUserState } from '../../slices/fetchUserSlice';
import UploadProof from '../../../components/kyc/confirm_deposit'; 
import api from "../../slices/api";
import { useRouter } from 'next/navigation';
export default function Kyc() {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [coinValue, setCoinValue] = useState('');
  const [method, setMethod] = useState('bitcoin');
  const [methodSign, setMethodSign] = useState('');
  const [wallet, setWallet] = useState('');
  const [coinImg, setCoinImg] = useState('');
  const [currentState, setCurrentState] = useState('UploadProof');
  const dispatch = useDispatch();
  const { user, status, error } = useSelector(
    (state) => state.fetchUserDetails
  );
  const router = useRouter();
  useEffect(() => { 
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('uId');
      if (storedUserId) {
        dispatch(fetchUserDetails(storedUserId));
      }
    }
    return () => {
      dispatch(clearUserState());
    };
  }, [dispatch]);
   useEffect(() => {
    if (user?.kyc === 'pending' &&  user?.verifi === 'pending') {
      router.push('./pendingky');
    }
  }, [user, router]);

  return (
    <div className='bg-Primary-3 p-4 lg:p-5 xl-7 rounded-xl col-span-12 xl:col-span-4 w-[full]'>
      <div className='mt-6 gap-6 grid grid-cols-12'>
        {/* {currentState === 'FundNow' && (
          <FundNow
            amount={amount}
            method={method}
            wallet={wallet}
            setWallet={setWallet}
            isLoading={isLoading}
            setMethod={setMethod}
            setAmount={setAmount}
            setIsLoading={setIsLoading}
            setCurrentState={setCurrentState}
            setCoinValue={setCoinValue}
            setMethodSign={setMethodSign}
          />
        )}

        {currentState === 'CopyWallet' && (
          <CopyWallet
            amount={amount}
            method={method}
            wallet={wallet}
            setCurrentState={setCurrentState}
            coinImg={coinImg}
            coinValue={coinValue}
            setCoinImg={setCoinImg}
            bitcoin={bitcoin}
            ethereum={ethereum}
            tether={tether}
            currency={user?.currency}
            methodSign={methodSign}
          />
        )} */}
        {currentState === 'UploadProof' && (
          <UploadProof isLoading={isLoading} setIsLoading={setIsLoading} />
        )}
      </div>
    </div>
  );
}
