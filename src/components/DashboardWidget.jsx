/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails, clearUserState } from "../redux/slices/fetchUserSlice";
import Coin from "./exchange/Coin";
import OrderHistory from "./order_history/OrderHistory";

const DashBoard = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);
  const [mounted, setMounted] = useState(false);
  const { user } = useSelector((state) => state.fetchUserDetails);

  const [formFields, setFormFields] = useState({
    amount: "",
    symbol: "",
    interval: "60",
    leverage: "0.5X",
    stopLoss: "",
    takeProfit: "",
    entryPrice: "",
    tradeType: "buy",
    tradingPair: "",
    userId: null,
  });

  const [sellForm, setSellForm] = useState({
    ...formFields,
    tradeType: "sell",
  });

  const [selectedOption, setSelectedOption] = useState("");
  const buyFormRef = useRef(null);
  const sellFormRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const storedUserId = localStorage.getItem("uId");
    if (storedUserId) setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (userId) dispatch(fetchUserDetails(userId));
    return () => dispatch(clearUserState());
  }, [dispatch, userId]);

  if (!mounted) return null;

  const formatCurrency = (value) =>
    user ? `${user.currency}${(+value).toFixed(2)}` : "Loading...";

  return (
    <div className="min-h-screen bg-[#050A1D] p-4 sm:p-6 md:p-8 text-white">
      {/* Summary Cards */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <SummaryCard title="Deposit" value={formatCurrency(user?.total_depo)} />
        <SummaryCard title="Profit" value={formatCurrency(user?.total_pro)} />
        <SummaryCard title="Total Balance" value={formatCurrency(user?.balance)} />
      </section>

      {/* TradingView Widgets */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-10">
        <div className="xl:col-span-9 bg-Primary-3 shadow-lg">
          <iframe
            src="https://s.tradingview.com/widgetembed/?symbol=NASDAQ:AAPL&interval=D&hidesidetoolbar=1&hidetoptoolbar=1&theme=dark&style=1&locale=en"
            width="100%"
            height="600"
            frameBorder="0"
            allowFullScreen
            title="TradingView Chart"
          />
        </div>
        <div className="xl:col-span-3 bg-Primary-3 shadow-lg">
          <iframe
            frameBorder="0"
            src="https://www.tradingview-widget.com/embed-widget/screener/?locale=en#%7B%22width%22%3A%22220%22%2C%22height%22%3A600%2C%22market%22%3A%22forex%22%2C%22colorTheme%22%3A%22dark%22%7D"
            style={{ width: "100%", height: "600px", background: "#0d0d0d" }}
            title="TradingView Screener"
          />
        </div>
      </section>

      {/* Coin Trade Section */}
      <section className="mb-10">
        <Coin
          formFields={formFields}
          sellForm={sellForm}
          setFormFields={setFormFields}
          setSellForm={setSellForm}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          buyFormRef={buyFormRef}
          sellFormRef={sellFormRef}
        />
      </section>

      {/* Order History */}
      <section>
        <OrderHistory
          setFormFields={setFormFields}
          setSellForm={setSellForm}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          buyFormRef={buyFormRef}
          sellFormRef={sellFormRef}
        />
      </section>
    </div>
  );
};

const SummaryCard = ({ title, value }) => (
  <div className="p-5 bg-gradient-to-br from-emerald-400/10 via-emerald-500/20 to-transparent shadow-md hover:shadow-xl transition duration-300 rounded-xl border border-emerald-500/10">
    <span className="text-sm font-semibold text-emerald-300 uppercase">{title}</span>
    <h4 className="mt-3 text-3xl font-bold text-white">{value}</h4>
  </div>
);

export default DashBoard;
