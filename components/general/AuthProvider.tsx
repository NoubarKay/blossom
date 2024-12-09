"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2Icon } from "lucide-react";

const unauthorizedPaths = [
  "/login",
  "/account/forgotpassword",
  "/account/resetpassword",
];

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        setIsAuthenticated(!!parsedToken); // Update authentication state based on token
      } catch (error) {
        console.error("Invalid token in localStorage:", error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }

    // Redirect if unauthorized and trying to access protected paths
    if (
      isAuthenticated === false &&
      !unauthorizedPaths.some((path) => pathname.toLowerCase().includes(path))
    ) {
      router.push("/login");
    }
  }, [pathname, router, isAuthenticated]);

  // Loader until authentication is determined
  if (isAuthenticated === null) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2Icon className="animate-spin text-black h-10 w-10" />
      </div>
    );
  }

  // Render children based on authentication and path
  return <div className="container-fluid g-0">{children}</div>;
}
