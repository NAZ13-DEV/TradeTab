'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import {useRouter } from 'next/navigation';
import api from '../../slices/api';

const VerifyEmail = () => {
  const router = useRouter(); 
  
  // React.useEffect(() => {
  //   api
  //     .post('logoutUser')
  //     .then((response) => {
  //       if (response.status === 201) {
  //         const responseData = response.data.message;
  //         setMessage(responseData);
  //         setTimeout(() => {
  //           router.push('sign_in');
  //         }, 3000);
  //       }
  //     })
  //     .catch((error) => {
  //       if (error.response?.status === 422) {
  //         const regErrors = error.response.data.errors[0];
  //         setMessage(regErrors);

  //         console.error(regErrors);
  //       }
  //     });
  // }, []);
  React.useEffect(() => {
    // Clear cookies and other session data
    document.cookie = 'uId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // Clear localStorage data if any
    localStorage.removeItem('uId');
    localStorage.removeItem('url');

    // setTimeout(() => {
      router.push('../../utillity/sign_in');
    // }, 3000);
  }, [router]);
  return (
    <div className='min-h-screen bg-Primary-bg flex items-center justify-center'>
      <div>
        <h3 className='text-customGreen text-2xl lg:text-[32px] font-semibold leading-[38px] mt-6 text-center'>
          Logging out user
        </h3>
        
        <div className='text-center'>
          <div className='w-[190px] mx-auto bg-gradient-to-r from-[#00bdff] to-[#00bdff] rounded-lg px-2 py-1 mt-8'></div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
