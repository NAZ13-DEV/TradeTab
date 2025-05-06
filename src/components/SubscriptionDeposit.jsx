/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails, clearUserState } from "../redux/slices/fetchUserSlice";
import bitcoin from "../../public/images/bitcoin.svg";
import ethereum from "../../public/images/ethereum.svg";
import tether from "../../public/images/tether.svg";
import FundNow from "../components/plan/fundnow";
import CopyWallet from "../components/plan/copywallet";
import UploadProof from "../components/plan/confirm_deposit";

const SubscriptionDeposit = ({ plan, min, max }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.fetchUserDetails);

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [coinValue, setCoinValue] = useState("");
  const [method, setMethod] = useState("bitcoin");
  const [methodSign, setMethodSign] = useState("");
  const [wallet, setWallet] = useState("");
  const [coinImg, setCoinImg] = useState("");
  const [currentState, setCurrentState] = useState("FundNow");

  useEffect(() => {
    const storedUserId = localStorage.getItem("uId");
    if (storedUserId) dispatch(fetchUserDetails(storedUserId));

    return () => dispatch(clearUserState());
  }, [dispatch]);



  return (
    <div className=" bg-[#050A1D] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-[#0A132A] rounded-2xl shadow-xl p-6 lg:p-10 transition-all duration-300">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white">{plan} Plan</h2>
          <p className="text-sm text-emerald-400 mt-1">
            Min: ${min.toLocaleString()} — Max: ${max.toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {currentState === "FundNow" && (
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
              plan={plan}
              min={min}
              max={max}
              user={user}
            />
          )}

          {currentState === "CopyWallet" && (
            <CopyWallet
              amount={amount}
              method={method}
              wallet={wallet}
              setCurrentState={setCurrentState}
              coinImg={coinImg}
              coinValue={coinValue}
              setCoinImg={setCoinImg}
              bitcoin={bitcoin}
              ethereum={ethereum}
              tether={tether}
              currency={user?.currency}
              methodSign={methodSign}
            />
          )}

          {currentState === "UploadProof" && (
            <UploadProof
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              plan={plan}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDeposit;
