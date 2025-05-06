import { BrowserRouter, Routes, Route } from "react-router-dom";
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
          {/* Public Routes - only accessible when NOT logged in */}
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
              <PublicRoute>
                <Verify />
              </PublicRoute>
            }
          />

          {/* Protected Route - only accessible when logged in */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
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
