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
    <section className="w-full max-w-6xl px-6 py-10 mx-auto rounded-2xl bg-[#0a0f1f] border border-emerald-700 shadow-xl">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
          KYC Verification
        </h2>
        <p className="mt-2 text-sm text-gray-400">Verify your identity to activate all features of your account.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="col-span-12">
          {currentState === 'UploadProof' && (
            <UploadProof isLoading={isLoading} setIsLoading={setIsLoading} />
          )}
          {currentState === 'PendingKyc' && <KYCStatus />}
        </div>
      </div>

      <style>{`
        input[type="text"],
        input[type="email"],
        input[type="file"],
        input[type="number"],
        textarea,
        select {
          background-color: #111827 !important;
          color: #E5E7EB !important;
          border: 1px solid #334155;
          padding: 0.65rem 1rem;
          border-radius: 0.5rem;
          width: 100%;
          transition: border-color 0.2s ease;
        }

        input:focus,
        textarea:focus,
        select:focus,input:hover {
          outline: none;
          border-color: #10B981;
        }

        label {
          color: #9CA3AF;
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
          display: inline-block;
        }

        .btn-primary {
          background: linear-gradient(to right, #10B981, #059669);
          color: #ffffff;
          padding: 0.5rem 1.5rem;
          border-radius: 0.375rem;
          transition: opacity 0.2s ease;
        }

        .btn-primary:hover {
          opacity: 0.9;
        }
      `}</style>
    </section>
  );
};

export default Kyc;
