/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const CopyWallet = ({
  amount,
  method,
  wallet,
  setCurrentState,
  coinImg,
  coinValue,
  setCoinImg,
  bitcoin,
  ethereum,
  tether,
  currency,
  methodSign
}) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (method === 'ethereum') {
      setCoinImg(ethereum);
    } else if (method === 'bitcoin') {
      setCoinImg(bitcoin);
    } else if (method === 'tether') {
      setCoinImg(tether);
    } else {
      setCoinImg('');
    }
  }, [method, setCoinImg, bitcoin, ethereum, tether]);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(wallet)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch((err) => console.error('Clipboard error:', err));
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = wallet;
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (error) {
        console.error('Fallback copy failed:', error);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  const handleConfirmPayment = () => {
    setCurrentState('UploadProof');
  };

  return (
    <div className="col-span-12 p-4 bg-Primary-bg rounded-xl lg:px-7 lg:py-6 xl:col-span-12">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="h-[800px] w-full">
          <div className="col-span-12 p-4 bg-Primary-3 rounded-xl lg:px-7 lg:py-6 xl:col-span-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 scrollable-container">
              <div className="h-[750px] w-full">
                <h5 className="text-base text-customGreen font-bold leading-[24px] mb-3 text-center">
                  Preferred Deposit Amount {currency}
                  {amount ?? 0.0} with a value of {coinValue?.toFixed(4) ?? 0.0}{' '}
                  {methodSign}
                </h5>
                <h5 className="text-base font-bold leading-[24px] text-center">
                  Please send your payment to one of the below listed crypto-currency addresses.
                </h5>

                <div className="flex items-center justify-center h-full">
                  <div className="h-[750px] w-full bg-Primary-bg flex justify-center items-center">
                    <div className="flex flex-col items-start max-w-4xl gap-6 mx-5 sm:flex-row">
                      <div className="flex-shrink-0 w-full sm:w-1/2">
                        <div className="h-60 sm:h-80 lg:h-96">
                          <img
                            src={coinImg}
                            alt="Coin"
                            className="w-full h-[200px] object-contain rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="w-full sm:w-1/2">
                        <h1 className="text-lg font-semibold text-slate-900 sm:text-2xl dark:text-white">
                          {method?.toUpperCase()} ADDRESS
                        </h1>
                        <div className="mt-4 space-y-4">
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={wallet}
                              readOnly
                              className="w-full px-4 py-2 border rounded-lg border-slate-300 text-slate-900 dark:text-slate-300 dark:bg-slate-800 focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={handleCopy}
                              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600  rounded-lg hover:bg-emerald-600 focus:outline-none"
                            >
                              <span className="mr-2 material-symbols-outlined">
                                {isCopied ? 'check' : 'content_copy'}
                              </span>
                            </button>
                          </div>

                          <h5 className="text-base font-bold leading-[24px] text-center mt-12">
                            Scan to Copy Wallet Details
                          </h5>
                          <div className="text-center">
                            <img
                              src={`https://quickchart.io/qr?text=${wallet}`}
                              alt="QR Code"
                              className="w-[200px] m-auto rounded-lg"
                            />
                          </div>

                          <div className="flex items-center justify-center mt-6">
                            <button
                              type="button"
                              onClick={handleConfirmPayment}
                              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-600 focus:outline-none"
                            >
                              Confirm Payment
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyWallet;
