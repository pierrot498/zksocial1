import React from "react";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-full">
      <div>
        <Link href="/login-male" className="text-2xl font-semibold text-blue-500 p-3 border border-blue-500 rounded-md">
          Login Male
        </Link>
        <br />
        <br />
        <br />
        <br />
        <Link
          href="/login-female"
          className="text-2xl font-semibold text-rose-500 p-3 border border-rose-500 rounded-md"
        >
          Login Female
        </Link>
      </div>
    </div>
  );
}
