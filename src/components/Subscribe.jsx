/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails, clearUserState } from "../redux/slices/fetchUserSlice";
import SubscriptionDeposit from "./SubscriptionDeposit";

const Subscribe = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.fetchUserDetails);
  const [mounted, setMounted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const storedId = localStorage.getItem("uId");
      if (storedId) {
        dispatch(fetchUserDetails(storedId));
      }
    }

    return () => dispatch(clearUserState());
  }, [dispatch, mounted]);

  if (!mounted) return null;

  if (selectedPlan) {
    return (
      <SubscriptionDeposit
        plan={selectedPlan.plan}
        min={selectedPlan.min}
        max={selectedPlan.max}
      />
    );
  }

  const plans = [
    {
      name: "SILVER PLAN",
      range: "$10,000 - $49,000",
      features: ["+5 Trades per Week", "+ Instant Trading", "Leverage up to 2x"],
      plan: "SILVER",
      min: 10000,
      max: 49000,
    },
    {
      name: "GOLD PLAN",
      range: "$50,0000 - $149,000",
      features: ["+10 Trades per Week", "+ Instant Trading", "Leverage up to 2x and 5x"],
      plan: "GOLD",
      min: 500000,
      max: 149000,
    },
    {
      name: "DIAMOND PLAN",
      range: "$150,000 - $399,000",
      features: ["+15 Trades per Week", "+ Instant Trading", "Leverage up to 2x, 5x and 10x"],
      plan: "DIAMOND",
      min: 150000,
      max: 399000,
    },
    {
      name: "PLATINUM PLAN",
      range: "$400,000 - UNLIMITED",
      features: ["+20 Trades per Week", "+ Instant Trading", "Leverage up to 2x, 5x, 10x and 20x"],
      plan: "PLATINUM",
      min: 400000,
      max: 9999999,
    },
  ];

  return (
    <div className="min-h-screen bg-[#050A1D] p-4 lg:p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-[#0A132A] to-[#0F1B38] rounded-2xl shadow-lg p-6 text-center transition-transform hover:-translate-y-1 hover:shadow-2xl"
          >
            <h2 className="text-xl font-bold text-white mb-2">{item.name}</h2>
            <p className="text-emerald-400 font-semibold text-lg mb-4">{item.range}</p>
            <ul className="text-sm text-gray-300 space-y-2 mb-6">
              {item.features.map((feature, idx) => (
                <li key={idx}>• {feature}</li>
              ))}
            </ul>
            <button
              onClick={() =>
                setSelectedPlan({ plan: item.plan, min: item.min, max: item.max })
              }
              className="w-full py-2 px-4 rounded-md font-medium bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-white transition"
            >
              Join Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscribe;
