import { useLocation, useNavigate, } from "react-router-dom"; // ⬅️ Add this at the top
import {useState } from "react"; // ⬅️ Add this at the top
import TermsModal from "./TermsModal"

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleFeatureClick = () => {
    if (location.pathname === "/") {
      const el = document.getElementById("features");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/#features");
    }
  };

  return (
    <footer className="relative overflow-hidden text-white bg-black">
      {/* Glow and Modal */}
      <div className="glow-circle-right"></div>
      {isModalOpen && <TermsModal onClose={() => setIsModalOpen(false)} />}

      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <ul className="flex flex-wrap justify-center gap-4">
            <li>
              <a onClick={handleFeatureClick}>Features</a>
            </li>
            <li><a href="/journal">Journal</a></li>
            <li><button onClick={toggleModal}>Terms & Conditions</button></li>
          </ul>

          {/* Socials remain the same */}
          {/* ... */}
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col items-center justify-between pt-4 mt-6 border-t border-gray-200 lg:my-10 md:flex-row">
          <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} Crown Exchange. All Rights Reserved.
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
