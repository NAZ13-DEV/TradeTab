import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, clearUserState } from '../redux/slices/fetchUserSlice';
import FundNow from './deposit/fundnow';
import CopyWallet from './deposit/CopyWallet';
import UploadProof from './deposit/confirm_deposit';
import bitcoinImg from '../img/bitcoin.svg';
import ethereumImg from '../img/ethereum.svg';
import tetherImg from '../img/tether.svg';

const Deposit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [coinValue, setCoinValue] = useState('');
  const [method, setMethod] = useState('bitcoin');
  const [methodSign, setMethodSign] = useState('');
  const [wallet, setWallet] = useState('');
  const [coinImg, setCoinImg] = useState('');
  const [currentState, setCurrentState] = useState('FundNow');

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.fetchUserDetails);

  useEffect(() => {
    const storedUserId = localStorage.getItem('uId');
    if (storedUserId) dispatch(fetchUserDetails(storedUserId));
    return () => dispatch(clearUserState());
  }, [dispatch]);

  // Update coin image based on selected method
  useEffect(() => {
    const getCoinImage = () => {
      switch (method) {
        case 'bitcoin':
          return bitcoinImg;
        case 'ethereum':
          return ethereumImg;
        case 'tether':
          return tetherImg;
        default:
          return '';
      }
    };
    setCoinImg(getCoinImage());
  }, [method]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050A1D]">
      <div className="w-full py-4 bg-[#050A1D] rounded-xl forex-form-theme md:w-11/12 lg:w-2/3 xl:w-1/2 xl:p-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
          {currentState === 'FundNow' && (
            <FundNow
              amount={amount}
              method={method}
              wallet={wallet}
              setWallet={setWallet}
              isLoading={isLoading}
              setMethod={setMethod}
              setAmount={setAmount}
              setIsLoading={setIsLoading}
              setCurrentState={setCurrentState}
              setCoinValue={setCoinValue}
              setMethodSign={setMethodSign}
              setCoinImg={setCoinImg} // Optional: If FundNow needs direct control
            />
          )}

          {currentState === 'CopyWallet' && (
            <CopyWallet
              amount={amount}
              method={method}
              wallet={wallet}
              setCurrentState={setCurrentState}
              coinImg={coinImg}
              coinValue={coinValue}
              setCoinImg={setCoinImg}
              bitcoin={bitcoinImg}
              ethereum={ethereumImg}
              tether={tetherImg}
              currency={user?.currency}
              methodSign={methodSign}
            />
          )}

          {currentState === 'UploadProof' && (
            <UploadProof isLoading={isLoading} setIsLoading={setIsLoading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Deposit;
