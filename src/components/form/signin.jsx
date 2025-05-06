'use client';
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../app/slices/userSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SigninForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => password.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(async () => {
      if (!email || !password) {
        toast.dismiss();
        toast.error('All fields are required.');
        setIsLoading(false);
        return;
      }
      if (!validateEmail(email)) {
        toast.error('Please enter a valid email.');
        setIsLoading(false);
        return;
      }
      if (!validatePassword(password)) {
        toast.error('Password must be at least 8 characters.');
        setIsLoading(false);
        return;
      }

      const userData = { email, password };
      // Example API call (update with your API logic)
      try {
        // Simulated API request
        toast.success('Login successful!');
        setTimeout(() => {
          router.push('../(withlayout)/dashboard');
        }, 3000);
      } catch (error) {
        toast.error('Login failed!');
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };
  const passwordBorderClass = password.length >= 6 ? 'border-Neutral-8' : 'border-Neutral-6'; 

  return (
    <form onSubmit={handleSubmit}>
      <Toaster position='top-center' />
      <div className='form-control w-full'>
        <label className='label'>
          <span className='text-base text-Neutral-6'>E-mail</span>
        </label>
        <input
          type='email'
          placeholder='Email Address'
          className='px-2 py-[10px] rounded bg-Primary-3 text-Neutral-6 border border-Neutral-10 outline-none w-full'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='form-control mt-2'>
        <label className='label'>
          <span className='text-base text-Neutral-6 block'>Password</span>
        </label>
        <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Validate your login with your password'
            className={`px-2 py-[10px] rounded bg-Primary-3 text-Neutral-6 border ${passwordBorderClass} outline-none w-full`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-Neutral-6'
          >
            <span className='material-symbols-outlined'>
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        </div>
      </div>

      <div className='mt-3 block sm:flex flex-wrap gap-2 items-center justify-between'>
        <Link
          href='#'
          className='text-xs text-Neutral-8 hover:text-white leading-[18px]'
        >
          Forgot password
        </Link>
      </div>
      <div className='text-center mt-8'>
        <button
          type='submit'
          className='mt-4 px-4 py-2 text-white font-semibold leading-[18px] border border-Neutral-8 rounded-lg hover:bg-Neutral-8 w-full'
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Sign in'}
        </button>
      </div>
    </form>
  );
}
