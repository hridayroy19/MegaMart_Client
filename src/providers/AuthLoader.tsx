"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { setUser, logoutUser } from "@/redux/features/auth/authSlice";

export default function AuthLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  const [isMounted, setIsMounted] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setHasToken(!!localStorage.getItem("authToken"));
    setIsMounted(true);
  }, []);

  const {
    data: userData,
    isSuccess,
    isError,
    isLoading,
  } = useGetMeQuery(undefined, {
    skip: !isMounted || !hasToken,
  });

  useEffect(() => {
    if (isSuccess && userData) {
      dispatch(setUser({ user: userData }));
    } else if (isError) {
      localStorage.removeItem("authToken");
      dispatch(logoutUser());
    }
  }, [isSuccess, userData, isError, dispatch]);
  if (isMounted && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}
