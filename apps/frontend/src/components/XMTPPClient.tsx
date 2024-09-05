"use client";
import { useClient } from "@xmtp/react-sdk";
import { BrowserProvider } from "ethers";
import { useCallback, useEffect, useState } from "react";

export const CreateClient = () => {
  const { client, error, isLoading, initialize } = useClient();

  const [signer, setSigner] = useState<any | null>(null);

  useEffect(() => {
    const connectWallet = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          await window.ethereum?.request({ method: "eth_requestAccounts" });
          const provider = new BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          setSigner(signer);
        } catch (error) {
          console.error("Failed to connect to MetaMask", error);
        }
      }
    };

    connectWallet();
  }, []);

  const handleConnect = useCallback(async () => {
    const options = {
      persistConversations: false,
      env: "dev",
    } as const;
    await initialize({ options, signer });
  }, [initialize, signer]);

  if (error) {
    return "An error occurred while initializing the client";
  }

  if (isLoading) {
    return "Awaiting signatures...";
  }

  if (!client) {
    return (
      <button type="button" onClick={handleConnect} className="font-bold">
        Connect to XMTP
      </button>
    );
  }

  return "Connected to XMTP";
};
