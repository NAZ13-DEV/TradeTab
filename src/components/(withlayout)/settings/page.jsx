"use client";
import React, { Fragment, useEffect,useState, useRef } from "react";
import profile from "../../../../public/images/profile.png";
import Image from "next/image";
import "remixicon/fonts/remixicon.css";
import { Listbox, Tab } from "@headlessui/react";
import code from "../../../../public/images/Code.png";
import { loginHistory } from "../../../../public/data/settingsData";
import Link from "next/link";
import OtpInput from "react-otp-input";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, clearUserState } from '../../slices/fetchUserSlice';
import api from '../../slices/api';
import toast,{ Toaster } from 'react-hot-toast';
 import { useRouter } from 'next/navigation';
 import userProfile from '../../../../public/images/userProfile.svg';

 

const Settings = () => {
         const dispatch = useDispatch();
 const { user, status, error:useEror } = useSelector((state) => state.fetchUserDetails);
     const [showCurrentPassword, setShowCurrentPassword] = useState(false);
const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [id, setId] = useState(null);
// const [isBiometricsEnabled, setIsBiometricsEnabled] = useState(false); 
//   const [loading, setLoading] = useState(false);
 const router = useRouter();
  useEffect(() => {
    const storedUserId = localStorage.getItem('uId');
    if (storedUserId) {
      dispatch(fetchUserDetails(storedUserId));
    }
    return () => {
      dispatch(clearUserState());
    };
  }, [dispatch]);
const [passwordData, setPasswordData] = useState({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: ''
});
// const router = useRouter
  const initialFormData = {
    firstName: "",
    last_Name: "",
    Username: "",
    email: "",
    Phone: "",
    country: "",
    Plan: "",
    createdAt: "",
    userid: "",
    id: "",
  };

  const [formData, setFormData] = useState(initialFormData);
   useEffect(() => {
    if (user?.kyc === "" || user?.kyc === null || user?.kyc === 'false' || user?.kyc === 'pending' && user?.verifi === 'false' || user?.verifi === ""|| user?.verifi === null|| user?.verifi === 'pending') {
      router.push('./kyc');
      // console.log(user?.kyc, user?.verifi)
    }
  }, [user, router]);
  // Populate form data with specific fields from the user object
  useEffect(() => {
    if (user) {
      const filteredData = Object.keys(initialFormData).reduce((acc, key) => {
        acc[key] = user[key] || ""; 
        return acc;
      }, {});
      setFormData(filteredData);
      setId(user.id)
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [otp, setOtp] = useState("");

const toggleCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);
const toggleNewPassword = () => setShowNewPassword(!showNewPassword);
const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

const handlePasswordChange = (e) => {
  const { name, value } = e.target;
  setPasswordData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleSubmit = (e) => {
  e.preventDefault();

  const loadingToast = toast.loading("Updating user details...");

 
  setTimeout(() => {
    api.put(`edituserByUser/${formData.id}`, formData)
      .then((response) => {
        toast.dismiss()
        toast.success("User details updated successfully!", { id: loadingToast, duration: 3000 });
           setTimeout(() => {
          router.push('./settings');
        }, 3000); 


      })
      .catch((error) => {
        toast.dismiss()
        toast.error("Failed to update user details. Please try again.", { id: loadingToast });
      })
      .finally(() => {
        setTimeout(() => {
          toast.dismiss(loadingToast);
        }, 3000); 
      });
  }, 2000); 
};
const submitPasswordUpdate = async (e) => {
  e.preventDefault();

  if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmNewPassword) {
    toast.dismiss();
    toast.error("Password fields cannot be empty!");
    return;
  }

  if (passwordData.newPassword !== passwordData.confirmNewPassword) {
    toast.dismiss();
    toast.error("Passwords don't match!");
    return;
  }

  toast.dismiss();
  const loadingToast = toast.loading('Updating password...');

  setTimeout(async () => {
 try {
  const response = await api.put(`editpassByUser/${id}`, passwordData);
    toast.dismiss();
  toast.success('Password updated successfully!', { id: loadingToast, duration: 3000 });
} catch (error) {
    toast.dismiss();
  toast.error('Incorrect password, kindly check your password', { id: loadingToast, duration: 3000 });
} finally {
    setTimeout(() => {
    toast.dismiss(loadingToast);
  }, 3000); 
}

  }, 2000);
};

 const userImg = user?.img ? user?.img : userProfile;


  return (
    <div className="bg-Primary-bg p-3 lg:p-6 min-h-screen">
      <section className="block lg:flex gap-6 w-full">
        <div className="bg-Primary-3 p-4 lg:px-7 lg:py-6 rounded-xl h-full">
          <div className="relative">
            <Image
              src={userImg}
              alt="profile"
              className="w-[180px] h-[180px] rounded-full mx-auto"
               width={56} 
                height={56} 
            />
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
            />
            {/* <button
              onClick={onButtonClick}
              className="absolute bottom-2 right-[35%] hidden lg:block"
            >
              <span className="w-[30px] h-[30px] p-1 rounded-full bg-Neutral-2 flex items-center justify-center">
                <span className="material-symbols-outlined w-6 h-6 text-Neutral-8">
                  add_photo_alternate
                </span>
              </span>
            </button> */}
          </div>
          <h4 className="text-white text-2xl font-semibold leading-[31px] text-center mt-5">
           {formData.firstName} {formData.last_Name}
          </h4>
          {/* <span className="text-sm text-white leading-[21px] text-center mt-2 block">
            Amet minim Developer
          </span> */}
          <hr className="my-5 border-Neutral-10" />
        
        </div>
        <div className="bg-Primary-3 p-4 lg:px-7 lg:py-6 rounded-xl w-full h-full mt-6 lg:mt-0">
              <Toaster position='top-center' />
          <Tab.Group>
            <Tab.List className="flex flex-wrap gap-2 xl:gap-10 mb-3 xl:mb-8">
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={
                      selected
                        ? "text-Neutral-8 text-base font-semibold leading-[21px] px-2 py-3 outline-none border-b-2 border-Neutral-8"
                        : " text-white text-base font-semibold leading-[21px] px-2 py-3 outline-none"
                    }
                  >
                    Profile
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={
                      selected
                        ? "text-Neutral-8 text-base font-semibold leading-[21px] px-2 py-3 outline-none border-b-2 border-Neutral-8"
                        : " text-white text-base font-semibold leading-[21px] px-2 py-3 outline-none"
                    }
                  >
                    Change Password
                  </button>
                )}
              </Tab>
              {/* <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={
                      selected
                        ? "text-Neutral-8 text-base font-semibold leading-[21px] px-2 py-3 outline-none border-b-2 border-Neutral-8"
                        : " text-white text-base font-semibold leading-[21px] px-2 py-3 outline-none"
                    }
                  >
                    Biometrics Setting
                  </button>
                )}
              </Tab> */}
            
            </Tab.List>
             <Tab.Panels>
               <Tab.Panel>
                  <form onSubmit={handleSubmit}>
                         
                      <div className="form-control w-full mb-4">
                       <label className="label">
                         <span className="text-base text-Neutral-6 font-semibold mb-1 lg:mb-3">First Name</span>
                       </label>
                       <input
                         type="text"
                         name="firstName"
                         value={formData.firstName}
                         onChange={handleChange}
                         placeholder="Enter First Name..."
                         className="w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10"
                         
                       />
                     </div>
               
                     <div className="form-control w-full mb-4">
                       <label className="label">
                         <span className="text-base text-Neutral-6 font-semibold mb-1 lg:mb-3">Last Name</span>
                       </label>
                       <input
                         type="text"
                         name="last_Name"
                         value={formData.last_Name}
                         onChange={handleChange}
                         placeholder="Enter Last Name..."
                         className="w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10"
                         
                       />
                     </div>
               
                     <div className="form-control w-full mb-4">
                       <label className="label">
                         <span className="text-base text-Neutral-6 font-semibold mb-1 lg:mb-3">Username</span>
                       </label>
                       <input
                         type="text"
                         name="Username"
                         value={formData.Username}
                         onChange={handleChange}
                         placeholder="Enter Username..."
                         className="w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10"
                         
                       />
                     </div>
               
                     <div className="form-control w-full mb-4">
                       <label className="label">
                         <span className="text-base text-Neutral-6 font-semibold mb-1 lg:mb-3">Email</span>
                       </label>
                       <input
                         type="email"
                         name="email"
                         value={formData.email}
                         onChange={handleChange}
                         placeholder="Enter Email..."
                         className="w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10"
                       />
                     </div>
               
                     <div className="form-control w-full mb-4">
                       <label className="label">
                         <span className="text-base text-Neutral-6 font-semibold mb-1 lg:mb-3">Phone</span>
                       </label>
                       <input
                         type="text"
                         name="Phone"
                         value={formData.Phone}
                         onChange={handleChange}
                         placeholder="Enter Phone..."
                         className="w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10"
                       />
                     </div>
               
                     <div className="form-control w-full mb-4">
                       <label className="label">
                         <span className="text-base text-Neutral-6 font-semibold mb-1 lg:mb-3">Country</span>
                       </label>
                       <input
                         type="text"
                         name="country"
                         value={formData.country}
                         onChange={handleChange}
                         placeholder="Enter Country..."
                         className="w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10"
                         
                       />
                     </div>
               
               
                     {/* 
                     <div className="form-control w-full mb-4">
                       <label className="label">
                         <span className="text-base text-Neutral-6 font-semibold mb-1 lg:mb-3">Refer</span>
                       </label>
                       <input
                         type="text"
                         name="refer"
                         value={formData.refer}
                         onChange={handleChange}
                         placeholder="Enter Refer..."
                         className="w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10"
                       />
                     </div> */}
               
                     <div className="form-control w-full mb-4">
                       <label className="label">
                         <span className="text-base text-Neutral-6 font-semibold mb-1 lg:mb-3">Plan</span>
                       </label>
                       <input
                         type="text"
                         name="Plan"
                         value={formData.Plan}
                         onChange={handleChange}
                         placeholder="Enter Plan..."
                         className="w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10"
                         
                       />
                     </div>
               
                     <div className="form-control w-full mb-4">
                       <label className="label">
                         <span className="text-base text-Neutral-6 font-semibold mb-1 lg:mb-3">Created At</span>
                       </label>
                       <input
                         type="text"
                         name="createdAt"
                         value={formData.createdAt}
                         onChange={handleChange}
                         placeholder="Enter Created At..."
                         className="w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10"
                         disabled
                       />
                     </div>
               
                     <div className="form-control w-full mb-4">
                       <label className="label">
                         <span className="text-base text-Neutral-6 font-semibold mb-1 lg:mb-3">User ID</span>
                       </label>
                       <input
                         type="text"
                         name="userid"
                         value={formData.userid}
                         onChange={handleChange}
                         placeholder="Enter User ID..."
                         className="w-full px-2 py-[10px] outline-none rounded bg-Primary-3 border border-Neutral-10"
                         disabled
                       />
                     </div>
               
                      <button type='submit' className='mt-4 px-4 py-2 text-white font-semibold leading-[18px] border border-Neutral-8 rounded-lg hover:bg-Neutral-8 w-full'>
                            submit
                           </button>
                   </form>
              </Tab.Panel>
              <Tab.Panel>
             <form onSubmit={submitPasswordUpdate}>
                <Toaster position='top-center' />
                  <div className="xl:flex block gap-[60px] mb-2 lg:mb-6">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="text-base text-Neutral-6">Current Password</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          placeholder="Old Password"
                          className="px-2 py-[10px] rounded w-full bg-Primary-3 text-Neutral-6 border border-Neutral-10 outline-none"
                        />
                        <label
                          onClick={toggleCurrentPassword}
                          className="text-Neutral-1 absolute right-[3%] top-3 cursor-pointer"
                        >
                          {showCurrentPassword ? (
                            <span className="material-symbols-outlined">visibility_off</span>
                          ) : (
                            <span className="material-symbols-outlined">visibility</span>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="text-base text-Neutral-6">Enter New Password</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          placeholder="New Password"
                          className="px-2 py-[10px] rounded w-full bg-Primary-3 text-Neutral-6 border border-Neutral-10 outline-none"
                        />
                        <label
                          onClick={toggleNewPassword}
                          className="text-Neutral-1 absolute right-[3%] top-3 cursor-pointer"
                        >
                          {showNewPassword ? (
                            <span className="material-symbols-outlined">visibility_off</span>
                          ) : (
                            <span className="material-symbols-outlined">visibility</span>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="xl:flex block gap-[60px] mb-2 lg:mb-6">
                    <div className="form-control w-full xl:w-1/2">
                      <label className="label">
                        <span className="text-base text-Neutral-6">Confirm New Password</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmNewPassword"
                          value={passwordData.confirmNewPassword}
                          onChange={handlePasswordChange}
                          placeholder="Confirm Password"
                          className="px-2 py-[10px] rounded w-full bg-Primary-3 text-Neutral-6 border border-Neutral-10 outline-none"
                        />
                        <label
                          onClick={toggleConfirmPassword}
                          className="text-Neutral-1 absolute right-[3%] top-3 cursor-pointer"
                        >
                          {showConfirmPassword ? (
                            <span className="material-symbols-outlined">visibility_off</span>
                          ) : (
                            <span className="material-symbols-outlined">visibility</span>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="w-1/2 relative mt-3 xl:mt-0">
                      <button
                        type="submit"
                        className="px-4 py-2 text-[#F8FAFC] text-xs bg-gradient-to-r from-[#00bdff] to-[#00bdff] rounded xl:absolute xl:bottom-0"
                      >
                        Update Password
                      </button>
                    </div>
                  </div>
            </form>

              </Tab.Panel>
              <Tab.Panel>
               {/* <BiometricsComponent /> */}
              </Tab.Panel>
           
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </div>
  );
};

export default Settings;
