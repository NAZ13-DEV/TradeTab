import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import AOS from 'aos';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'aos/dist/aos.css';

import Home from "./pages/Home";
import Metrics from "./pages/Metrics";
import Journal from "./pages/Journal";
import ForexCalculator from "./pages/ForexCalculator";
import Brokers from "./pages/Brokers";
import FreeUniversity from "./pages/FreeUniversity";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import PageNotFound from "./pages/PageNotFound";
import EmotionalEvaluation from "./pages/EmotionalEvaluation";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  useEffect(() => {
    // Initialize animations
    AOS.init({
      duration: 800,
      once: true,
    });

    // Preload all <img> elements after a short delay
    const preloadImages = () => {
      const images = document.querySelectorAll("img");
      images.forEach((img) => {
        const src = img.getAttribute("src");
        if (src) {
          const image = new Image();
          image.src = src;
        }
      });
    };

    // Delay slightly to ensure components are rendered
    const timeout = setTimeout(preloadImages, 300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/metrics" element={<Metrics />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/forexCalculator" element={<ForexCalculator />} />
          <Route path="/brokers" element={<Brokers />} />
          <Route path="/freeUniversity" element={<FreeUniversity />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/emotionalEvaluation" element={<EmotionalEvaluation />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
