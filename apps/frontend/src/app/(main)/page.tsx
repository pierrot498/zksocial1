import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Welcome to spermify</h1>

      <Link href="/messages">Messages</Link>
    </main>
  );
}
