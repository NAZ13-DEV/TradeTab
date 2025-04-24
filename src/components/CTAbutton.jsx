const CTAButtons = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 px-4 py-10 sm:flex-row sm:gap-6 md:gap-10">
      {/* First CTA */}
      <p className="w-full px-6 py-3 text-sm font-semibold text-center text-white transition-all duration-300 ease-in-out bg-teal-500 rounded-lg sm:text-base md:text-lg sm:w-auto sm:px-10 sm:py-3 hover:bg-teal-600 hover:shadow-lg">
        New to Trading? Start Here!
      </p>

      {/* Second CTA */}
      <p className="w-full px-6 py-3 text-sm font-semibold text-center text-white transition-all duration-300 ease-in-out rounded-lg sm:text-base md:text-lg bg-gradient-to-r from-blue-500 to-teal-500 sm:w-auto sm:px-10 sm:py-3 hover:from-blue-600 hover:to-teal-600 hover:shadow-lg">
        Add Your Account For Free!
      </p>
    </div>
  );
};

export default CTAButtons;
