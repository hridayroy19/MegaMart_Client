"use client";
import React, { useEffect, useState } from "react";

const Topbar = () => {
  // JSON data embedded
  const countdownData = {
    days: 5,
    hours: 12,
    minutes: 30,
    seconds: 45,
  };

  const [countdown, setCountdown] = useState({ ...countdownData });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              } else {
                // Countdown finished
                clearInterval(timer);
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format numbers with leading zeros
  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="bg-primary">
      <div
        className={`w-full text-background max-content-width text-sm transition-all duration-300 overflow-hidden`}
      >
        <div className="w-full px-2 py-1.5 mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="hidden lg:flex text-lg items-center gap-1">
              🌼 <span className="font-semibold">New Spring offer</span>
            </span>

            {/* Countdown */}
            <div className="hidden md:flex gap-3 text-[16px] ml-4">
              <span>
                <span className="font-bold">
                  {formatNumber(countdown.days)}
                </span>{" "}
                Day
              </span>
              <span>
                <span className="font-bold">
                  {formatNumber(countdown.hours)}
                </span>{" "}
                Hou
              </span>
              <span>
                <span className="font-bold">
                  {formatNumber(countdown.minutes)}
                </span>{" "}
                Min
              </span>
              <span>
                <span className="font-bold">
                  {formatNumber(countdown.seconds)}
                </span>{" "}
                Sec
              </span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="text-[16px] hover:text-foreground">
              🚚 Track your order
            </button>

            <div className="flex gap-4">
              <select className="outline-none">
                <option className="text-foreground">Bangla</option>
                <option className="text-foreground">English</option>
              </select>

              <select className="bg-transparent outline-none">
                <option className="text-foreground">BDT</option>
                <option className="text-foreground">USD</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
