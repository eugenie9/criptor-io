"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";

export default function AuthButton() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        setIsAuthenticated(response.ok);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      setIsAuthenticated(false);
      router.push("/auth/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return null;
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center space-x-2">
        <Button href="/user" variant="ghost" size="sm">
          Dashboard
        </Button>
        <Button onClick={handleLogout} variant="outline" size="sm">
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Button href="/auth/login" variant="ghost" size="sm">
        Sign In
      </Button>
      <Button href="/auth/register" variant="primary" size="sm">
        Sign Up
      </Button>
    </div>
  );
}

