'use client';
import { useState, useEffect } from 'react';
import api from '../../slices/api';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, clearUserState } from '../../slices/fetchUserSlice';

export default function UploadProof() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
    const dispatch = useDispatch();
  const [file, setFile] = useState(null);
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
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || file.size === 0) {
      toast.error('Your Profile Picture is empty');
      return;
    }

    // Get session user ID from localStorage
    const sessionGetUserID = localStorage.getItem('uId');
    if (!sessionGetUserID) {
      toast.error('User session not found. Please log in again.');
      return;
    }

    const LoginData = new FormData();
    LoginData.append('id', sessionGetUserID);
    LoginData.append('documents', file); 

    try {
      setIsLoading(true);
      const response = await api.post('updateProfilePics', LoginData);
      if (response.status === 201) {
        const message = response.data.message;
          toast.success(message);
          setTimeout(() => {
         router.push('./dashboard');
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 422) {
        const message = error.response.data;
        const parsedMessage = JSON.parse(message);
        toast.error(parsedMessage);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-Primary-bg rounded-xl p-4 lg:px-7 lg:py-6 col-span-12 xl:col-span-12'>
      <Toaster position='top-center' />
      <form onSubmit={handleUpload}>
        <div className='flex gap-3 flex-wrap justify-between items-center mb-6 scrollable-container'>
          <div className='h-[300px] lg:h-[300px] w-full'>
            <h5 className='text-base text-customGreen font-bold leading-[24px] mb-3 text-center'>
              Upload Your Desired Profile Picture 
            </h5>
            <div className='mt-6'>
              <input
                type='file'
                onChange={handleFileChange}
                className='w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10'
              />
            </div>
            <button
              type='submit'
              className='mt-4 px-4 py-2 text-white font-semibold leading-[18px] border border-Neutral-8 rounded-lg hover:bg-Neutral-8 w-full'
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Proceed'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
