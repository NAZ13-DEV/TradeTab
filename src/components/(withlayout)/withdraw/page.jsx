'use client';
import React, { Fragment, useState, useEffect } from 'react';
import api from '../../slices/api';
import toast, { Toaster } from 'react-hot-toast';
import { Listbox, Tab } from "@headlessui/react";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, clearUserState } from '../../slices/fetchUserSlice';

const Withdrawal = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [withdrawData, setWithdrawData] = useState({
    payment_mode: 'Bitcoin Withdrawal',  
    amount: '',
    address: '', 
    bankName: '',  
    accountNumber: '', 
    accountName: '', 
    country: '', 
    swiftCode: '', 
    narration: '', 
  });
  const router = useRouter();
    const { user, status, error } = useSelector(
      (state) => state.fetchUserDetails
    );
       useEffect(() => {
         const storedUserId = localStorage.getItem('uId');
         if (storedUserId) {
           dispatch(fetchUserDetails(storedUserId));
         }
         return () => {
           dispatch(clearUserState());
         };
       }, [dispatch]);
     useEffect(() => {
      if (user?.kyc === "" || user?.kyc === null || user?.kyc === 'false' || user?.kyc === 'pending' && user?.verifi === 'false' || user?.verifi === ""|| user?.verifi === null|| user?.verifi === 'pending') {
        router.push('./kyc');
      }
    }, [user, router]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWithdrawData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateFields = () => {
    if (withdrawData.payment_mode === 'Bitcoin Withdrawal') {
      if (!withdrawData.address || !withdrawData.amount) {
        toast.dismiss();
        toast.error('Address and Amount are required for Bitcoin Withdrawal');
        return false;
      }
    } 
    
    if ( withdrawData.payment_mode === 'Ethereum Withdrawal') {
      if (!withdrawData.address || !withdrawData.amount) {
        toast.dismiss();
        toast.error('Address and Amount are required for Ethereum Withdrawal');
        return false;
      }
    } 
    
    
    if (withdrawData.payment_mode === 'Bank withdrawal') {
      if (
        !withdrawData.amount ||
        !withdrawData.bankName ||
        !withdrawData.accountNumber ||
        !withdrawData.accountName ||
        !withdrawData.country ||
        !withdrawData.swiftCode ||
        !withdrawData.narration
      ) {
        toast.dismiss();
        toast.error('All bank fields are required');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    const uId = localStorage.getItem('uId');
    if (!uId) {
      toast.error('User ID not found. Please log in again.');
      return;
    }

    // Prepare the data for the Axios request
    let data = {
      userId: uId, // User ID from localStorage
      payment_mode: withdrawData.payment_mode,
      amount: withdrawData.amount,
    };

    if (withdrawData.payment_mode === 'Bank withdrawal') {
      data = {
        ...data,
        bankName: withdrawData.bankName,
        accountNumber: withdrawData.accountNumber,
        accountName: withdrawData.accountName,
        country: withdrawData.country,
        swiftCode: withdrawData.swiftCode,
        narration: withdrawData.narration,
      };
      toast.loading('Processing Bank withdrawal...', { id: 'withdrawalToast' });
      api.post('bankWithdrawal', data)
        .then((response) => {
          if (response.status === 201 && response.data.message === 'true') {
             toast.success('Your Bank withdrawal is Being Processed', {
             autoClose: 4000,  
               });
         setTimeout(() => {
         router.push('./history');
         }, 3000);
          }
        })
        .catch(() => {
          toast.error(
            'An error occurred with the bank withdrawal. Please try again.'
          );
        })
        .finally(() => {
             toast.dismiss('withdrawalToast');
         
        });
    } 
     if (withdrawData.payment_mode === 'Bitcoin Withdrawal') {
      data = {
        ...data,
        wallet: withdrawData.address,
      };

      
      toast.loading('Processing Bitcoin Withdrawal...', {
        id: 'withdrawalToast',
      });
      api.post('CryptoWithdrawal', data)
        .then((response) => {
          if (response.status === 201 && response.data.message === 'true') {
            toast.success('Your Crypto Withdrawal is Being Processed', {
             autoClose: 4000,  
               });
           setTimeout(() => {
         router.push('./history');
         }, 3000);
          }
        })
        .catch(() => {
          toast.error(
            'An error occurred with the crypto withdrawal. Please try again.'
          );
        })
        .finally(() => {
           
             toast.dismiss('withdrawalToast');
        
        });
    }
     if (withdrawData.payment_mode === 'Ethereum Withdrawal') {
      data = {
        ...data,
        wallet: withdrawData.address,
      };

    
      toast.loading('Processing Ethereum Withdrawal...', {
        id: 'withdrawalToast',
      });
      api.post('CryptoWithdrawal', data)
        .then((response) => {
          if (response.status === 201 && response.data.message === 'true') {
            toast.success('Your Crypto Withdrawal is Being Processed', {
             autoClose: 4000,  
               });
              setTimeout(() => {
         router.push('./history');
         }, 3000);
          }
        })
        .catch(() => {
          toast.error(
            'An error occurred with the crypto withdrawal. Please try again.'
          );
        })
        .finally(() => {
             toast.dismiss('withdrawalToast');
        });
    }
  };

  return (
    <div className='bg-Primary-3 p-4 lg:p-5 xl-7 rounded-xl col-span-12 xl:col-span-4 w-full'>
      <div className='mt-6 gap-6 grid grid-cols-12'>
        <div className='bg-Primary-bg rounded-xl p-4 lg:px-7 lg:py-6 col-span-12 xl:col-span-12'>
          <form onSubmit={handleSubmit}>
                  <Toaster position='top-center' />
            <div className='flex gap-3 flex-wrap justify-between items-center mb-6'>
              <div className='h-auto lg:h-auto w-full'>
                <div className='grid grid-cols-12'>
                  <div className='p-4 md:px-7 md:py-5 bg-Primary-3 mt-6 col-span-12 xl:col-span-11 rounded-xl'>
                    <div className='bg-Primary-3 p-4 lg:px-7 lg:py-6 rounded-xl w-full h-full mt-6 lg:mt-0'>
                      <h5 className='text-base text-customGreen font-bold leading-[24px] mb-3 text-center'>
                        Choose your desired method of withdrawal.
                      </h5>
                      <Tab.Group>
                        <Tab.List className='flex flex-wrap gap-2 xl:gap-10 mb-3 xl:mb-8'>
                          <Tab as='Fragment'>
                            {({ selected }) => (
                              <button
                                className={
                                  selected
                                    ? 'text-Neutral-8 text-base font-semibold leading-[21px] px-2 py-3 outline-none border-b-2 border-Neutral-8'
                                    : 'text-white text-base font-semibold leading-[21px] px-2 py-3 outline-none'
                                }
                                onClick={() =>
                                  setWithdrawData({
                                    ...withdrawData,
                                    payment_mode: 'Bitcoin Withdrawal',
                                    amount: '',
                                    address: '',
                                  })
                                }
                              >
                                Bitcoin Withdrawal Method
                              </button>
                            )}
                          </Tab>
                          <Tab as='Fragment'>
                            {({ selected }) => (
                              <button
                                className={
                                  selected
                                    ? 'text-Neutral-8 text-base font-semibold leading-[21px] px-2 py-3 outline-none border-b-2 border-Neutral-8'
                                    : 'text-white text-base font-semibold leading-[21px] px-2 py-3 outline-none'
                                }
                                onClick={() =>
                                  setWithdrawData({
                                    ...withdrawData,
                                    payment_mode: 'Ethereum Withdrawal',
                                      amount: '',
                                    address: '',
                                  })
                                }
                              >
                                Ethereum Withdrawal Method
                              </button>
                            )}
                          </Tab>
                          <Tab as='Fragment'>
                            {({ selected }) => (
                              <button
                                className={
                                  selected
                                    ? 'text-Neutral-8 text-base font-semibold leading-[21px] px-2 py-3 outline-none border-b-2 border-Neutral-8'
                                    : 'text-white text-base font-semibold leading-[21px] px-2 py-3 outline-none'
                                }
                                onClick={() =>
                                  setWithdrawData({
                                    ...withdrawData,
                                    payment_mode: 'Bank withdrawal',
                                  })
                                }
                              >
                                Bank withdrawal Method
                              </button>
                            )}
                          </Tab>
                        </Tab.List>

                        <Tab.Panels>
                          {/* Bitcoin Panel */}
                          <Tab.Panel>
                            <div className='bg-Primary-3 rounded-xl p-4 lg:px-7 lg:py-6 col-span-12 xxl:col-span-9'>
                              <h5 className='text-xl font-semibold text-white leading-[26px] mb-5'>
                                Bitcoin Withdrawal Method
                              </h5>
                              <div className='overflow-x-auto'>
                                <div className='bg-Primary-3 rounded-xl p-4 lg:px-7 lg:py-6 col-span-12 xxl:col-span-9'>
                                  <div className='overflow-x-auto h-auto'>
                                    <div className='flex gap-3 flex-wrap justify-between items-center mb-6'>
                                      <div className='h-[300px] lg:h-[300px] w-full'>
                                        <div className='mt-6'>
                                          <label>
                                            <h5 className='text-base text-customGreen font-bold leading-[24px] mb-3 text-center'>
                                              Destination Address (Please double
                                              check this address)
                                            </h5>
                                          </label>
                                          <input
                                            type='text'
                                            placeholder='Enter Bitcoin Address'
                                            className='w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10'
                                            name='address'
                                            value={withdrawData.address}
                                            onChange={handleInputChange}
                                          />
                                        </div>
                                        <div className='mt-6'>
                                          <label>
                                            <h5 className='text-base text-customGreen font-bold leading-[24px] mb-3 text-center'>
                                              Withdrawal Amount
                                            </h5>
                                          </label>
                                          <input
                                            type='number'
                                            placeholder='Amount to be Withdrawn'
                                            className='w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10'
                                            name='amount'
                                            value={withdrawData.amount}
                                            onChange={handleInputChange}
                                          />
                                        </div>
                                        <button
                                          type='submit'
                                          className='mt-4 px-4 py-2 text-white font-semibold leading-[18px] border border-Neutral-8 rounded-lg hover:bg-Neutral-8 w-full'
                                          disabled={isLoading}
                                        >
                                          {isLoading
                                            ? 'Loading...'
                                            : 'Withdraw'}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Tab.Panel>

                          {/* Ethereum Panel */}
                          <Tab.Panel>
                            <div className='bg-Primary-3 rounded-xl p-4 lg:px-7 lg:py-6 col-span-12 xxl:col-span-9'>
                              <h5 className='text-xl font-semibold text-white leading-[26px] mb-5'>
                                Ethereum Withdrawal Method
                              </h5>
                              <div className='overflow-x-auto'>
                                <div className='bg-Primary-3 rounded-xl p-4 lg:px-7 lg:py-6 col-span-12 xxl:col-span-9'>
                                  <div className='overflow-x-auto h-auto'>
                                    <div className='flex gap-3 flex-wrap justify-between items-center mb-6'>
                                      <div className='h-[300px] lg:h-[300px] w-full'>
                                        <div className='mt-6'>
                                          <label>
                                            <h5 className='text-base text-customGreen font-bold leading-[24px] mb-3 text-center'>
                                              Destination Address (Please double
                                              check this address)
                                            </h5>
                                          </label>
                                          <input
                                            type='text'
                                            placeholder='Enter Ethereum Address'
                                            className='w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10'
                                            name='address'
                                            value={withdrawData.address}
                                            onChange={handleInputChange}
                                          />
                                        </div>
                                        <div className='mt-6'>
                                          <label>
                                            <h5 className='text-base text-customGreen font-bold leading-[24px] mb-3 text-center'>
                                              Withdrawal Amount
                                            </h5>
                                          </label>
                                          <input
                                            type='number'
                                            placeholder='Amount to be Withdrawn'
                                            className='w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10'
                                            name='amount'
                                            value={withdrawData.amount}
                                            onChange={handleInputChange}
                                          />
                                        </div>
                                        <button
                                          type='submit'
                                          className='mt-4 px-4 py-2 text-white font-semibold leading-[18px] border border-Neutral-8 rounded-lg hover:bg-Neutral-8 w-full'
                                          disabled={isLoading}
                                        >
                                          {isLoading
                                            ? 'Loading...'
                                            : 'Withdraw'}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Tab.Panel>

                          {/* Bank Panel */}
                          <Tab.Panel>
                            <div className='bg-Primary-3 rounded-xl p-4 lg:px-7 lg:py-6 col-span-12 xxl:col-span-9'>
                              <h5 className='text-xl font-semibold text-white leading-[26px] mb-5'>
                                Bank withdrawal Method
                              </h5>
                              <div className='overflow-x-auto'>
                                <div className='bg-Primary-3 rounded-xl p-4 lg:px-7 lg:py-6 col-span-12 xxl:col-span-9'>
                                  <div className='overflow-x-auto h-auto'>
                                    <div className='flex gap-3 flex-wrap justify-between items-center mb-6'>
                                      <div className=' lg:h-[300px] w-full'>
                                            <div className='mt-6'>
                                          <label>
                                            <h5 className='text-base text-customGreen font-bold leading-[24px] mb-3 text-center'>
                                              Withdrawal Amount
                                            </h5>
                                          </label>
                                          <input
                                            type='number'
                                            placeholder='Amount to be Withdrawn'
                                            className='w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10'
                                            name='amount'
                                            value={withdrawData.amount}
                                            onChange={handleInputChange}
                                          />
                                        </div>
                                        <div className='mt-6'>
                                          <label>
                                            <h5 className='text-base text-customGreen font-bold leading-[24px] mb-3 text-center'>
                                              Bank Name
                                            </h5>
                                          </label>
                                          <input
                                            type='text'
                                            placeholder='Bank Name'
                                            className='w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10'
                                            name='bankName'
                                            value={withdrawData.bankName}
                                            onChange={handleInputChange}
                                          />
                                        </div>
                                        <div className='mt-6'>
                                          <label>
                                            <h5 className='text-base text-customGreen font-bold leading-[24px] mb-3 text-center'>
                                              Account Number
                                            </h5>
                                          </label>
                                          <input
                                            type='number'
                                            placeholder='Account Number'
                                            className='w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10'
                                            name='accountNumber'
                                            value={withdrawData.accountNumber}
                                            onChange={handleInputChange}
                                          />
                                        </div>
                                        <div className='mt-6'>
                                          <label>
                                            <h5 className='text-base text-customGreen font-bold leading-[24px] mb-3 text-center'>
                                              Account Name
                                            </h5>
                                          </label>
                                          <input
                                            type='text'
                                            placeholder='Account Name'
                                            className='w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10'
                                            name='accountName'
                                            value={withdrawData.accountName}
                                            onChange={handleInputChange}
                                          />
                                        </div>
                                        <div className='mt-6'>
                                          <label>
                                            <h5 className='text-base text-customGreen font-bold leading-[24px] mb-3 text-center'>
                                              Swift Code
                                            </h5>
                                          </label>
                                          <input
                                            type='text'
                                            placeholder='Swift Code'
                                            className='w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10'
                                            name='swiftCode'
                                            value={withdrawData.swiftCode}
                                            onChange={handleInputChange}
                                          />
                                        </div>
                                        <div className='mt-6'>
                                          <label>
                                            <h5 className='text-base text-customGreen font-bold leading-[24px] mb-3 text-center'>
                                              Country
                                            </h5>
                                          </label>
                                          <input
                                            type='text'
                                            placeholder='Country'
                                            className='w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10'
                                            name='country'
                                            value={withdrawData.country}
                                            onChange={handleInputChange}
                                          />
                                        </div>
                                        <div className='mt-6'>
                                          <label>
                                            <h5 className='text-base text-customGreen font-bold leading-[24px] mb-3 text-center'>
                                              Narration (Optional)
                                            </h5>
                                          </label>
                                          <input
                                            type='text'
                                            placeholder='Enter Narration'
                                            className='w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10'
                                            name='narration'
                                            value={withdrawData.narration}
                                            onChange={handleInputChange}
                                          />
                                        </div>
                                        <button
                                          type='submit'
                                          className='mt-4 px-4 py-2 text-white font-semibold leading-[18px] border border-Neutral-8 rounded-lg hover:bg-Neutral-8 w-full'
                                          disabled={isLoading}
                                        >
                                          {isLoading
                                            ? 'Loading...'
                                            : 'Withdraw'}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Tab.Panel>
                        </Tab.Panels>
                      </Tab.Group>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
