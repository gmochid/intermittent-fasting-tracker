"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: sessionData } = useSession();
  return (
    <header className="z-40 flex h-16 w-full items-center justify-between">
      <div className="ml-6 block">
        <Link href="/" className="text-xl">
          Tracker
        </Link>
      </div>
      <div className="relative z-20 flex h-full flex-col justify-end px-3 md:w-full">
        {/* Profile */}
        <div className="relative flex w-full items-center justify-end space-x-4 p-1">
          {!!sessionData && (
            <>
              <span className="h-8 w-1 rounded-lg bg-gray-200"></span>
              <a href="#" className="relative block">
                <img
                  alt="profil"
                  src={sessionData.user.image ?? ""}
                  className="mx-auto h-10 w-10 rounded-full object-cover "
                />
              </a>
              <Link href="/profile">
                <button className="text-md flex items-center text-gray-500 dark:text-white">
                  {sessionData.user.name?.replace(/ .*/, "")}
                </button>
              </Link>
            </>
          )}

          {/* Sign In / Sign Out Button */}
          <button
            className="rounded-full bg-white/10 px-5 py-3 font-semibold text-gray-400 no-underline transition hover:bg-white/20 dark:text-white"
            onClick={sessionData ? () => void signOut() : () => void signIn()}
          >
            {sessionData ? "Sign out" : "Sign in"}
          </button>
        </div>
      </div>
    </header>
  );
}
