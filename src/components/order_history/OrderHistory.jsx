/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Fragment, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTrade } from "../../redux/slices/fetchTradeSlice";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";

const OrderHistory = ({
  setFormFields,
  setSellForm,
  selectedOption,
  setSelectedOption,
  buyFormRef,
  sellFormRef,
}) => {
  const dispatch = useDispatch();
  const { user: orders } = useSelector((state) => state.fetchTrade);
  const { user: userDetails } = useSelector((state) => state.fetchUserDetails);

  useEffect(() => {
    const storedUserId = localStorage.getItem("uId");
    if (storedUserId) dispatch(fetchUserTrade(storedUserId));
  }, [dispatch]);

  const handleEdit = (data) => {
    const updatedFields = {
      amount: data.amount || "",
      symbol: data.Symbol || "USD/CHF",
      interval: data.Intervah || "60",
      leverage: data.Leverage || "0.5X",
      stopLoss: data.stploss || "",
      takeProfit: data.takeprofit || "",
      entryPrice: data.EntryPrice || "",
      tradeType: data.tradeType || "buy",
      tradingPair: data.trading_pairs || "Forex Pairs",
      userId: data.userid || localStorage.getItem("uId"),
      trade: data.id || null,
    };

    // Set selectedOption first to trigger correct pair component
    setSelectedOption(data.trading_pairs || "Forex Pairs");

    // Ensure state updates after selectedOption triggers component rendering
    setTimeout(() => {
      if (data.tradeType === "buy") {
        setFormFields(updatedFields);
        buyFormRef?.current?.scrollIntoView({ behavior: "smooth" });
      } else {
        setSellForm(updatedFields);
        sellFormRef?.current?.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  const formatAmount = (amount) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount || 0);

  const getPayout = (amt, status) => {
    if (amt === null || amt === "") return "--";
    const symbol = userDetails?.currency || "$";
    const formatted = formatAmount(amt);
    return status === "Loss"
      ? `${symbol}-${formatted}`
      : status === "Profit"
      ? `${symbol}${formatted}`
      : "--";
  };

  const renderTable = (filtered) => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm whitespace-nowrap">
        <thead>
          <tr className="text-emerald-400 font-semibold border-b border-emerald-500/20 bg-emerald-400/5">
            {[
              "SN", "Amount", "Symbol", "Trade Pair", "Trade Type",
              "Interval", "Leverage", "Trade ID", "Date", "Status", "Payout", "Action",
            ].map((header) => (
              <th key={header} className="px-3 py-2">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((data, i) => {
            const isBuy = data.tradeType?.toLowerCase() === "buy";
            const colorClass = isBuy ? "text-green-400" : "text-red-400";
            return (
              <tr key={data.id} className={`border-b border-emerald-500/10 hover:bg-emerald-400/5 ${colorClass}`}>
                <td className="px-3 py-2">{i + 1}</td>
                <td className="px-3 py-2">{userDetails?.currency || "$"}{formatAmount(data.amount)}</td>
                <td className="px-3 py-2">{data.Symbol}</td>
                <td className="px-3 py-2">{data.trading_pairs}</td>
                <td className="px-3 py-2 flex items-center gap-1">
                  {isBuy ? <MdArrowUpward className="text-base" /> : <MdArrowDownward className="text-base" />}
                  <span>{capitalize(data.tradeType)}</span>
                </td>
                <td className="px-3 py-2">
                  {data.Intervah ? `${parseInt(data.Intervah) / 60} mins` : "--"}
                </td>
                <td className="px-3 py-2">{data.Leverage}</td>
                <td className="px-3 py-2">#{data.trans_id}</td>
                <td className="px-3 py-2">{data.date || data.dateo || "--"}</td>
                <td className="px-3 py-2">
                  <span className="px-2 py-1 rounded text-xs text-white" style={{
                    background:
                      data.status === "Pending" ? "#FFC107" :
                      data.status === "Profit" ? "#28A745" :
                      data.status === "Loss" ? "#DC3545" : "#999",
                  }}>
                    {data.status}
                  </span>
                </td>
                <td className="px-3 py-2">{getPayout(data.amt_earned, data.status)}</td>
                <td className="px-3 py-2">
                  {data.status === "Pending" ? (
                    <button onClick={() => handleEdit(data)}>
                      <span className="material-symbols-outlined text-white hover:text-emerald-400 transition">edit</span>
                    </button>
                  ) : (
                    <span className="text-white">{data.status}</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <section className="w-full p-4 mt-6 rounded-xl bg-[#050A1D] lg:px-7 lg:py-6 lg:mt-0 shadow-md shadow-emerald-500/10">
      <Tab.Group>
        <Tab.List className="flex flex-wrap gap-2 mb-4">
          {["Open orders", "Closed orders", "Order history"].map((tab) => (
            <Tab as={Fragment} key={tab}>
              {({ selected }) => (
                <button className={`text-sm md:text-base font-semibold px-3 py-2 rounded-md transition ${
                  selected
                    ? "bg-gradient-to-r from-emerald-400/10 via-emerald-500/20 to-transparent text-emerald-400"
                    : "text-white hover:text-emerald-400"
                }`}>
                  {tab}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            {renderTable((orders || []).filter(order => order.status === "Pending"))}
          </Tab.Panel>
          <Tab.Panel>
            {renderTable((orders || []).filter(order => order.status !== "Pending"))}
          </Tab.Panel>
          <Tab.Panel>
            {renderTable(orders || [])}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </section>
  );
};

const capitalize = (str) => str?.toLowerCase()?.replace(/\b\w/g, (c) => c.toUpperCase());

export default OrderHistory;
