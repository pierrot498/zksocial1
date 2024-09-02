"use client";
import { XMTPProvider } from "@xmtp/react-sdk";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <XMTPProvider>{children}</XMTPProvider>;
}
