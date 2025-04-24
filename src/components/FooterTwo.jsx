import logo from "../img/logo_light.png"; // Adjust path as necessary

const FooterTwo = () => {
  return (
    <footer className="px-4 pt-16 mx-auto duration-300 ease-in-out border bg-slate-900 md:px-24 lg:px-8 border-cyan-800 hover:border-cyan-500 rounded-2xl">
      <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <a href="/" aria-label="Go home" title="TradeTab" className="inline-flex items-center">
            <img src={logo} className="h-8" alt="TradeTab Logo" />
          </a>
          <div className="mt-6 lg:max-w-sm">
            <p className="text-sm text-gray-500">
              At TradeTab, we provide traders with the tools and insights they need to make improved trading decisions.
              Our platform offers comprehensive analytics, performance tracking, and real-time market data to help you
              navigate the forex market with confidence.
            </p>
          </div>
        </div>

        <div>
          <span className="text-base font-bold tracking-wide text-gray-400">Social</span>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <div className="flex flex-wrap gap-4">
              {[
                {
                  href: "https://wa.me/+447546810196?text=I%20want%20to%20know%20more%20about%20TradeTab",
                  icon: "fab fa-whatsapp",
                },
                {
                  href: "https://x.com/Tradetabx",
                  icon: "fab fa-twitter",
                },
                {
                  href: "https://t.me/tradetabtelegram",
                  icon: "fab fa-telegram",
                },
                {
                  href: "https://www.instagram.com/tradetab/",
                  icon: "fab fa-instagram",
                },
                {
                  href: "https://www.facebook.com/profile.php?id=61564021491445",
                  icon: "fab fa-facebook",
                },
                {
                  href: "https://www.tiktok.com/@tradetab?_t=8rxuktkPxVH&_r=1",
                  icon: "fab fa-tiktok",
                },
                {
                  href: "https://www.linkedin.com/company/tradetabsoftware/about/",
                  icon: "fab fa-linkedin",
                },
                {
                  href: "https://www.youtube.com/@TradeTabchannel",
                  icon: "fab fa-youtube",
                },
              ].map(({ href, icon }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-white transition-colors text-[20px]"
                >
                  <i className={icon}></i>
                </a>
              ))}
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500">Follow us on our social networks</p>
        </div>
      </div>

      <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t border-slate-700 lg:flex-row">
        <p className="text-sm text-gray-600">
          © 2024 TradeTab | Trademarks and brands are the property of their respective owners.
        </p>
        <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
          <li>
            <a href="/settings/faq" className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
              F.A.Q
            </a>
          </li>
          <li>
            <a href="/" className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/settings/termsAndconditions" className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
              Terms &amp; Conditions
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default FooterTwo;
