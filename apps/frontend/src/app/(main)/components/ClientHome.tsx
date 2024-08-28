"use client";

import { useState } from "react";
import Link from "next/link";
import ProfileOnboarding from "./ProfileOnboarding";
import TinderCard from "./TinderCard";

interface ProfileData {
  name: string;
  age: string;
  bio: string;
  image: string;
}

export default function ClientHome() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  const handleOnboardingComplete = (profileData: ProfileData) => {
    setProfile(profileData);
    setShowOnboarding(false);
  };

  return (
    <main className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-200 to-pink-400 p-4">
      {showOnboarding ? (
        <ProfileOnboarding onComplete={handleOnboardingComplete} />
      ) : profile ? (
        <div className="w-full max-w-md">
          <TinderCard card={profile} />
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Profile Complete!</h2>
            <Link href="/matching" className="bg-white text-pink-500 py-3 px-6 rounded-full text-xl font-semibold hover:bg-pink-100 transition duration-300">
              Start Matching
            </Link>
          </div>
        </div>
      ) : null}
    </main>
  );
}