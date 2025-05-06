import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BigLogo from "../img/BigLogoIcon.png";
import api from "../redux/slices/api"; // Adjust path as needed

const ForgotPasswordSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async ({ email }) => {
    if (!email) {
      toast.error("Email is required.");
      return;
    }

    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    if (!isValidEmail) {
      toast.error("Please enter a valid email.");
      return;
    }

    const userData = { email };

    try {
      const response = await api.post("ProcessReset", userData);
      if (response.status === 201) {
        toast.success("Reset Link Has Been Sent Successfully");
        reset();
        setTimeout(() => {
          navigate("/forgotten_sucess");
        }, 3000);
      }
    } catch (error) {
      if (error.response?.status === 422) {
        const regErrors = error.response.data.errors[0];
        toast.error(regErrors);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="w-full px-4 py-32 md:py-52 md:px-16 lg:py-36">
      <Toaster position="top-center" />
      <div className="flex flex-col items-center justify-center gap-10 mx-auto md:flex-row md:gap-12 lg:gap-20 max-w-7xl">
        {/* Left Section */}
        <div className="w-full text-center md:w-1/2 md:text-left">
          <h1 className="text-3xl font-bold text-white md:text-5xl">
            Forgot Your Password?
          </h1>
          <p className="max-w-lg mt-4 text-lg text-white">
            {`Enter your email address below and we'll send you instructions on how to reset your password.`}
          </p>
        </div>

        {/* Right Form */}
        <div className="w-full px-6 py-8 shadow-lg md:w-1/2 rounded-2xl bg-slate-900/80">
          <div className="flex justify-center mb-6">
            <a href="/">
              <img src={BigLogo} alt="Logo" className="w-32 sm:w-52" />
            </a>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <label htmlFor="email" className="block text-sm text-white">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                placeholder="Enter your email"
                className="w-full py-2 pl-10 pr-4 bg-transparent border border-teal-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 text-slate-400"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center justify-center w-full gap-2 py-2 text-lg font-medium rounded-md ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#20DD8A] hover:bg-green-500 text-black"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Instructions"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordSection;
