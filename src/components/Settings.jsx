/* eslint-disable no-unused-vars */
import React, { useEffect, useState, Fragment } from "react";
import { Tab } from "@headlessui/react";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails, clearUserState } from "../redux/slices/fetchUserSlice";
import api from "../redux/slices/api";
import toast, { Toaster } from "react-hot-toast";
import userProfile from "../../public/images/userProfile.svg";

const Settings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.fetchUserDetails);

  const [formData, setFormData] = useState({
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
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [currentPassword, setCurrentPassword] = useState("");

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem("uId");
    if (storedUserId) dispatch(fetchUserDetails(storedUserId));
    return () => dispatch(clearUserState());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const updatedForm = { ...formData };
      Object.keys(updatedForm).forEach((key) => {
        updatedForm[key] = user[key] || "";
      });
      setFormData(updatedForm);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleVisibility = (type) => {
    setShowPassword((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Updating profile...");
    try {
      await api.put(`edituserByUser/${formData.id}`, formData);
      toast.success("Profile updated!", { id: loading });
    } catch {
      toast.error("Failed to update profile.", { id: loading });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const { newPassword, confirmNewPassword } = passwordData;
    if (!currentPassword || !newPassword || !confirmNewPassword)
      return toast.error("All password fields are required");

    if (newPassword !== confirmNewPassword)
      return toast.error("Passwords do not match");

    const loading = toast.loading("Updating password...");
    try {
      await api.put(`editpassByUser/${formData.id}`, {
        currentPassword,
        newPassword,
        confirmNewPassword,
      });
      toast.success("Password updated!", { id: loading });
      setCurrentPassword("");
      setPasswordData({ newPassword: "", confirmNewPassword: "" });
    } catch {
      toast.error("Failed to update password.", { id: loading });
    }
  };

  return (
    <div className="min-h-screen bg-[#050A1D] p-6 text-white">
      <Toaster position="top-center" />
      <div className="bg-[#0A132A] rounded-xl p-6 max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <img
            src={user?.img || userProfile}
            alt="Profile"
            className="mx-auto rounded-full w-28 h-28 border-4 border-emerald-500"
          />
          <h2 className="text-2xl font-semibold mt-3">
            {formData.firstName} {formData.last_Name}
          </h2>
        </div>

        <Tab.Group>
          <Tab.List className="flex gap-6 border-b border-slate-600 pb-2 mb-6">
            {["Profile", "Change Password"].map((tab) => (
              <Tab as={Fragment} key={tab}>
                {({ selected }) => (
                  <button
                    className={`text-sm font-medium pb-1 border-b-2 transition duration-200 ${
                      selected
                        ? "border-emerald-400 text-emerald-400"
                        : "border-transparent hover:border-emerald-500 hover:text-emerald-300"
                    }`}
                  >
                    {tab}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            {/* PROFILE TAB */}
            <Tab.Panel>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                {["firstName", "last_Name", "Username", "email", "Phone", "country"].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
                    <input
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-xl bg-[#0F1C3F] border border-slate-700 hover:border-emerald-500 focus:border-emerald-400 outline-none"
                      placeholder={`Enter ${field}...`}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium mb-1">Plan</label>
                  <input
                    name="Plan"
                    value={formData.Plan}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl bg-[#0F1C3F] border border-slate-700 hover:border-emerald-500 focus:border-emerald-400 outline-none"
                    placeholder="Enter Plan..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Created At</label>
                  <input
                    name="createdAt"
                    value={formData.createdAt}
                    readOnly
                    className="w-full px-4 py-2 rounded-xl bg-[#0F1C3F] border border-slate-700 text-gray-400 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">User ID</label>
                  <input
                    name="userid"
                    value={formData.userid}
                    readOnly
                    className="w-full px-4 py-2 rounded-xl bg-[#0F1C3F] border border-slate-700 text-gray-400 cursor-not-allowed"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white px-4 py-2 rounded-xl hover:opacity-90"
                >
                  Update Profile
                </button>
              </form>
            </Tab.Panel>

            {/* PASSWORD TAB */}
            <Tab.Panel>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                {/* CURRENT PASSWORD */}
                <div className="relative">
                  <label className="block mb-1 text-sm font-medium">Old Password</label>
                  <input
                    type={showPassword.current ? "text" : "password"}
                    name="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    autoComplete="new-password"
                    placeholder="Old Password"
                    className="w-full px-4 py-2 rounded-xl bg-[#0F1C3F] border border-slate-700 hover:border-emerald-500 focus:border-emerald-400 outline-none"
                  />
                  <span
                    onClick={() => toggleVisibility("current")}
                    className="absolute right-3 top-9 text-gray-400 cursor-pointer"
                  >
                    {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                </div>

                {/* NEW + CONFIRM PASSWORD */}
                {[
                  ["newPassword", "New Password", "new"],
                  ["confirmNewPassword", "Confirm Password", "confirm"],
                ].map(([name, label, type]) => (
                  <div className="relative" key={name}>
                    <label className="block mb-1 text-sm font-medium">{label}</label>
                    <input
                      type={showPassword[type] ? "text" : "password"}
                      name={name}
                      value={passwordData[name]}
                      onChange={handlePasswordChange}
                      autoComplete="new-password"
                      placeholder={label}
                      className="w-full px-4 py-2 rounded-xl bg-[#0F1C3F] border border-slate-700 hover:border-emerald-500 focus:border-emerald-400 outline-none"
                    />
                    <span
                      onClick={() => toggleVisibility(type)}
                      className="absolute right-3 top-9 text-gray-400 cursor-pointer"
                    >
                      {showPassword[type] ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                  </div>
                ))}

                <button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white px-4 py-2 rounded-xl hover:opacity-90"
                >
                  Update Password
                </button>
              </form>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Settings;
