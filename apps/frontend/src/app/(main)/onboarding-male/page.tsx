"use client";

import { useAccount } from "wagmi";
import ProfileOnboarding from "../components/ProfileOnboarding";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function OnboardingMalePage() {
  const { address } = useAccount();
  const router = useRouter();
  return (
    <div>
      <ProfileOnboarding
        onComplete={(profile) => {
          console.log("profile", profile);
          const userId = localStorage.getItem("user_id_" + address);
          if (!userId) {
            return router.push("/login-male");
          }
          axiosInstance
            .post("/profile", {
              ...profile,
              userId,
            })
            .then((res) => {
              router.push("/profile");
            });
        }}
      />
    </div>
  );
}
