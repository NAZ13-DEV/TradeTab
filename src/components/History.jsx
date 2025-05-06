import { Fragment, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../redux/slices/fetchHistory";
import {
  fetchUserDetails,
  clearUserState,
} from "../redux/slices/fetchUserSlice";
import { FolderSimpleDashed } from "@phosphor-icons/react"; // install this package

const History = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);
  const [mounted, setMounted] = useState(false);

  const { deposits, profits, userPlans, cryptoWithdrawals, bankWithdrawals } =
    useSelector((state) => state.fetchHistory);
  const { user } = useSelector((state) => state.fetchUserDetails);

  const tabData = [
    {
      label: "Total Deposit History",
      data: deposits,
      emptyMessage: "No Deposit History",
    },
    {
      label: "Total Bank Withdrawal History",
      data: bankWithdrawals,
      emptyMessage: "No Bank Withdrawal History",
    },
    {
      label: "Total Crypto Withdrawal History",
      data: cryptoWithdrawals,
      emptyMessage: "No Crypto Withdrawal History",
    },
    {
      label: "Total Earning History",
      data: profits,
      emptyMessage: "No Earning History",
    },
    {
      label: "Plan Subscription",
      data: userPlans,
      emptyMessage: "No  Subscription Plan History",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const id = localStorage.getItem("uId");
      setUserId(id);
    }
  }, [mounted]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserDetails(userId));
      dispatch(fetchDashboardData());
    }
    return () => dispatch(clearUserState());
  }, [dispatch, userId]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050A1D] flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-screen-xl grid grid-cols-12 gap-6">
        <div className="col-span-12 xl:col-span-11 bg-[#0A132A] rounded-2xl p-4 lg:p-6">
          <div className="w-full h-full bg-[#0A132A] rounded-2xl p-4 lg:p-6">
            <Tab.Group>
              <Tab.List className="flex flex-wrap gap-3 mb-6">
                {tabData.map(({ label }, index) => (
                  <Tab key={index} as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={`text-sm md:text-base font-semibold px-4 py-2 rounded-md transition-colors border-b-2 ${
                          selected
                            ? "text-emerald-400 border-emerald-400"
                            : "text-white hover:text-emerald-300 border-transparent"
                        }`}
                      >
                        {label}
                      </button>
                    )}
                  </Tab>
                ))}
              </Tab.List>

              <Tab.Panels>
                {tabData.map(({ label, data, emptyMessage }, panelIndex) => (
                  <Tab.Panel key={panelIndex}>
                    <div className="bg-[#0F1B38] rounded-xl p-4 overflow-x-auto min-h-[300px]">
                      <h5 className="text-xl font-semibold text-white mb-4">
                        {label}
                      </h5>

                      {!data || data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center text-white">
                          <FolderSimpleDashed
                            size={64}
                            className="text-emerald-400 mb-4"
                          />
                          <p className="text-lg font-medium">{emptyMessage}</p>
                        </div>
                      ) : (
                        <table className="w-full text-sm md:text-base text-left whitespace-nowrap">
                          <thead className="text-emerald-400 font-bold border-b border-emerald-800">
                            <tr>
                              {[
                                [
                                  "Sn",
                                  "Amount",
                                  "Coin Value",
                                  "Deposit Method",
                                  "Wallet",
                                  "Deposit Id",
                                  "Deposit Status",
                                  "Date of Deposit",
                                ],
                                [
                                  "Sn",
                                  "Withdrawal ID",
                                  "Account Name",
                                  "Account Number",
                                  "Bank Name",
                                  "Country",
                                  "Amount",
                                  "Date of Withdrawal",
                                  "Narration",
                                  "Withdrawal Status",
                                ],
                                [
                                  "Sn",
                                  "Amount",
                                  "Date of Withdrawal",
                                  "Payment Mode",
                                  "Withdrawal ID",
                                  "Withdrawal Status",
                                  "Wallet",
                                ],
                                [
                                  "Sn",
                                  "Amount",
                                  "Type",
                                  "Transaction Id",
                                  "Transaction Status",
                                  "Date of Transaction",
                                ],
                                [
                                  "Sn",
                                  "Amount",
                                  "Coin Value",
                                  "Deposit Method",
                                  "Wallet",
                                  "Deposit Plan",
                                  "Deposit Id",
                                  "Deposit Status",
                                  "Date of Deposit",
                                ],
                              ][panelIndex].map((heading, hIndex) => (
                                <th key={hIndex} className="py-2 px-3">
                                  {heading}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="text-white divide-y divide-[#1E293B]">
                            {data.map((dataItem, i) => (
                              <tr key={dataItem.id || i}>
                                {
                                  [
                                    <>
                                      <td className="py-2 px-3">{i + 1}</td>
                                      <td className="py-2 px-3">
                                        {user?.currency}{" "}
                                        {parseFloat(dataItem.amount).toFixed(2)}
                                      </td>
                                      <td className="py-2 px-3">
                                        {parseFloat(dataItem.amtValue).toFixed(
                                          4
                                        )}{" "}
                                        {dataItem.transMethod === "bitcoin"
                                          ? "Btc"
                                          : dataItem.transMethod === "ethereum"
                                          ? "Eth"
                                          : dataItem.transMethod === "tether"
                                          ? "Usdt"
                                          : ""}
                                      </td>
                                      <td className="py-2 px-3 capitalize">
                                        {dataItem.transMethod}
                                      </td>
                                      <td className="py-2 px-3">
                                        {dataItem.Wallet}
                                      </td>
                                      <td className="py-2 px-3">
                                        #{dataItem.transId}
                                      </td>
                                      <td className="py-2 px-3">
                                        {dataItem.transStatus}
                                      </td>
                                      <td className="py-2 px-3">
                                        {dataItem.createdAt}
                                      </td>
                                    </>,
                                    <>
                                      <td className="py-2 px-3">{i + 1}</td>
                                      <td className="py-2 px-3">
                                        {dataItem.transId}
                                      </td>
                                      <td className="py-2 px-3">
                                        {dataItem.accName}
                                      </td>
                                      <td className="py-2 px-3">
                                        {dataItem.accNum}
                                      </td>
                                      <td className="py-2 px-3">
                                        {dataItem.bankName}
                                      </td>
                                      <td className="py-2 px-3">
                                        {dataItem.country}
                                      </td>
                                      <td className="py-2 px-3">
                                        {user?.currency}{" "}
                                        {parseFloat(dataItem.amount).toFixed(2)}
                                      </td>
                                      <td className="py-2 px-3">
                                        {dataItem.dateOfTrans}
                                      </td>
                                      <td className="py-2 px-3">
                                        {dataItem.narration}
                                      </td>
                                      <td className="py-2 px-3">
                                        {dataItem.transStatus}
                                      </td>
                                    </>,
                                    <>
                                      <td className="py-2 px-3">{i + 1}</td>
                                      <td className="py-2 px-3">
                                        {user?.currency}{" "}
                                        {parseFloat(dataItem.amount).toFixed(2)}
                                      </td>
                                      <td className="py-2 px-3">
                                         { dataItem.dateOfTrans}
                                      </td>
                                      <td className="py-2 px-3">
                                        {dataItem.payment_mode}
                                      </td>
                                      <td className="py-2 px-3">
                                        #{dataItem.transId}
                                      </td>
                                      <td className="py-2 px-3">
                                        {dataItem.transStatus}
                                      </td>
                                      <td className="py-2 px-3">
                                        {dataItem.wallet}
                                      </td>
                                    </>,
                                    <>
                                      <td className="py-2 px-3">{i + 1}</td>
                                      <td className="py-2 px-3">
                                        {user?.currency}{" "}
                                        {parseFloat(dataItem.amount).toFixed(2)}
                                      </td>
                                      <td className="py-2 px-3 capitalize">
                                        {dataItem.type}
                                      </td>
                                      <td className="py-2 px-3">
                                        #{dataItem.transId}
                                      </td>
                                      <td className="py-2 px-3">
                                        {dataItem.transStatus}
                                      </td>
                                      <td className="py-2 px-3">
                                        {dataItem.createdAt}
                                      </td>
                                    </>,
                                    <>
                                      <td className="py-2 px-3">{i + 1}</td>
                                      <td className="py-2 px-3">
                                        {user?.currency}{" "}
                                        {parseFloat(dataItem.cryptoAmt).toFixed(
                                          2
                                        )}
                                      </td>
                                      <td className="py-2 px-3">
                                        {parseFloat(
                                          dataItem.cryptovalue
                                        ).toFixed(4)}{" "}
                                        {dataItem.netWork === "bitcoin"
                                          ? "Btc"
                                          : dataItem.netWork === "ethereum"
                                          ? "Eth"
                                          : dataItem.netWork === "tether"
                                          ? "Usdt"
                                          : ""}
                                      </td>
                                      <td className="py-2 px-3 capitalize">
                                        {dataItem.netWork}
                                      </td>
                                      <td className="py-2 px-3">
                                        {dataItem.companyWallet}
                                      </td>
                                      <td className="py-2 px-3 capitalize">
                                        {dataItem.selectedPlan} Plan
                                      </td>
                                      <td className="py-2 px-3">
                                        #{dataItem.transId}
                                      </td>
                                      <td className="py-2 px-3">
                                        {dataItem.transStatus}
                                      </td>
                                      <td className="py-2 px-3">
                                        {dataItem.createdAt}
                                      </td>
                                    </>,
                                  ][panelIndex]
                                }
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </section>
    </div>
  );
};

export default History;
