import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userProfile from "../../../public/images/userProfile.svg";
import { messages, profile } from "../../../public/data/TopbarData";
import Modal from "react-modal";
import { Menu, Transition } from "@headlessui/react";
import {
  fetchNotifications,
  clearNotifications,
} from "../../app/slices/fetchNotiSlice";
import {
  fetchUserDetails,
  clearUserState,
} from "../../app/slices/fetchUserSlice";
import { parse, formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";

const TopBar = ({ handleOpen }) => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notifications);
  const { user } = useSelector((state) => state.fetchUserDetails);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const openModal = () => setIsModalOpen(true);

  useEffect(() => {
    dispatch(fetchNotifications());
    const storedUserId = localStorage.getItem("uId");
    dispatch(fetchUserDetails(storedUserId));
  }, [dispatch]);

  useEffect(() => {
    if (user?.alert === "enabled") {
      openModal();
    }
    // Store the message conditionally based on user data
    setMessage(
      user?.SignalMessage ||
        "!Signal Fee Required. Please Contact Admin For More Details"
    );
  }, [user?.alert, user?.SignalMessage]);

  const formatSentAt = (sentAt) => {
    try {
      const parsedDate = new Date(sentAt); // Ensure it's a valid Date object
      return format(parsedDate, "yyyy-MM-dd"); // Output in YYYY-MM-DD format
    } catch (error) {
      return "Invalid date";
    }
  };

  const userImg = user?.img ? user?.img : userProfile;

  return (
    <div className="py-2 flex gap-2 items-center justify-between self-start z-[5] left-0 lg:ml-[260px] right-0 fixed bg-Neutral-2">
      <div className="flex items-center gap-2 py-2">
        <button
          onClick={handleOpen}
          className="lg:hidden text-white bg-Primary-bg flex items-center ml-4 p-1 rounded"
        >
          <span className="material-symbols-outlined cursor-pointer !text-3xl">
            menu
          </span>
        </button>
      </div>
      <div className="flex items-center gap-3 md:gap-5">
        {/* Notification dropdown menu */}
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-Primary-bg px-3 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative cursor-pointer">
            <span className="material-symbols-outlined text-white !text-3xl md:!text-[35px]">
              notifications
            </span>
            <span className="absolute h-3 w-3 rounded-full bg-Primary-2 flex justify-center items-center bottom-[11px] left-4 border border-white"></span>
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-300"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-200"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute -right-8 mt-4 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none identify-notification">
              <div className="px-1 py-1">
                <Menu.Item>
                  <div className="w-64 md:w-[500px] bg-Neutral-10 p-3 rounded-xl">
                    <h3 className="text-2xl text-white font-bold text-center">
                      Notifications
                    </h3>
                    <hr className="my-2 lg:my-3 border-Neutral-7" />
                    <div className="max-h-[300px] overflow-y-auto">
                      {notifications?.slice(0, 7).map((data) => (
                        <div
                          key={data.id}
                          className="flex items-center gap-3 py-2 duration-200 cursor-pointer hover:bg-Neutral-8 p-2 rounded"
                        >
                          <div>
                            <h5 className="font-bold text-base md:text-lg text-white leading-[27px]">
                              {data.messageHeader}
                            </h5>
                            <p className="text-Neutral-6 text-base leading-[24px]">
                              {data.content}
                            </p>
                            <p className="text-Neutral-6 text-xs leading-[18px]">
                              {(() => {
                                let [datePart] = data.sent_at.split(" ");
                                let [day, month, year] = datePart.split("-");
                                return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
                              })()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center mt-3">
                      <Link href="./notifications">
                        <span className="text-bg-Neutral-8 text-base font-semibold">
                          See More
                        </span>
                      </Link>
                    </div>
                  </div>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        {/* Profile dropdown menu */}
        <Menu
          as="div"
          className="relative inline-block text-left pr-3 md:pr-6 lg:pr-10 mt-1"
        >
          <Menu.Button>
            <span className="flex gap-2 items-center cursor-pointer">
              <span>
                <span className="w-12 h-12 md:w-[60px] md:h-[60px] rounded-full mt-1">
                  <Image
                    src={userImg}
                    alt="User"
                    className="rounded-full h-14 w-14"
                    width={56}
                    height={56}
                  />
                </span>
              </span>
              <span className="lg:flex items-center hidden">
                <span>
                  <span className="text-base text-white font-semibold block">
                    {user?.firstName} {user?.last_Name}
                  </span>
                  <span className="text-xs text-customGreen text-left block">
                    verified
                  </span>
                </span>
              </span>
            </span>
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-300"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-200"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                <Menu.Item>
                  <div className="w-52 bg-Neutral-10 p-3 rounded-xl">
                    <h5 className="mb-2 text-base ml-3 font-semibold text-white">
                      Welcome {user?.firstName} {user?.last_Name}
                    </h5>
                    {profile.map((data) => (
                      <div
                        key={data.id}
                        className="flex items-center gap-3 p-1 duration-200 cursor-pointer hover:bg-Neutral-8 rounded"
                      >
                        <Link
                          href={data.url}
                          className="flex items-center gap-2"
                        >
                          <span className="text-white !text-3xl">
                            {data.icon}
                          </span>
                          <p className="text-Neutral-6 text-base leading-[18px]">
                            {data.title}
                          </p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      {/* Non-closable Modal for Notifications */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {}} // Do nothing on close
        className="bg-Neutral-10 p-5 rounded-lg w-96 mx-auto mt-20 text-white outline-none"
        overlayClassName="bg-black bg-opacity-50 fixed inset-0 flex justify-center items-center"
      >
        <h3 className="text-2xl font-bold mb-4 text-center">Alert</h3>
        <div className="bg-Neutral-10 p-4 rounded-lg w-full max-w-lg mx-auto mt-1 text-white overflow-auto">
          <div className="p-3 rounded-lg mb-4">
            <p className="text-center break-words">{message}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TopBar;
