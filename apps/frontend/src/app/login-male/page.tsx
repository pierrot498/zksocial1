"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axios";

export default function LoginMale() {
  const { isConnected, address } = useAccount();
  const { signMessage } = useSignMessage();
  const router = useRouter();

  useEffect(() => {
    const authenticate = async (signature: string) => {
      axiosInstance
        .post("/authenticate", {
          signature,
          walletAddress: address,
          gender: "male",
        })
        .then((res) => {
          console.log("res", res);
          localStorage.setItem("user_id_" + address, res.data.user.id);
          if (res.data.isOnboardingDone) {
            router.push("/profile-male");
          } else {
            router.push("/onboarding-male");
          }
        });
    };

    const sign = async () => {
      if (isConnected && address) {
        const storedSignature = localStorage.getItem("signature_" + address);
        console.log("storedSignature", storedSignature, typeof storedSignature);

        if (storedSignature) {
          console.log("Using stored signature:", storedSignature);
          authenticate(storedSignature);
        } else {
          await signMessage(
            { message: "Sign this message to connect with Kinto." },
            {
              onSuccess: (data) => {
                console.log("New signature:", data);
                localStorage.setItem("signature_" + address, data);
                authenticate(data);
              },
              onError: (error) => {
                console.error("Error signing message:", error);
              },
            }
          );
        }
      }
    };
    setTimeout(sign, 600);
  }, [address, isConnected, router, signMessage]);

  return (
    <div>
      <ConnectButton />
    </div>
  );
}
