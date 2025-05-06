'use client';
import React, { Fragment, useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, clearUserState } from '../../slices/fetchUserSlice';
import bitcoin from '../../../../public/images/bitcoin.svg';
import ethereum from '../../../../public/images/ethereum.svg';
import tether from '../../../../public/images/tether.svg';
import FundNow from '../../../components/plan/fundnow';
import CopyWallet from '../../../components/plan/copywallet';
import UploadProof from '../../../components/plan/confirm_deposit';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function Deposit() {
   const router = useRouter();
    const dispatch = useDispatch(); 
     const { user, status, error } = useSelector(
    (state) => state.fetchUserDetails
  );
     useEffect(() => {
      if (user?.kyc === "" || user?.kyc === null || user?.kyc === 'false' || user?.kyc === 'pending' && user?.verifi === 'false' || user?.verifi === ""|| user?.verifi === null|| user?.verifi === 'pending') {
        router.push('./kyc');
      }
    }, [user, router]);
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');
  const min = searchParams.get('min');
  const max = searchParams.get('max');
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [coinValue, setCoinValue] = useState('');
  const [method, setMethod] = useState('bitcoin');
  const [methodSign, setMethodSign] = useState('');
  const [wallet, setWallet] = useState('');
  const [coinImg, setCoinImg] = useState('');
  const [currentState, setCurrentState] = useState('FundNow');
 

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

  return (
    <div className='bg-Primary-3 p-4 lg:p-5 xl-7 rounded-xl col-span-12 xl:col-span-4 w-[full]'>
      <div className='mt-6 gap-6 grid grid-cols-12'>
        {currentState === 'FundNow' && (
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
            plan={plan}
            min={min}
            max={max}
            user={user}
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
        )}
        {currentState === 'UploadProof' && ( <UploadProof isLoading={isLoading} setIsLoading={setIsLoading} plan={plan}/>)}
      </div>
    </div>
  );
}
