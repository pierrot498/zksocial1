"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProfileOnboarding from "./ProfileOnboarding";
import TinderCard from "./TinderCard";
import { createKintoSDK, KintoAccountInfo } from 'kinto-web-sdk';

const APP_ADDRESS = '0x10E0436902aE99A04E81Cb6e4463331363FEcD71'; // Replace with your actual Kinto app address
const kintoSDK = createKintoSDK(APP_ADDRESS);

interface ProfileData {
  name: string;
  age: string;
  bio: string;
  image: string;
}

export default function ClientHome() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [kintoAccount, setKintoAccount] = useState<KintoAccountInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connectKinto = async () => {
    try {
      const accountInfo = await kintoSDK.connect();
      setKintoAccount(accountInfo);
      if (accountInfo.exists) {
        // User has a Kinto account, proceed to check for profile
        const storedProfile = localStorage.getItem("userProfile");
        if (storedProfile) {
          setProfile(JSON.parse(storedProfile));
        } else {
          setShowOnboarding(true);
        }
      } else {
        // User needs to create a Kinto account
        setShowOnboarding(true);
      }
    } catch (error) {
      console.error("Failed to connect to Kinto:", error);
      setError("Failed to connect to Kinto. Please try again.");
    }
  };

  const handleOnboardingComplete = (profileData: ProfileData) => {
    setProfile(profileData);
    setShowOnboarding(false);
    localStorage.setItem("userProfile", JSON.stringify(profileData));
  };

  const createKintoWallet = async () => {
    try {
      await kintoSDK.createNewWallet({ openPopup: true });
      // After wallet creation, you might want to refresh the connection
      const accountInfo = await kintoSDK.connect({ openPopup: true });
      setKintoAccount(accountInfo);
    } catch (error) {
      console.error("Failed to create Kinto wallet:", error);
      setError("Failed to create Kinto wallet. Please try again.");
    }
  };

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-200 to-pink-400 p-4">
        <p className="text-white text-xl mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="bg-white text-pink-500 py-2 px-4 rounded-full">
          Try Again
        </button>
      </div>
    );
  }

  if (!kintoAccount) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-200 to-pink-400 p-4">
        <h2 className="text-white text-2xl mb-4">Welcome to Spermify!</h2>
        <p className="text-white text-xl mb-4">To get started, you need to connect to Kinto.</p>
        <button onClick={connectKinto} className="bg-white text-pink-500 py-3 px-6 rounded-full text-xl font-semibold hover:bg-pink-100 transition duration-300">
          Connect to Kinto
        </button>
      </div>
    );
  }

  if (!kintoAccount.exists) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-200 to-pink-400 p-4">
        <h2 className="text-white text-2xl mb-4">Welcome to Spermify!</h2>
        <p className="text-white text-xl mb-4">To get started, you need to create a Kinto wallet.</p>
        <button onClick={createKintoWallet} className="bg-white text-pink-500 py-3 px-6 rounded-full text-xl font-semibold hover:bg-pink-100 transition duration-300">
          Create Kinto Wallet
        </button>
      </div>
    );
  }

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