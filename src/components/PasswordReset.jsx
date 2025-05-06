import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../redux/slices/api";
import logo from "../img/BigLogoIcon.png";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

const PasswordReset = () => {
  const [searchParams] = useSearchParams();
  const Email = searchParams.get("e");

  const [email] = useState(Email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // false means visible (text)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => password.length >= 8;
  const validateConfirmPassword = (password, confirmPassword) => password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password || !confirmPassword) {
      toast.error("All fields are required.");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email.");
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must be at least 8 characters.");
      setIsLoading(false);
      return;
    }

    if (!validateConfirmPassword(password, confirmPassword)) {
      toast.error("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const { status } = await api.post("changePassword", { email, password });
      if (status === 201) {
        toast.success("Your Password Has Been Changed Successfully");
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (error) {
      const msg = error.response?.status === 422
        ? error.response.data.errors?.[0]
        : "An unexpected error occurred.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0f172a] md:pt-48 pt-36 lg:pt-0">
      <Toaster position="top-center" />
      <div className="flex flex-col gap-6 p-4 bg-transparent shadow-lg md:flex-row rounded-xl lg:px-7 lg:py-6">
        {/* Left Panel */}
        <div className="p-5 text-center text-white rounded-lg bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 lg:px-10 lg:py-8">
          <a href="#" className="flex items-center justify-center gap-2 mb-8">
            <img src={logo} alt="logo" className="w-32" />
          </a>
          <p className="text-sm font-light">
            Empowering your trades with secure access and trusted protection.
          </p>
        </div>

        {/* Right Panel */}
        <div className="w-full h-full py-6 border border-gray-600 px-7 rounded-xl">
          <h4 className="mb-6 text-2xl font-semibold text-center text-white">
            Reset Your Password
          </h4>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-300">Email Address</label>
              <input
                type="email"
                className="w-full px-3 py-2 rounded bg-[#0f172a] text-white border border-gray-600 outline-none"
                value={email}
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-300">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "password" : "text"} // Default: visible
                  className="w-full px-3 py-2 rounded bg-[#0f172a] text-white border border-gray-600 outline-none"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <RiEyeLine size={20} /> : <RiEyeOffLine size={20} />}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-300">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "password" : "text"} // Default: visible
                  className="w-full px-3 py-2 rounded bg-[#0f172a] text-white border border-gray-600 outline-none"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <RiEyeLine size={20} /> : <RiEyeOffLine size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-6 font-semibold text-white transition rounded-lg bg-emerald-600 hover:bg-emerald-700"
              disabled={isLoading}
            >
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
