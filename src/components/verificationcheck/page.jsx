/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../../redux/slices/fetchUserSlice';

const KycCheck = () => {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector((state) => state.notifications);
  const { user } = useSelector((state) => state.fetchUserDetails);

  const [shouldShowNotice, setShouldShowNotice] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('uId');
    if (storedUserId) {
      dispatch(fetchUserDetails(storedUserId));
    }
  }, [dispatch]);

  useEffect(() => {
    const incompleteKYC =
      user?.kyc === '' ||
      user?.kyc === null ||
      user?.kyc === 'false' ||
      user?.verifi === '' ||
      user?.verifi === null ||
      user?.verifi === 'false';

    setShouldShowNotice(incompleteKYC);
  }, [user]);

  if (!shouldShowNotice) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-Primary-bg">
      <div>
        <h3 className="text-white text-2xl lg:text-[32px] font-semibold leading-[38px] mt-6 text-center">
          Verify Your KYC
        </h3>
        <p className="w-full lg:w-[610px] text-customGreen text-lg leading-[27px] mt-[17px] mx-auto text-center">
          You have not uploaded your KYC. Please complete it to continue.
        </p>
        <div className="text-center">
          <div className="w-[190px] mx-auto rounded-lg px-2 py-1 mt-8 bg-gradient-to-r from-[#00bdff] to-[#00bdff] animate-gradient"></div>
        </div>
      </div>
    </div>
  );
};

export default KycCheck;
