import React, { Fragment } from "react";
import { Tab } from "@headlessui/react";
import { deepTrades, priceTrades } from "../../../public/data/exchangeData";

const MarketTrades = () => {
  return (
    <div className="bg-Primary-3 p-4 lg:px-7 lg:py-6 rounded-xl col-span-12 xl:col-span-8">
      <div>
        <Tab.Group>
          <div className="flex flex-wrap gap-2 justify-between items-center">
            <h5 className="text-xl font-semibold text-Neutral-6 leading-[26px]">
              Market Trades
            </h5>
            <Tab.List>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={
                      selected
                        ? "text-[#F8FAFC] bg-gradient-to-r from-[#00bdff] to-[#00bdff] text-xs leading-[18px] px-3 py-1 rounded outline-none mr-4 border border-Neutral-7"
                        : "text-Neutral-6 text-xs leading-[18px] px-3 py-1 rounded outline-none mr-4 border border-Neutral-7"
                    }
                  >
                    Price Chart
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={
                      selected
                        ? "text-[#F8FAFC] bg-gradient-to-r from-[#00bdff] to-[#00bdff] text-xs leading-[18px] px-3 py-1 rounded outline-none border border-Neutral-7"
                        : "text-Neutral-6 text-xs leading-[18px] px-3 py-1 rounded outline-none border border-Neutral-7"
                    }
                  >
                    Deep Chart
                  </button>
                )}
              </Tab>
            </Tab.List>
          </div>
          <hr className="border-Neutral-10 my-5" />
          <Tab.Panels>
            <Tab.Panel>
              <div className="overflow-x-auto">
                <table className="table whitespace-nowrap">
                  <thead>
                    <tr className="border-Neutral-7 text-base font-bold text-Neutral-6 leading-[24px]">
                      <th>Time</th>
                      <th>Price (USDT)</th>
                      <th>Amount (BTC)</th>
                      <th>Total (USDT)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceTrades.map((trade) => (
                      <tr
                        key={trade.id}
                        className="border-Neutral-7 text-base text-Neutral-6 leading-[24px]"
                      >
                        <td>
                          <div>{trade.time}</div>
                        </td>
                        <td>
                          <div>{trade.Price}</div>
                        </td>
                        <td>
                          <div>{trade.amount}</div>
                        </td>
                        <td>
                          <div>{trade.total}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="overflow-x-auto">
                <table className="table whitespace-nowrap">
                  <thead>
                    <tr className="border-Neutral-7 text-base font-bold text-Neutral-6 leading-[24px]">
                      <th>Time</th>
                      <th>Price (USDT)</th>
                      <th>Amount (BTC)</th>
                      <th>Total (USDT)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deepTrades.map((trade) => (
                      <tr
                        key={trade.id}
                        className="border-Neutral-7 text-base text-Neutral-6 leading-[24px]"
                      >
                        <td>
                          <div>{trade.time}</div>
                        </td>
                        <td>
                          <div>{trade.Price}</div>
                        </td>
                        <td>
                          <div>{trade.amount}</div>
                        </td>
                        <td>
                          <div>{trade.total}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default MarketTrades;
