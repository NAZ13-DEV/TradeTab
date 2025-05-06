'use client';  
import React, { Fragment,useEffect, useState, useRef } from "react";
import { Listbox, Tab } from "@headlessui/react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../../slices/fetchHistory'; 
import { fetchUserDetails, clearUserState } from '../../slices/fetchUserSlice';
import { useRouter } from 'next/navigation';

const History = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDashboardData());
    const uId = localStorage.getItem('uId');
    if (uId) {
      dispatch(fetchUserDetails(uId));
    }
    return () => {
      dispatch(clearUserState());
    };
  }, [dispatch]);

   const { deposits, profits, userPlans, cryptoWithdrawals, bankWithdrawals} = useSelector( (state) => state.fetchHistory);
 const { user } = useSelector((state) => state.fetchUserDetails);
const router = useRouter();
   useEffect(() => {
    if (user?.kyc === "" || user?.kyc === null || user?.kyc === 'false' || user?.kyc === 'pending' && user?.verifi === 'false' || user?.verifi === ""|| user?.verifi === null|| user?.verifi === 'pending') {
      router.push('./kyc');
      // console.log(user?.kyc, user?.verifi)
    }
  }, [user, router]);
  return (
    <div className='bg-Primary-bg p-3 lg:p-6 min-h-screen'>
  
      <section className='grid grid-cols-12'>
        <div className='p-4 md:px-7 md:py-5 bg-Primary-3 mt-6 col-span-12 xl:col-span-11 rounded-xl'>
          <div className='bg-Primary-3 p-4 lg:px-7 lg:py-6 rounded-xl w-full h-full mt-6 lg:mt-0'>
            <Tab.Group>
              <Tab.List className='flex flex-wrap gap-2 xl:gap-10 mb-3 xl:mb-8'>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={
                        selected
                          ? 'text-Neutral-8 text-base font-semibold leading-[21px] px-2 py-3 outline-none border-b-2 border-Neutral-8'
                          : ' text-white text-base font-semibold leading-[21px] px-2 py-3 outline-none'
                      }
                    >
                      Total Deposit History
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={
                        selected
                          ? 'text-Neutral-8 text-base font-semibold leading-[21px] px-2 py-3 outline-none border-b-2 border-Neutral-8'
                          : ' text-white text-base font-semibold leading-[21px] px-2 py-3 outline-none'
                      }
                    >
                      Total Bank Withdrawal History
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={
                        selected
                          ? 'text-Neutral-8 text-base font-semibold leading-[21px] px-2 py-3 outline-none border-b-2 border-Neutral-8'
                          : ' text-white text-base font-semibold leading-[21px] px-2 py-3 outline-none'
                      }
                    >
                      Total Crypto Withdrawal History
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={
                        selected
                          ? 'text-Neutral-8 text-base font-semibold leading-[21px] px-2 py-3 outline-none border-b-2 border-Neutral-8'
                          : ' text-white text-base font-semibold leading-[21px] px-2 py-3 outline-none'
                      }
                    >
                      Total Earning History
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={
                        selected
                          ? 'text-Neutral-8 text-base font-semibold leading-[21px] px-2 py-3 outline-none border-b-2 border-Neutral-8'
                          : ' text-white text-base font-semibold leading-[21px] px-2 py-3 outline-none'
                      }
                    >
                      Plan Subscription
                    </button>
                  )}
                </Tab>
              </Tab.List>

              <Tab.Panels>
                {/* Profile Panel */}
                <Tab.Panel>
                  <div className='bg-Primary-3 rounded-xl p-4 lg:px-7 lg:py-6 col-span-12 xxl:col-span-9'>
                    <h5 className='text-xl font-semibold text-white leading-[26px] mb-5'>
                      Total Deposit History
                    </h5>
                    <div className='overflow-x-auto'>
                      <table className='table whitespace-nowrap'>
                        <thead>
                          <tr className='border-Neutral-7 text-base font-bold text-Neutral-6 leading-[24px]'>
                            <th>Sn</th>
                            <th>Amount</th>
                            <th>Coin Value</th>
                            <th>Deposit Method</th>
                            <th>Wallet</th>
                            <th>Deposit Id</th>
                            <th>Deposit Status</th>
                            <th>Date of Deposit</th>
                          </tr>
                        </thead>
                        <tbody>
                         {deposits?.map((data, i) => (
                            <tr
                              key={data.id}
                              className='border-Neutral-7 text-base text-Neutral-6 leading-[24px]'
                            >
                              <td>
                                <div>{i + 1}</div>
                              </td>
                            <td>
                            <div>{user?.currency || ''}   {new Intl.NumberFormat('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(data.amount)}</div>
                            </td>
                            <td>
                             <div>
                              {parseFloat(data.amtValue).toFixed(4)} {data.transMethod === 'bitcoin' ? 'Btc':data.transMethod === 'ethereum' ? 'Eth' :data.transMethod === 'tether' ? 'Usdt':''}
                            </div>
                            </td>
                              <td>
                               <div>{data.transMethod?.replace(/\b\w/g, (char) => char.toUpperCase())}</div>
                              </td>
                            
                              <td>
                                <div>{data.Wallet}</div>
                              </td>
                              <td>
                                <div>#{data.transId}</div>
                              </td>
                             
                              <td>
                                <div>{data.transStatus}</div>
                              </td>
                              <td>
                                <div>{data.dateOfTrans}</div>
                              </td>
                            </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className='bg-Primary-3 rounded-xl p-4 lg:px-7 lg:py-6 col-span-12 xxl:col-span-9'>
                    <h5 className='text-xl font-semibold text-white leading-[26px] mb-5'>
                      Total Bank Withdrawal History
                    </h5>
                    <div className='overflow-x-auto'>
                      <table className='table whitespace-nowrap'>
                        <thead>
                          <tr className='border-Neutral-7 text-base font-bold text-Neutral-6 leading-[24px]'>
                          <th>Sn</th>
                          <th>Withdrawal ID</th>
                          <th>Account Name</th>
                          <th>Account Number</th>
                          <th>Bank Name</th>
                          <th>Country</th>
                          <th>Amount</th>
                          <th>Date of Withdrawal</th>
                          <th>Narration</th>
                          <th>Withdrawal Status</th>
                          </tr>
                        </thead>
                        <tbody> 
                           {bankWithdrawals?.map((data, i) => (
                            <tr
                              key={data.id}
                              className='border-Neutral-7 text-base text-Neutral-6 leading-[24px]'
                            >
                              <td>
                                <div>{i + 1}</div>
                              </td>
                              <td>
                                <div>{data.transId}</div>
                              </td>
                              <td>
                                <div>{data.accName}</div>
                              </td>
                              <td>
                                <div>{data.accNum}</div>
                              </td>
                              <td>
                                <div>{data.bankName}</div>
                              </td>
                              <td>
                                <div>{data.country}</div>
                              </td>
                            <td>
                            <div>{user?.currency || ''}   {new Intl.NumberFormat('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(data.amount)}</div>
                            </td>
                              <td>
                                <div>{data.dateOfTrans}</div>
                              </td>
                              <td>
                                <div>{data.narration}</div>
                              </td>
                              <td>
                                <div>{data.transStatus}</div>
                              </td>
                              
                            </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className='bg-Primary-3 rounded-xl p-4 lg:px-7 lg:py-6 col-span-12 xxl:col-span-9'>
                    <h5 className='text-xl font-semibold text-white leading-[26px] mb-5'>
                      Total Crypto Withdrawal History
                    </h5>
                    <div className='overflow-x-auto'>
                      <table className='table whitespace-nowrap'>
                        <thead>
                          <tr className='border-Neutral-7 text-base font-bold text-Neutral-6 leading-[24px]'>
                    <th>Sn</th>
                    <th>Amount</th>
                    <th>Date of Withdrawal</th> 
                    <th>Payment Mode</th>
                    <th>Withdrawal ID</th>
                    <th>Withdrawal Status</th>
                    <th>Wallet</th>


                          </tr>
                        </thead>
                        <tbody>
                          {cryptoWithdrawals?.map((data, i) => (
                            <tr
                              key={data.id}
                              className='border-Neutral-7 text-base text-Neutral-6 leading-[24px]'
                            >
                              <td>
                                <div>{i + 1}</div>
                              </td>
                          
                            <td>
                              <div>
                                {user?.currency || ''}{' '}
                                {new Intl.NumberFormat('en-US', {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(data.amount)}
                              </div>
                            </td>
                             <td>
                              <div>{data.dateOfTrans}</div>
                            </td> 
                            <td>
                              <div>{data.payment_mode}</div>
                            </td>
                            <td>
                              <div>#{data.transId}</div>
                            </td>
                          
                            <td>
                              <div>{data.transStatus}</div>
                            </td>  
                            <td>
                              <div>{data.wallet}</div>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className='bg-Primary-3 rounded-xl p-4 lg:px-7 lg:py-6 col-span-12 xxl:col-span-9'>
                    <h5 className='text-xl font-semibold text-white leading-[26px] mb-5'>
                      Total Earning History
                    </h5>
                    <div className='overflow-x-auto'>
                      <table className='table whitespace-nowrap'>
                        <thead>
                          <tr className='border-Neutral-7 text-base font-bold text-Neutral-6 leading-[24px]'>
                          <th>Sn</th>
                           <th>Amount</th>
                           <th>Type</th> 
                           <th>Transaction Id</th>
                           <th>Transaction Status</th>
                           <th>Date of Transaction</th>

                          </tr>
                        </thead>
                        <tbody>
                             {profits?.map((data, i) => (
                            <tr
                              key={data.id}
                              className='border-Neutral-7 text-base text-Neutral-6 leading-[24px]'
                            >
                              <td>
                                <div>{i + 1}</div>
                              </td>
                            <td>
                            <div>{user?.currency || ''}{new Intl.NumberFormat('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(parseInt(data.amount))}</div>
                            </td>
                       
                              <td>
                               <div>{data.type?.replace(/\b\w/g, (char) => char.toUpperCase())}</div>
                              </td>
                            
                              <td>
                                <div>#{data.transId}</div>
                              </td>
                              <td>
                                <div>{data.transStatus}</div>
                              </td>
                              <td>
                                <div>{data.dateOfTrans}</div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className='bg-Primary-3 rounded-xl p-4 lg:px-7 lg:py-6 col-span-12 xxl:col-span-9'>
                    <h5 className='text-xl font-semibold text-white leading-[26px] mb-5'>
                      Total Plan Subscription
                    </h5>
                    <div className='overflow-x-auto'>
                      <table className='table whitespace-nowrap'>
                        <thead>
                          <tr className='border-Neutral-7 text-base font-bold text-Neutral-6 leading-[24px]'>
                                   <th>Sn</th>
                            <th>Amount</th>
                            <th>Coin Value</th>
                            <th>Deposit Method</th>
                            <th>Wallet</th>
                            <th>Deposit Plan</th>
                            <th>Deposit Id</th>
                            <th>Deposit Status</th>
                            <th>Date of Deposit</th>
                          </tr>
                        </thead>
                       <tbody>
                          {userPlans?.map((data, i) => (
                            <tr
                              key={data.id}
                              className='border-Neutral-7 text-base text-Neutral-6 leading-[24px]'
                            >
                              <td>
                                <div>{i + 1}</div>
                              </td>
                            <td>
                            <div>{user?.currency || ''}{new Intl.NumberFormat('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(data.cryptoAmt)}</div>
                            </td>
                              <td>
                             <div>
                              {parseFloat(data.cryptovalue).toFixed(4)} {data.netWork === 'bitcoin' ? 'Btc':data.netWork === 'ethereum' ? 'Eth' :data.netWork === 'tether' ? 'Usdt':''}
                            </div>
                            </td>
                              <td>
                               <div>{data.netWork?.replace(/\b\w/g, (char) => char.toUpperCase())}</div>
                              </td>
                            
                              <td>
                                <div>{data.companyWallet}</div>
                              </td>
                              <td>
                               <div>{data.selectedPlan?.replace(/\b\w/g, (char) => char.toUpperCase())} Plan</div>

                              </td>
                              <td>
                                <div>#{data.transId}</div>
                              </td>
                             
                              <td>
                                <div>{data.transStatus}</div>
                              </td>
                              <td>
                                <div>{data.dateOfTrans}</div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </section>
    </div>
  );
};

export default History;
