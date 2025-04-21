import { useState } from "react";
import TermsModal from "./TermsModal";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <footer className="relative overflow-hidden text-white bg-black">
      {/* Glow */}
      <div className="glow-circle-right"></div>

      {/* Modal */}
      {isModalOpen && <TermsModal onClose={() => setIsModalOpen(false)} />}

      {/* Footer Main Content */}
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <ul className="flex flex-wrap justify-center gap-4">
            <li className="hidden lg:block">
              <button>Features</button>
            </li>
            <li>
              <a href="/journal">Journal</a>
            </li>
            <li>
              <button onClick={toggleModal}>Terms & Conditions</button>
            </li>
          </ul>

          {/* Social Links */}
          <div className="flex gap-4 text-[20px]">
            {[
              {
                href: "https://wa.me/+447546810196?text=I%20want%20to%20know%20more%20about%20TradeTab",
                icon: "fab fa-whatsapp",
              },
              { href: "https://x.com/Tradetabx", icon: "fab fa-x-twitter" },
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
                className="transition-colors"
              >
                <i className={icon}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col items-center justify-between pt-4 mt-6 border-t border-gray-200 lg:my-10 md:flex-row">
          <p className="text-sm text-center md:text-left">
            © 2024 TradeTab. All Rights Reserved.
          </p>
          <button
            className="items-center hidden text-teal-600 transition-colors hover:text-white lg:flex"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <i className="fas fa-arrow-up"></i>
            <span className="ml-2">Scroll to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
