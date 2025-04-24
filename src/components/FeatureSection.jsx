import dashImage from "../img/dash.jpg"; // Adjust the path as necessary

const FeatureSection = () => {
  const features = [
    {
      title: "Advanced Analytics",
      text: "Enhance your trading strategy with state-of-the-art data analysis tools.",
    },
    {
      title: "100% FREE",
      text: "Begin your journey today with our complimentary journaling and analysis tools. Improve your trading strategies and make informed decisions.",
    },
    {
      title: "Break Through Technology",
      text: "The most efficient and synchronized software available on the market today, delivering unparalleled speed and functionality for all users' needs.",
    },
    {
      title: "Global Community",
      text: "Join a thriving community of verified and like-minded traders from around the world with our unique sharable link feature.",
    },
  ];

  return (
    <div className="px-4 bg-black" id="features">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid gap-6 row-gap-10 lg:grid-cols-2">
          {/* Text Side */}
          <div className="lg:py-6 lg:pr-16">
            {features.map((feature, index) => (
              <div className="flex" key={index}>
                <div className="flex flex-col items-center mr-4">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border border-teal-300 rounded-full">
                      <svg
                        className="w-4 text-teal-500"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <line x1="12" y1="2" x2="12" y2="22" />
                        <polyline points="19,15 12,22 5,15" />
                      </svg>
                    </div>
                  </div>
                  <div className="w-px h-full bg-teal-300"></div>
                </div>
                <div className="pt-1 pb-8">
                  <p className="mb-2 text-lg font-bold text-teal-300">
                    {feature.title}
                  </p>
                  <p className="text-gray-300">{feature.text}</p>
                </div>
              </div>
            ))}
            {/* Final Success Step */}
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div>
                  <div className="flex items-center justify-center w-10 h-10 border rounded-full border-emerald-900 bg-emerald-500">
                    <svg
                      className="w-6 text-gray-50"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <polyline
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        points="6,12 10,16 18,8"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="pt-1">
                <p className="mb-2 text-lg font-bold text-teal-500">
                  Success
                </p>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative">
            <img
              className="inset-0 w-full rounded shadow-lg h-96 lg:absolute lg:h-full"
              src={dashImage}
              alt="Dashboard Preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
