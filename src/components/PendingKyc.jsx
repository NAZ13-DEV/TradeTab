import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../redux/slices/fetchUserSlice';
import Dashboard from '../pages/Dashboard';

const KYCStatus = () => {
  const dispatch = useDispatch();
  const [showDashboard, setShowDashboard] = useState(false);
  const { user } = useSelector((state) => state.fetchUserDetails);

  useEffect(() => {
    const storedUserId = localStorage.getItem('uId');
    if (storedUserId) {
      dispatch(fetchUserDetails(storedUserId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user?.kyc === 'true' && user?.verifi === 'true') {
      setShowDashboard(true);
    }
  }, [user]);

  if (showDashboard) return <Dashboard />;

  return (
    <section className="flex items-center justify-center px-4 py-3 bg-Primary-bg">
      <div className="w-full max-w-3xl p-8 text-center shadow-xl bg-slate-900/80 backdrop-blur-md rounded-xl md:p-12">
        <h3 className="mb-4 text-2xl font-bold leading-snug text-white sm:text-3xl md:text-4xl">
          KYC Submitted
        </h3>
        <p className="max-w-2xl mx-auto text-lg leading-relaxed text-green-400 sm:text-xl">
          Your KYC submission has been received and is awaiting approval. We will notify you once the verification is complete.
        </p>

        <div className="flex justify-center mt-8">
          <div className="w-[160px] h-2 bg-gradient-to-r from-green-400 to-teal-500 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default KYCStatus;
