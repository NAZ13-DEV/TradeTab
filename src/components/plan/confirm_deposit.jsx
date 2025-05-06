/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../redux/slices/api';
import toast, { Toaster } from 'react-hot-toast';

const UploadProof = ({ isLoading, setIsLoading, plan }) => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || file.size === 0) {
      toast.error('Your proof of plan subscription is empty');
      return;
    }

    const sessionGetUserID = localStorage.getItem('uId');
    if (!sessionGetUserID) {
      toast.error('User session not found. Please log in again.');
      return;
    }

    const LoginData = new FormData();
    LoginData.append('id', sessionGetUserID);
    LoginData.append('documents', file);
    LoginData.append('plan', plan);

    try {
      setIsLoading(true);
      const response = await api.post('uploadproof', LoginData);

      if (response.status === 201 && response.data.message === 'true') {
        toast.success('Your proof of plan subscription has been submitted');
        setTimeout(() => {
          navigate('/dashboard', { state: { fromUpload: true } });
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 422) {
        try {
          const parsedMessage = JSON.parse(error.response.data);
          toast.error(parsedMessage);
        } catch {
          toast.error('Validation error occurred.');
        }
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="col-span-12 px-4 py-6 bg-[#0A132A] rounded-xl max-w-2xl mx-auto">
      <Toaster position="top-center" />
      <form onSubmit={handleUpload}>
        <div className="flex flex-col gap-6">
          <h5 className="text-lg text-emerald-400 font-bold text-center">
            Upload Proof of Plan Subscription
          </h5>

          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-4 py-2 text-white bg-[#0F1C3F] border border-emerald-500 rounded-md focus:outline-none file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-emerald-600 file:text-white hover:file:bg-emerald-500"
          />

          <button
            type="submit"
            className="w-full py-2 rounded-md text-white font-semibold bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? 'Uploading...' : 'Upload Payment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadProof;
