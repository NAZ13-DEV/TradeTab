import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const plans = [
  {
    name: "Silver Plan",
    price: "$10,000 - $49,000",
    features: ["5 Trades per Week", "Instant Trading", "Leverage up to 2x"],
  },
  {
    name: "Gold Plan",
    price: "$50,0000 - $149,000",
    features: [
      "10 Trades per Week",
      "Instant Trading",
      "Leverage up to 2x and 5x",
    ],
  },
  {
    name: "Diamond Plan",
    price: "$150,000 - $399,000",
    features: [
      "15 Trades per Week",
      "Instant Trading",
      "Leverage up to 2x, 5x and 10x",
    ],
  },
  {
    name: "Platinum Plan",
    price: "$400,000 - UNLIMITED",
    features: [
      "20 Trades per Week",
      "Instant Trading",
      "Leverage up to 2x, 5x, 10x and 20x",
    ],
  },
];

const PlanCard = ({ plan }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#0c1123] p-4 rounded-2xl shadow-2xl w-full max-w-xs flex flex-col justify-between border border-slate-700 hover:scale-105 transition-all duration-300">
      <div>
        <h3 className="text-2xl font-extrabold text-white text-center mb-3 uppercase tracking-wide">
          {plan.name}
        </h3>
        <p className="text-emerald-400 font-extrabold text-center text-xl mb-6">
          {plan.price}
        </p>
        <ul className="space-y-3 text-base text-gray-100 font-semibold">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3">
              <CheckCircle size={20} className="text-emerald-400" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={() => navigate("/register")}
        className="mt-8 w-full py-3 text-lg bg-gradient-to-r from-emerald-500 to-emerald-400 text-white rounded-lg font-bold hover:from-emerald-400 hover:to-emerald-300"
      >
        Join Plan
      </button>
    </div>
  );
};

PlanCard.propTypes = {
  plan: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

const PricingSection = () => {
  return (
    <div className="bg-[#050A1D] px-4 py-14 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {plans.map((plan, index) => (
          <PlanCard plan={plan} key={index} />
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
