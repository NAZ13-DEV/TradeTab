import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, clearUserState } from '../redux/slices/fetchUserSlice';
import UploadProof from './kyc/confirm_deposit';
import KYCStatus from './PendingKyc';

const Kyc = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentState, setCurrentState] = useState('UploadProof');
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.fetchUserDetails);

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
    if (user?.kyc === 'pending' && user?.verifi === 'pending') {
      setCurrentState('PendingKyc');
    }
  }, [user]);

  return (
    <section className="w-full max-w-5xl px-4 py-6 mx-auto shadow-md bg-Primary-3 rounded-2xl md:p-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12">
        {currentState === 'UploadProof' && (
          <div className="col-span-12">
            <UploadProof isLoading={isLoading} setIsLoading={setIsLoading} />
          </div>
        )}
        {currentState === 'PendingKyc' && (
          <div className="col-span-12">
            <KYCStatus />
          </div>
        )}
      </div>

      {/* Style override for transparent inputs */}
      <style>
        {`
          input[type="text"],
          input[type="email"],
          input[type="file"],
          input[type="number"],
          textarea,
          select {
            background-color: transparent !important;
            color: #E6E6E6 !important;
            border: 1px solid #4B5563;
            padding: 0.5rem 0.75rem;
            border-radius: 0.5rem;
            width: 100%;
            transition: border 0.2s ease;
          }

          input:focus,
          textarea:focus,
          select:focus {
            outline: none;
            border-color: #10B981;
          }

          label {
            color: #D1D5DB;
            font-size: 0.875rem;
            margin-bottom: 0.25rem;
            display: inline-block;
          }
        `}
      </style>
    </section>
  );
};

export default Kyc;
