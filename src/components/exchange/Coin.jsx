import PropTypes from 'prop-types';
import { Tab } from '@headlessui/react';
import ForexPair from '../exchange/forex_pair';
import CfdPair from '../exchange/cfd_pair';
import CyptoPair from '../exchange/crypto_pair';
import StockPair from '../exchange/stock_pair';
import { useEffect, useState } from 'react';

const Coin = ({
  formFields,
  sellForm,
  setFormFields,
  setSellForm,
  selectedOption,
  setSelectedOption,
  buyFormRef,
  sellFormRef,
}) => {
  const [activeOption, setActiveOption] = useState(selectedOption);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    setActiveOption(value);
  };

  useEffect(() => {
    // Ensure it syncs with external changes to selectedOption (e.g. from OrderHistory)
    if (selectedOption && selectedOption !== activeOption) {
      setActiveOption(selectedOption);
    }
  }, [selectedOption]);

  const renderForm = () => {
    switch (activeOption) {
      case 'Forex Pairs':
        return (
          <ForexPair
            formFields={formFields}
            sellForm={sellForm}
            setFormFields={setFormFields}
            setSellForm={setSellForm}
            selectedOption={activeOption}
            setSelectedOption={setSelectedOption}
            buyFormRef={buyFormRef}
            sellFormRef={sellFormRef}
          />
        );
      case 'Crypto Pairs':
        return (
          <CyptoPair
            formFields={formFields}
            sellForm={sellForm}
            setFormFields={setFormFields}
            setSellForm={setSellForm}
            selectedOption={activeOption}
            setSelectedOption={setSelectedOption}
            buyFormRef={buyFormRef}
            sellFormRef={sellFormRef}
          />
        );
      case 'Cdf Pairs':
        return (
          <CfdPair
            formFields={formFields}
            sellForm={sellForm}
            setFormFields={setFormFields}
            setSellForm={setSellForm}
            selectedOption={activeOption}
            setSelectedOption={setSelectedOption}
            buyFormRef={buyFormRef}
            sellFormRef={sellFormRef}
          />
        );
      case 'Stocks Pairs':
        return (
          <StockPair
            formFields={formFields}
            sellForm={sellForm}
            setFormFields={setFormFields}
            setSellForm={setSellForm}
            selectedOption={activeOption}
            setSelectedOption={setSelectedOption}
            buyFormRef={buyFormRef}
            sellFormRef={sellFormRef}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full col-span-12 p-4 sm:p-6 lg:p-8 rounded-xl bg-[#050A1D] border border-emerald-500/10 shadow-lg">
      <Tab.Group>
        <Tab.Panels className="mt-4">
          <Tab.Panel>
            <h5 className="text-center mb-6 text-sm sm:text-base font-semibold text-emerald-300">
              {activeOption === ''
                ? 'Choose Trading Pairs'
                : `Your Chosen Trading Pair: ${activeOption}`}
            </h5>

            <div className="relative mb-8">
              <select
                className="w-full px-4 py-3 text-sm sm:text-base text-white bg-[#0A122A] border border-emerald-400/20 focus:ring-2 focus:ring-emerald-500/30 focus:outline-none rounded-md transition"
                name="trading"
                id="marketOrderSelect"
                value={activeOption}
                onChange={handleChange}
              >
                <option value="">Choose Trading Pairs</option>
                <option value="Forex Pairs">Trade Forex</option>
                <option value="Crypto Pairs">Trade Crypto</option>
                <option value="Cdf Pairs">Trade CFD</option>
                <option value="Stocks Pairs">Trade Stocks</option>
              </select>
            </div>

            {/* Dynamically render the correct form */}
            {renderForm()}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

Coin.propTypes = {
  formFields: PropTypes.object.isRequired,
  sellForm: PropTypes.object.isRequired,
  setFormFields: PropTypes.func.isRequired,
  setSellForm: PropTypes.func.isRequired,
  selectedOption: PropTypes.string.isRequired,
  setSelectedOption: PropTypes.func.isRequired,
  buyFormRef: PropTypes.object.isRequired,
  sellFormRef: PropTypes.object.isRequired,
};

export default Coin;
