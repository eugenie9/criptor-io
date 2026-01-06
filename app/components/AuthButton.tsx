"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { authClient } from "@/utils/auth-client";

export default function AuthButton() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login");
        },
      },
    });
  };

  if (isPending) {
    return null;
  }

  if (session?.user) {
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
