import Bitcoin from "@/../public/images/dashboardTable/bitcoin.png";
import Ethereum from "@/../public/images/dashboardTable/ethereum.png";
import Litecoin from "@/../public/images/dashboardTable/litecoin.png";
import Stellar from "@/../public/images/dashboardTable/stellar.png";
import Dogecoin from "@/../public/images/dashboardTable/dogecoin.png";
import Tether from "@/../public/images/dashboardTable/tether.png";
import achain from "@/../public/images/dashboardTable/achain.png";
import ellaism from "@/../public/images/dashboardTable/ellaism.png";
import tron from "@/../public/images/dashboardTable/tron.png";
import binance from "@/../public/images/dashboardTable/binance.png";
import { v4 as uuidv4 } from "uuid";

export const history = [
  {
    id: uuidv4(),
    transaction: "#1455548",
    type: "Bitcoin (BTC)",
    date: "21 Sep, 2023",
    status: "Pending",
    color: "#FC774A",
    amount: "7.7642303 USDT",
    img: Bitcoin,
  },
  {
    id: uuidv4(),
    transaction: "#1455548",
    type: "Tether (USDT)",
    date: "17 Oct, 2023",
    status: "Completed",
    color: "#3EBF81",
    amount: "0.3456182 USDT",
    img: Tether,
  },
  {
    id: uuidv4(),
    transaction: "#1455548",
    type: "Ethereum (ETH) ",
    date: "21 Sep, 2023",
    status: "Pending",
    color: "#FC774A",
    amount: "0.3456182 USDT",
    img: Ethereum,
  },
  {
    id: uuidv4(),
    transaction: "#1455548",
    type: "Litecoin (LTC)",
    date: "1 Feb, 2023",
    status: "Completed",
    color: "#3EBF81",
    amount: "1.09731151 USDT",
    img: Litecoin,
  },
  {
    id: uuidv4(),
    transaction: "#1455548",
    type: "Dogecoin (Doge) ",
    date: "22 Oct, 2023",
    status: "Pending",
    color: "#FC774A",
    amount: "2.5290621 USDT",
    img: Dogecoin,
  },
  {
    id: uuidv4(),
    transaction: "#1455548",
    type: "Binance (BTC) ",
    date: "22 Oct, 2023",
    status: "Completed",
    color: "#3EBF81",
    amount: "1.9862542 USDT",
    img: binance,
  },
  {
    id: uuidv4(),
    transaction: "#1455548",
    type: "TRON (TRX)",
    date: "22 Oct, 2023",
    status: "Completed",
    color: "#3EBF81",
    amount: "0.3456182 USDT",
    img: tron,
  },
  {
    id: uuidv4(),
    transaction: "#1455548",
    type: "Bitcoin (BTC)",
    date: "21 Sep, 2023",
    status: "Pending",
    color: "#FC774A",
    amount: "7.7642303 USDT",
    img: Bitcoin,
  },
  {
    id: uuidv4(),
    transaction: "#1455548",
    type: "Loopring (LRC) ",
    date: "21 Sep, 2023",
    status: "Completed",
    color: "#3EBF81",
    amount: "2.5290621 USDT",
    img: Litecoin,
  },
  {
    id: uuidv4(),
    transaction: "#1455548",
    type: "Ethereum (ETH) ",
    date: "8 Sep, 2023",
    status: "Completed",
    color: "#3EBF81",
    amount: "2.5290621 USDT",
    img: ellaism,
  },
  {
    id: uuidv4(),
    transaction: "#1455548",
    type: "Achain (ACT)",
    date: "21 Sep, 2023",
    status: "Completed",
    color: "#3EBF81",
    amount: "1.9862542 USDT",
    img: achain,
  },
  {
    id: uuidv4(),
    transaction: "#1455548",
    type: "Loopring (LRC)",
    date: "09 Sep, 2023",
    status: "Pending",
    color: "#FC774A",
    amount: "2.5290621 USDT",
    img: Stellar,
  },
];
