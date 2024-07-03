"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Button from "../atoms/button";

export default function Navbar() {
  const { data } = useSession();
  const { user } = data || {};

  return (
    <nav className="w-full h-max fixed top-0 z-20 flex justify-between items-center p-4 bg-black">
      <div className="w-max">
        <h1 className="text-[1.2rem] font-semibold capitalize">
          Hallo, {user?.name}
        </h1>
        <p className="text-[.9rem] text-gray-300 font-semibold">
          Selamat datang di, <span className="text-yellow-500">MyBook</span>
        </p>
      </div>
      <Button
        teks="Keluar"
        type="button"
        color="red"
        size="small"
        func={() => signOut()}
      />
    </nav>
  );
}
