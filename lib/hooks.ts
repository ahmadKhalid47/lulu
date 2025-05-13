"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/store";

export function useAuth(requiredRole?: "user" | "admin") {
  const router = useRouter();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    if ((requiredRole && user?.role !== requiredRole) || isAuthenticated) {
      if (user?.role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/user");
      }
    }
  }, [isAuthenticated, requiredRole, router, user]);

  return { user, isAuthenticated };
}
