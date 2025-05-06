"use client";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  clearNotifications,
} from "../../slices/fetchNotiSlice";
import { fetchUserDetails, clearUserState } from "../../slices/fetchUserSlice";
import { parse, formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector(
    (state) => state.notifications
  );
  const {
    user,
    status,
    error: userError,
  } = useSelector((state) => state.fetchUserDetails);
  const [visibleNotifications, setVisibleNotifications] = useState(10);
  const notificationRefs = useRef([]);

  useEffect(() => {
    dispatch(fetchNotifications());
    const storedUserId = localStorage.getItem("uId");
    if (storedUserId) {
      dispatch(fetchUserDetails(storedUserId));
    }
    return () => {
      dispatch(clearUserState());
    };
  }, [dispatch]);

  const handleSeeMore = () => {
    setVisibleNotifications((prev) => prev + 10);
  };

  const formatSentAt = (sentAt) => {
    try {
      // Parse the custom date format to a Date object
      const parsedDate = parse(sentAt, "dd-MM-yyyy hh:mm:ss aa", new Date());
      return formatDistanceToNow(parsedDate) + " ago";
    } catch (error) {
      return "Invalid date"; // Return a fallback in case of invalid date
    }
  };

  const scrollToNotification = (index) => {
    notificationRefs.current[index].scrollIntoView({ behavior: "smooth" });
  };
  const router = useRouter();
  useEffect(() => {
    if (
      user?.kyc === "" ||
      user?.kyc === null ||
      user?.kyc === "false" ||
      (user?.kyc === "pending" && user?.verifi === "false") ||
      user?.verifi === "" ||
      user?.verifi === null ||
      user?.verifi === "pending"
    ) {
      router.push("./kyc");
      // console.log(user?.kyc, user?.verifi)
    }
  }, [user, router]);
  return (
    <div className="bg-Primary-bg p-3 lg:p-6 min-h-screen">
      <section className="grid grid-cols-12">
        <div className="bg-Primary-3 p-4 lg:px-7 lg:py-6 rounded-xl col-span-12 xxl:col-span-11">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-white">
              notifications
            </span>
            <h4 className="text-base text-white font-bold leading-[24px]">
              Notifications
            </h4>
          </div>
          <p className="text-lg text-Neutral-6 leading-[27px] mb-6">
            Stay updated with all the important activities in your account.{" "}
          </p>

          {/* Notification Items */}
          <div>
            {notifications.slice(0, visibleNotifications).map((item, index) => (
              <div
                key={item.id}
                className="md:flex items-center justify-between border-Neutral-10 border-t"
                ref={(el) => (notificationRefs.current[index] = el)}
              >
                <div className="flex items-center gap-3 my-5 w-full md:w-[70%]">
                  <div>
                    <div>
                      <span className="text-white text-sm font-bold">
                        {item.messageHeader}
                      </span>
                      <p className="text-Neutral-6 text-sm ml-1">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-8">
                  <span className="text-Neutral-6 text-xs leading-[18px]">
                    {(() => {
                      let [datePart] = item.sent_at.split(" ");
                      let [day, month, year] = datePart.split("-");
                      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
                    })()}
                  </span>
                </div>
              </div>
            ))}

            {/* See More Button */}
            {visibleNotifications < notifications.length && (
              <button
                onClick={handleSeeMore}
                className="text-white bg-Neutral-2 px-4 py-2 rounded mt-4 block mx-auto"
              >
                See More
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Notifications;
