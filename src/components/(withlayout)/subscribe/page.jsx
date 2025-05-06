'use client';
import Image from 'next/image';
import React, {useEffect} from 'react';
// import bitcoin from '../public/images/dashboardTable/bitcoin.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, clearUserState } from '../../slices/fetchUserSlice';

export default function Subscribe() {
  const router = useRouter();
  const dispatch = useDispatch();
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
    if (
      user?.kyc === '' ||
      user?.kyc === null ||
      user?.kyc === 'false' ||
      (user?.kyc === 'pending' && user?.verifi === 'false') ||
      user?.verifi === '' ||
      user?.verifi === null ||
      user?.verifi === 'pending'
    ) {
      router.push('./kyc');
    }
  }, [user, router]);
  return (
    <div className='bg-Primary-bg p-3 lg:p-6 min-h-screen'>
      <section className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        <div className='bg-Primary-3 rounded-xl p-4 md:px-7 md:py-6 text-center'>
          <h2 className='text-light font-bold'>SILVER PLAN</h2>
          <div className='price-tag'>
            <span className='symbol text-light'>$10,000 - $99,999</span>
          </div>
          <div className='pricing-features'>
            <div className='feature text-light'>+5 Trades per Week</div>
            <div className='feature text-light'>+ instant trading</div>
            <div className='feature text-light'>leverage upto 2x</div>
          </div>
          <div className='mt-4'>
            <Link href='./subscription_deposit?plan=SILVER&min=10000&max=99999'>
              <button className='btn btn-block pricing-action bg-customGreen text-white'>
                Join plan
              </button>
            </Link>
          </div>
        </div>

        <div className='bg-Primary-3 rounded-xl p-4 md:px-7 md:py-6 text-center'>
          <h2 className='text-light font-bold'>GOLD PLAN</h2>
          <div className='price-tag'>
            <span className='symbol text-light'>$100,000 - $199,999</span>
          </div>
          <div className='pricing-features'>
            <div className='feature text-light'>+10 Trades per Week</div>
            <div className='feature text-light'>+ instant trading</div>
            <div className='feature text-light'>leverage upto 2x AND 5X</div>
          </div>
          <div className='mt-4'>
            <Link href='./subscription_deposit?plan=GOLD&min=100000&max=199999'>
              <button className='btn btn-block pricing-action bg-customGreen text-white'>
                Join plan
              </button>
            </Link>
          </div>
        </div>

        <div className='bg-Primary-3 rounded-xl p-4 md:px-7 md:py-6 text-center'>
          <h2 className='text-light font-bold'>DIAMOND PLAN</h2>
          <div className='price-tag'>
            <span className='symbol text-light'>$200,000 - $299,999</span>
          </div>
          <div className='pricing-features'>
            <div className='feature text-light'>+15 Trades per Week</div>
            <div className='feature text-light'>+ instant trading</div>
            <div className='feature text-light'>
              leverage upto 2X, 5X AND 10X
            </div>
          </div>
          <div className='mt-4'>
            <Link href='./subscription_deposit?plan=DIAMOND&min=200000&max=299999'>
              <button className='btn btn-block pricing-action bg-customGreen text-white'>
                Join plan
              </button>
            </Link>
          </div>
        </div>

        <div className='bg-Primary-3 rounded-xl p-4 md:px-7 md:py-6 text-center'>
          <h2 className='text-light font-bold'>PLATINUM PLAN</h2>
          <div className='price-tag'>
            <span className='symbol text-light'>
              $300,000 - UNLIMITED AMOUNT
            </span>
          </div>
          <div className='pricing-features'>
            <div className='feature text-light'>+20 Trades per Week</div>
            <div className='feature text-light'>+ instant trading</div>
            <div className='feature text-light'>
              leverage upto 2X, 5X, 10X AND 20X
            </div>
          </div>
          <div className='mt-4'>
            <Link href='./subscription_deposit?plan=PLATINUM&min=300000&max=??'>
              <button className='btn btn-block pricing-action bg-customGreen text-white'>
                Join plan
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
