"use client";
import { CreateClient } from "@/components/XMTPPClient";
import { cn } from "@/lib/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { address, isDisconnected } = useAccount();
  const router = useRouter();
  useEffect(() => {
    if (address && address !== localStorage.getItem("user_address")) {
      router.push("/login");
    }
    if (isDisconnected) {
      router.push("/login");
    }
  }, [address, router, isDisconnected]);

  const genre = localStorage.getItem("user_gender");

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <div className="flex justify-start bg-muted/40  border-b p-4 items-center gap-6">
        <p className="text-2xl font-semibold">Spermify 👼</p>
        <Link href="/messages">Messages</Link>
        {genre === "female" && <Link href="/matching">Matching</Link>}
        <CreateClient />
        <p className={cn(genre === "female" ? "text-rose-500" : "text-blue-500")}>Logged as : {genre}</p>
        <ConnectButton />
      </div>
      <div className="h-[calc(100vh-65px)]">{children}</div>
    </div>
  );
}
