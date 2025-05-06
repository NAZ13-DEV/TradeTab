import  { useState } from "react";

const faqs = [
  {
    question: "Do I need to install any software to use Crown Exchange?",
    answer:
      "Crown Exchange is a fully web-based platform, accessible from any device with an internet connection. There is no need to install any software on your computer or mobile device.",
  },
  {
    question: "How secure is my data on Crown Exchange?",
    answer:
      "Crown Exchange uses industry-standard encryption and security protocols to ensure that your data is protected. We prioritize your privacy and data security at all times.",
  },
  {
    question: "How can I track my trading performance on Crown Exchange?",
    answer:
      "Crown Exchange provides comprehensive analytics and performance tracking tools. You can view detailed reports on your trades, profits, losses, and various trading metrics to help you make informed decisions.",
  },
  {
    question: "Is Crown Exchange beginner-friendly?",
    answer:
      "Definitely! Crown Exchange is tailored to be easy to use for traders of all skill levels. We recommend that beginners start their trading journey on the platform for optimal success.",
  },
  {
    question: "Can I connect multiple broker accounts to Crown Exchange?",
    answer:
      "Yes. Crown Exchange allows you to connect and manage multiple broker accounts from a single platform. This makes it easy to monitor and analyze your trades across different brokers.",
  },
  {
    question: "Does Crown Exchange offer real-time market data?",
    answer:
      "Yes. Crown Exchange provides real-time market data and updates, ensuring that you have the latest information to make informed trading decisions.",
  },
];


const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative bg-black">
      <div className="glow-circle-left"></div>
      <div className="px-4 py-16 mx-auto max-w-screen-2xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-screen-xl mb-10 md:mx-auto sm:text-center md:mb-12">
            <div className="mx-auto text-center">
              <p className="inline-block px-3 py-px mb-4 text-xs font-semibold text-teal-900 uppercase bg-teal-400 rounded-full">
                Got any doubts?
              </p>
            </div>
            <p className="mb-6 text-4xl font-bold leading-none text-center text-white md:text-5xl md:mx-auto">
              Frequently asked questions
            </p>
            <p className="text-base text-gray-400 md:text-lg">
              We are here to answer all your questions and concerns.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((item, index) => (
              <div key={index} className="border-b border-teal-300">
                <button
                  type="button"
                  aria-label="Toggle item"
                  title="Toggle item"
                  onClick={() => toggle(index)}
                  className="flex items-center justify-between w-full p-4 focus:outline-none"
                >
                  <p className="text-lg font-medium text-white">{item.question}</p>
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-3 text-teal-500 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    <polyline
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit="10"
                      points="2,7 12,17 22,7"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out px-4 ${
                    openIndex === index ? "max-h-40 py-2" : "max-h-0"
                  }`}
                >
                  <p className="text-sm text-teal-300">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
