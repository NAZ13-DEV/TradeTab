/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../redux/slices/api';
import toast, { Toaster } from 'react-hot-toast';

export default function UploadProof({ isLoading, setIsLoading }) {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || file.size === 0) {
      toast.error('Your proof of payment is empty');
      return;
    }

    const sessionGetUserID = localStorage.getItem('uId');
    if (!sessionGetUserID) {
      toast.error('User session not found. Please log in again.');
      return;
    }

    const formData = new FormData();
    formData.append('id', sessionGetUserID);
    formData.append('documents', file);

    try {
      setIsLoading(true);
      const response = await api.post('uploadproof', formData);

      if (response.status === 201 && response.data.message === 'true') {
        toast.success('Your proof of payment has been submitted');
        setTimeout(() => {
          navigate('/dashboard', { state: { fromUpload: true } });
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 422) {
        try {
          const parsedMessage = JSON.parse(error.response.data);
          toast.error(parsedMessage);
        } catch {
          toast.error('Invalid response from server.');
        }
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='col-span-12 p-4 rounded-xl bg-Primary-bg lg:px-7 lg:py-6 xl:col-span-12'>
      <Toaster position='top-center' />
      <form onSubmit={handleUpload}>
        <div className='flex flex-wrap gap-3 justify-between items-center mb-6 scrollable-container'>
          <div className='h-[300px] w-full'>
            <h5 className='text-base text-customGreen font-bold leading-[24px] mb-3 text-center'>
              Upload Proof of Payment
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
              {isLoading ? 'Loading...' : 'Upload Payment'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
