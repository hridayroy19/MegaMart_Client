"use client";
import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#140042] border-solid"></div>
    </div>
  );
}
