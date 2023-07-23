import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { type PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  const { data: sessionData } = useSession();
  const { push } = useRouter();

  return (
    <>
      <Head>
        <title>Intermittent Fasting Tracker</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="flex items-start justify-between">
          <div className="flex w-full flex-col md:space-y-4">
            <header className="z-40 flex h-16 w-full items-center justify-between">
              <div className="ml-6 block lg:hidden"></div>
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
                      <button
                        className="text-md flex items-center text-gray-500 dark:text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          void push("/profile");
                        }}
                      >
                        {sessionData.user.name?.replace(/ .*/, "")}
                      </button>
                    </>
                  )}

                  {/* Sign In / Sign Out Button */}
                  <button
                    className="rounded-full bg-white/10 px-5 py-3 font-semibold text-gray-400 no-underline transition hover:bg-white/20 dark:text-white"
                    onClick={
                      sessionData ? () => void signOut() : () => void signIn()
                    }
                  >
                    {sessionData ? "Sign out" : "Sign in"}
                  </button>
                </div>
              </div>
            </header>

            <div className="h-screen overflow-auto px-4 pb-24 md:px-6">
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
