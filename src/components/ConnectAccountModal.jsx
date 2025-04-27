import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";

const brokerServers = [
  "Exness-Real1", "Exness-Real2", "Exness-Real3", "ICMarkets-Live01", "ICMarkets-Live02",
  "Pepperstone-Edge01", "Pepperstone-Edge02", "FXTM-ECN", "FXTM-Standard", "XMGlobal-Real 1",
  "XMGlobal-Real 2", "OctaFX-Real", "FBS-Real-1", "RoboForex-Pro", "ForexTimeFXTM-Standard",
  "Alpari-Standard1", "HotForex-Live Server", "Ava-Real 1", "FXPro.com-Real01", "Tickmill-Live",
  "OANDA-Live", "IG-Live", "AdmiralMarkets-Live", "Swissquote-Live", "BlackBullMarkets-Live",
  "VTMarkets-Live", "FusionMarkets-Live", "FPMarkets-Live", "Eightcap-Live", "ICMCapital-Live",
  "ThinkMarkets-Live", "FXPrimus-Live", "InstaForex-Live", "IronFX-Live", "Libertex-Live",
  "Markets.com-Live", "FXCM-Live", "Forex.com-Live", "HYCM-Live", "XTB-Live", "AxiTrader-Live",
  "NordFX-Live", "Forex4you-Live", "FXOpen-Live", "FXChoice-Live", "LMFX-Live", "JustForex-Live",
  "GrandCapital-Live"
];

const ConnectAccountModal = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState("mt4");
  const [brokerInput, setBrokerInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [brokerList, setBrokerList] = useState([]);
  const [filteredBrokers, setFilteredBrokers] = useState([]);

  useEffect(() => {
    setBrokerList(brokerServers);
    setFilteredBrokers(brokerServers);
  }, []);

  useEffect(() => {
    const matches = brokerInput
      ? brokerList.filter((broker) =>
          broker.toLowerCase().includes(brokerInput.toLowerCase())
        )
      : brokerList;
    setFilteredBrokers(matches);
  }, [brokerInput, brokerList]);

  const formik = useFormik({
    initialValues: {
      broker: "",
      accountNumber: "",
      password: "",
      accountName: ""
    },
    validationSchema: Yup.object({
      broker: Yup.string().required("Broker server is required"),
      accountNumber: Yup.string().required("Account number is required"),
      password: Yup.string().required("Password is required"),
      accountName: Yup.string().min(4, "Minimum 4 characters").required("Account name is required")
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        toast.loading("Connecting...");
        const response = await axios.post("/api/connect", {
          ...values,
          version: selectedVersion
        });
        toast.dismiss();
        toast.success(response?.data?.message || "Account connected successfully!");
        onClose();
      } catch (err) {
        toast.dismiss();
        const errorMessage =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to connect account.";
        toast.error(errorMessage);
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <style>{`
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background-color: #14b8a6; border-radius: 8px; }
        ::-webkit-scrollbar-track { background-color: #2a2a2a; }
        * { scrollbar-width: thin; scrollbar-color: #14b8a6 #2a2a2a; }
      `}</style>
      <form
        onSubmit={formik.handleSubmit}
        className="relative w-full max-w-lg px-8 py-6 mx-auto overflow-y-auto duration-300 ease-in-out rounded-xl shadow-lg transition-height max-h-[90vh]"
        style={{ backgroundColor: "rgb(35 38 43 / 1)" }}
      >
        <button
          type="button"
          className="absolute text-2xl text-white top-3 right-3 hover:text-gray-400"
          onClick={onClose}
        >
          ✖
        </button>

        <h3 className="mb-4 text-2xl font-semibold text-center text-white">Connect MetaTrader Account</h3>

        <div className="mb-4 text-sm text-right text-teal-500 cursor-pointer hover:text-teal-400">
          <p className="text-base text-transparent whitespace-pre-wrap rounded-lg bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text">
            {` Don't have an account?`}
          </p>
        </div>

        <div className="my-6">
          <h3 className="mb-4 text-lg font-semibold text-white">Select MetaTrader Version</h3>
          <div className="grid grid-cols-2 gap-4">
            {["mt4", "mt5"].map((ver) => (
              <button
                key={ver}
                type="button"
                onClick={() => setSelectedVersion(ver)}
                className={`p-4 rounded-lg transition duration-300 ease-in-out border-4 ${
                  selectedVersion === ver
                    ? "bg-gradient-to-r from-teal-500 to-teal-600 border-teal-400 text-white"
                    : "bg-darkblack-700 border-gray-600 text-gray-400 hover:bg-darkblack-600"
                }`}
              >
                <span className="block text-xl font-bold">MetaTrader {ver.slice(-1)}</span>
                <span className="block text-sm">
                  {ver === "mt4" ? "Classic Trading Platform" : "Advanced Trading Platform"}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative mb-4 sm:mb-6">
          <label className="block mb-2 text-sm font-medium sm:text-base text-bgray-300">Broker Server</label>
          <input
            name="broker"
            value={brokerInput}
            onChange={(e) => {
              setBrokerInput(e.target.value);
              formik.setFieldValue("broker", e.target.value);
            }}
            onFocus={() => setShowDropdown(true)}
            placeholder="Search broker server"
            className="w-full p-4 text-white transition-colors duration-200 bg-transparent border border-gray-600 rounded-lg h-14 bg-darkblack-500 placeholder:font-medium focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
          {formik.touched.broker && formik.errors.broker && (
            <p className="text-sm text-red-500">{formik.errors.broker}</p>
          )}
          {showDropdown && (
            <div className="absolute z-10 w-full mt-2 overflow-y-auto rounded-md bg-slate-800 max-h-40">
              {filteredBrokers.map((broker, i) => (
                <div
                  key={i}
                  className="p-2 text-white cursor-pointer hover:bg-teal-600"
                  onClick={() => {
                    setBrokerInput(broker);
                    formik.setFieldValue("broker", broker);
                    setShowDropdown(false);
                  }}
                >
                  {broker}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-2">
          <label className="block mb-2 text-base font-medium text-bgray-300">Account Number</label>
          <input
            name="accountNumber"
            type="text"
            value={formik.values.accountNumber}
            onChange={formik.handleChange}
            className="w-full p-4 text-base text-white bg-transparent border rounded-lg h-14 border-success-300 bg-darkblack-500 placeholder:font-medium focus:border focus:ring-0 focus:border-success-300 focus:animate-glow"
            placeholder="Enter your account number"
          />
          {formik.touched.accountNumber && formik.errors.accountNumber && (
            <p className="text-sm text-red-500">{formik.errors.accountNumber}</p>
          )}
        </div>

        <div className="mt-2">
          <p className="mb-2 text-base font-medium text-bgray-300">Main/Investor Password</p>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password"
              className="w-full p-4 pr-12 text-base text-white bg-transparent border rounded-lg h-14 border-success-300 bg-darkblack-500 placeholder:font-medium focus:ring-0 focus:border-success-300"
            />
            <button
              type="button"
              className="absolute text-2xl text-green-300 transform -translate-y-1/2 top-1/2 right-4"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fas fa-eye${showPassword ? "-slash" : ""}`}></i>
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="text-sm text-red-500">{formik.errors.password}</p>
          )}
          <p className="mt-1 text-sm text-transparent whitespace-pre-wrap rounded-lg bg-gradient-to-r from-slate-400 to-teal-700 bg-clip-text">
            *We do not store your password in our database.
          </p>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-sm text-gray-300">Account Name (At least 4 chars)</p>
          <input
            name="accountName"
            value={formik.values.accountName}
            onChange={formik.handleChange}
            className="w-full p-3 text-white bg-transparent border border-gray-400 rounded-lg bg-darkblack-500"
            placeholder="My trading account"
          />
          {formik.touched.accountName && formik.errors.accountName && (
            <p className="text-sm text-red-500">{formik.errors.accountName}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className={`w-full py-3 mt-6 text-sm font-semibold text-white transition-colors rounded-lg ${
            formik.isSubmitting ? "bg-gray-600" : "bg-teal-600 hover:bg-green-500"
          }`}
        >
          {formik.isSubmitting ? "Connecting..." : "Connect Account"}
        </button>
      </form>
    </div>
  );
};

ConnectAccountModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ConnectAccountModal;
