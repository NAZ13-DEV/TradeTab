
'use client';
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../app/slices/userSlice';
import { useRouter } from 'next/navigation';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import Select from "react-select";

const CountrySelect = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        setSelectedCountry(data.userSelectValue || {});
      });
  }, []);

  return (
    <Select
      options={countries}
      value={selectedCountry}
      onChange={(selectedOption) => setSelectedCountry(selectedOption)}
    
    />
  );
};

function SignupForm() {
  // State for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState({}); 
  const [phoneNumber, setPhoneNumber] = useState(''); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referral, setReferral] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Redux hooks
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, user, error, message } = useSelector(
    (state) => state.registerUser || {}
  );

  // Validation functions (simplified for brevity)
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validateFirstName = (fname) => /^[A-Za-z]+$/.test(fname);
  const validateLastName = (lname) => /^[A-Za-z]+$/.test(lname);
  const validateUsername = (username) => /^[A-Za-z0-9]+$/.test(username);
  const validateCountry = (country) => Object.keys(country).length !== 0;
  const validatePassword = (password) => password.length >= 8;
  const validateConfirmPassword = (password, confirmPassword) => password === confirmPassword;

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(async () => {
      // Check if all fields are filled
      if (!firstName || !lastName || !username || !email || !phoneNumber || !password || !confirmPassword || Object.keys(country).length === 0) {
        toast.dismiss();
        toast.error('All fields are required.');
        setIsLoading(false);
        return;
      }
      
      // Validate fields
      if (!validateEmail(email)) {
        toast.error('Please enter a valid email.');
        setIsLoading(false);
        return;
      }
      if (!validateFirstName(firstName)) {
        toast.error('First Name must contain only letters.');
        setIsLoading(false);
        return;
      }
      if (!validateLastName(lastName)) {
        toast.error('Last Name must contain only letters.');
        setIsLoading(false);
        return;
      }
      if (!validateUsername(username)) {
        toast.error('Username must contain only numbers and letters.');
        setIsLoading(false);
        return;
      }
      if (!validateCountry(country)) {
        toast.error('Country is required.');
        setIsLoading(false);
        return;
      }
      if (!validatePassword(password)) {
        toast.error('Password must be at least 8 characters.');
        setIsLoading(false);
        return;
      }
      if (!validateConfirmPassword(password, confirmPassword)) {
        toast.error('Passwords do not match.');
        setIsLoading(false);
        return;
      }

      // Prepare user data for dispatch
      const userData = {
        firstName,
        lastName,
        username,
        email,
        phoneNumber: `+${phoneNumber}`, 
        country: country.value,
        password,
        referral,
      };

      dispatch(registerUser(userData));
    }, 1000);
  };

  // Effect for handling Redux state changes
  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    if (error) {
      toast.error(error);
    }

    if (message === 'true') {
      toast.success('Your registration is successful.');
      setTimeout(() => {
        router.push('./verify');
      }, 2000);
    }
  }, [loading, error, message, router]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Toaster position='top-center' />

        {/* First Name */}
        <div className='form-control w-full'>
          <label className='label'>
            <span className='text-base text-Neutral-6'>First Name</span>
          </label>
          <input
            type='text'
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className='px-2 py-[10px] rounded bg-Primary-3 text-Neutral-6 border border-Neutral-6 outline-none w-full'
          />
        </div>

        {/* Last Name */}
        <div className='form-control w-full'>
          <label className='label'>
            <span className='text-base text-Neutral-6'>Last Name</span>
          </label>
          <input
            type='text'
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className='px-2 py-[10px] rounded bg-Primary-3 text-Neutral-6 border border-Neutral-6 outline-none w-full'
          />
        </div>

        {/* Username */}
        <div className='form-control w-full'>
          <label className='label'>
            <span className='text-base text-Neutral-6'>Username</span>
          </label>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='px-2 py-[10px] rounded bg-Primary-3 text-Neutral-6 border border-Neutral-6 outline-none w-full'
          />
        </div>

        {/* Email */}
        <div className='form-control w-full'>
          <label className='label'>
            <span className='text-base text-Neutral-6'>Email</span>
          </label>
          <input
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='px-2 py-[10px] rounded bg-Primary-3 text-Neutral-6 border border-Neutral-6 outline-none w-full'
          />
        </div>

        {/* Phone Number */}
        <div className='form-control w-full'>
          <label className='label'>
            <span className='text-base text-Neutral-6'>Phone Number</span>
          </label>
          <PhoneInput
            country={'us'}
            enableSearch={true}
            value={phoneNumber}
            onChange={(value) => setPhoneNumber(value)}
            containerClass='w-full border border-Neutral-6 rounded '
            inputClass='px-2 py-[10px] rounded bg-Primary-3 text-white border-none outline-none w-full'
            buttonClass='bg-Primary-3 border-Neutral-6 border-r rounded-l text-white'
            dropdownClass='bg-Primary-3 text-white border-Neutral-6'
            searchClass='px-2 py-[10px] bg-Primary-3 text-white'
          />
        </div>

        {/* Country */}
        <div className='form-control w-full'>
          <label className='label'>
            <span className='text-base text-Neutral-6'>Country</span>
          </label>
          <CountrySelect 
            onChange={setCountry} 
            value={country} 
          />
        </div>

        {/* Password */}
        <div className='form-control w-full'>
          <label className='label'>
            <span className='text-base text-Neutral-6'>Password</span>
          </label>
          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='px-2 py-[10px] rounded bg-Primary-3 text-Neutral-6 border border-Neutral-6 outline-none w-full'
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

        {/* Confirm Password */}
        <div className='form-control w-full'>
          <label className='label'>
            <span className='text-base text-Neutral-6'>Confirm Password</span>
          </label>
          <div className='relative'>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='Confirm Your Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='px-2 py-[10px] rounded bg-Primary-3 text-Neutral-6 border border-Neutral-6 outline-none w-full'
            />
            <button
              type='button'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-Neutral-6'
            >
              <span className='material-symbols-outlined'>
                {showConfirmPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
        </div>

        <button
          type='submit'
          className='mt-4 px-4 py-2 text-white font-semibold leading-[18px] border border-Neutral-8 rounded-lg hover:bg-Neutral-8 w-full'
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Sign up'}
        </button>
      </form>
    </>
  );
}

export default SignupForm;