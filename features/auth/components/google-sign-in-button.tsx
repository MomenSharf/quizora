"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

interface GoogleSignInButtonProps {
  disabled?: boolean;
}

export function GoogleSignInButton({
  disabled = false,
}: GoogleSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    setIsLoading(true);

    try {
      await signIn("google", {
        callbackUrl: "/",
      });
    } catch {
      setIsLoading(false);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="h-11 w-full rounded-xl"
      disabled={disabled || isLoading}
      onClick={handleSignIn}
    >
      <Icons.google
        className={`size-4 ${isLoading ? "animate-spin" : ""}`}
      />

      {isLoading ? "Connecting to Google..." : "Continue with Google"}
    </Button>
  );
}