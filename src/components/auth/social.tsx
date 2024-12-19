"use client";

import { signIn } from "next-auth/react";
import { SiKeycloak } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function Social() {
  const onClick = (provider: "github" | "keycloak") => {
    console.log("Signing in with", provider);
    signIn(provider, { callbackUrl: "/" });
  };
  return (
    <div className="flex w-full gap-x-2 items-center justify-center">
      <Button
        variant="outline"
        className="w-full"
        size="lg"
        onClick={() => {
          onClick("keycloak");
        }}
      >
        <SiKeycloak className="w-5 h-5" />
      </Button>
      <Button
        variant="outline"
        className="w-full"
        size="lg"
        onClick={() => {
          onClick("github");
        }}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
}
