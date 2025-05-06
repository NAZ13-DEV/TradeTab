import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
// import Logo from '../img/logo_1.png';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';
import WelcomeLoader from './WelcomeLoader';
import BigLogo from "../img/BigLogoIcon.png";
import api from '../redux/slices/api';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const LoginSection = () => {
  const [showPass, setShowPass] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await api.post('ProcessLog', data);

      if (response.status === 201) {
        const { id, UserLogin, dis } = response.data.message;

        if (dis === 'disabled') {
          toast.error('An error occurred while trying to log you in. Try contacting support.');
          return;
        }

        if (UserLogin === 'True') {
          localStorage.setItem('uId', id);
          const getUrl = localStorage.getItem('url') ?? null;
          const redirectUrl = getUrl ? getUrl : '/dashboard';
          localStorage.removeItem('url');

          const expiryTime = new Date();
          expiryTime.setTime(expiryTime.getTime() + 30 * 60 * 1000); // 30 minutes
          document.cookie = `uId=${id}; expires=${expiryTime.toUTCString()}; path=/;`;

          toast.success('Login successful!');
          setShowWelcome(true);
          setTimeout(() => {
            setShowWelcome(false);
            navigate(redirectUrl);
          }, 3500);
        }
      }
    } catch (error) {
      if (error.response?.status === 422) {
        const regErrors = error.response.data.errors[0];
        toast.error(regErrors);
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  };

  if (showWelcome) {
    return <WelcomeLoader />;
  }

  return (
    <div className="px-4 md:px-20 py-24 md:py-32 font-poppins text-[#E6E6E6]">
      <Toaster position="top-center" toastOptions={{ style: { background: '#041F3E', color: '#fff' } }} />
      <div className="grid items-center grid-cols-1 gap-12 mx-auto max-w-7xl md:grid-cols-2">
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            The Leading Platform For <br className="hidden md:block" />
            Forex Trading Insights And Analytics
          </h1>
        </div>

        <div className="w-full max-w-xl p-8 mx-auto shadow-lg bg-slate-900/80 rounded-2xl">
          <Link to="/home" className="flex items-center justify-center mb-6 text-2xl font-bold">
            <img src={BigLogo} alt="TradeTab" className="w-32 mr-2" />
            {/* <span className="text-transparent bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text">Trade</span>Tab */}
          </Link>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <p className="text-sm text-gray-300">Welcome back</p>
              <h2 className="text-2xl font-bold text-white">Login to Your Personal Account</h2>
            </div>

            <div>
              <label className="block mb-1 text-xs text-white">Email</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register('email')}
                  className="w-full px-10 py-2 text-white bg-transparent border-2 border-gray-600 rounded-md outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <Mail className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-xs text-white">Password</label>
              <div className="relative mt-4">
                <Lock className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  {...register('password')}
                  className="w-full px-10 py-2 text-white bg-transparent border-2 border-gray-600 rounded-md outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute text-white right-3 top-2.5">
                  {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between mt-2">
              <Link to="/ForgotPassword" className="text-sm text-teal-400 hover:underline">
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center items-center gap-2 py-2 text-black font-semibold rounded-md transition ${
                isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#50DD8A] hover:bg-green-500'
              }`}
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSubmitting ? '' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-white">
              Don’t have an account?{' '}
              <Link to="/register" className="text-[#20dd43] hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default LoginSection;
