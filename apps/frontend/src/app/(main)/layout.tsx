import { CreateClient } from "@/components/XMTPPClient";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <div className="flex justify-start bg-muted/40  border-b p-4 items-center gap-6">
        <p className="text-2xl font-semibold">Spermify 👼</p>
        <Link href="/messages">Messages</Link>
        <Link href="/matching">Matching</Link>
        <CreateClient />
      </div>
      <div className="h-[calc(100vh-65px)]">{children}</div>
    </div>
  );
}
