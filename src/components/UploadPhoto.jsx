/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import api from '../redux/slices/api';
import { fetchUserDetails, clearUserState } from '../redux/slices/fetchUserSlice';

const UploadPhoto = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('uId');
    if (storedUserId) {
      dispatch(fetchUserDetails(storedUserId));
    }

    return () => {
      dispatch(clearUserState());
    };
  }, [dispatch]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || file.size === 0) {
      toast.error('Your profile picture is empty.');
      return;
    }

    const sessionUserId = localStorage.getItem('uId');
    if (!sessionUserId) {
      toast.error('User session not found. Please log in again.');
      return;
    }

    const createdAt = new Date().toLocaleString('en-US', {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

    const formData = new FormData();
    formData.append('id', sessionUserId);
    formData.append('documents', file);
    formData.append('createdAt', createdAt);

    try {
      setIsLoading(true);
      const response = await api.post('updateProfilePics', formData);

      if (response.status === 201 && response.data.message) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate('/dashboard', { state: { photoUpload: true } });
        }, 2000);
      } else {
        toast.error('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Upload failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-[#050A1D] px-6 py-8 min-h-screen">
      <Toaster position="top-center" />
      <form
        onSubmit={handleUpload}
        className="w-full max-w-2xl bg-[#0f172a] rounded-xl shadow-2xl p-10 border border-gray-700"
      >
        <h5 className="text-2xl font-bold text-emerald-400 text-center mb-8">
          Upload Your Desired Profile Picture
        </h5>

        <input
          type="file"
          onChange={handleFileChange}
          className="w-full px-4 py-3 text-base bg-[#1e293b] text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <button
          type="submit"
          className="mt-8 w-full py-3 text-lg text-white font-semibold rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-700 hover:from-emerald-500 hover:to-emerald-800 active:scale-95 transition transform"
          disabled={isLoading}
        >
          {isLoading ? 'Uploading...' : 'Proceed'}
        </button>
      </form>
    </div>
  );
};

export default UploadPhoto;
