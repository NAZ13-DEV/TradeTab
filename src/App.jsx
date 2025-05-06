import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "aos/dist/aos.css";
import { Toaster } from "react-hot-toast";

// pages
import Home from "./pages/Home";
import Metrics from "./pages/Metrics";
import Journal from "./pages/Journal";
import ForexCalculator from "./pages/ForexCalculator";
import FreeUniversity from "./pages/FreeUniversity";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import PageNotFound from "./pages/PageNotFound";
import ScrollToTop from "./components/ScrollToTop";
import EmotionalEvaluation from "./pages/EmotionalEvaluation";
import Verify from "./pages/Verify";

// routes
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ResetPassword from "./pages/ResetPassword";

const titleMap = {
  "/": "Home | Crown Exchange",
  "/home": "Home | Crown Exchange",
  "/metrics": "Metrics | Crown Exchange",
  "/journal": "Journal | Crown Exchange",
  "/forexCalculator": "Forex Calculator | Crown Exchange",
  "/freeUniversity": "Free University | Crown Exchange",
  "/login": "Login | Crown Exchange",
  "/register": "Register | Crown Exchange",
  "/forgotPassword": "Forgot Password | Crown Exchange",
  "/emotionalEvaluation": "Emotional Evaluation | Crown Exchange",
  "/verify": "Verify Email | Crown Exchange",
  "/dashboard": "Dashboard | Crown Exchange",
  "/passwordReset": "Password Reset | Crown Exchange"
};

const TitleUpdater = () => {
  const location = useLocation();
  useEffect(() => {
    const defaultTitle = "Crown Exchange";
    document.title = titleMap[location.pathname] || defaultTitle;
  }, [location.pathname]);
  return null;
};

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });

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

    const timeout = setTimeout(preloadImages, 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <BrowserRouter>
        <TitleUpdater />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#041F3E",
              color: "#fff",
            },
          }}
        />
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="/metrics"
            element={
              <PublicRoute>
                <Metrics />
              </PublicRoute>
            }
          />
          <Route
            path="/journal"
            element={
              <PublicRoute>
                <Journal />
              </PublicRoute>
            }
          />
          <Route
            path="/forexCalculator"
            element={
              <PublicRoute>
                <ForexCalculator />
              </PublicRoute>
            }
          />
          <Route
            path="/freeUniversity"
            element={
              <PublicRoute>
                <FreeUniversity />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/forgotPassword"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/emotionalEvaluation"
            element={
              <PublicRoute>
                <EmotionalEvaluation />
              </PublicRoute>
            }
          />
          <Route
            path="/verify"
            element={
              <ProtectedRoute>
                <Verify />
              </ProtectedRoute>
            }
          />

          {/* Protected Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/passwordReset"
            element={
              <ProtectedRoute>
                <ResetPassword />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
