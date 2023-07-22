import { Spinner } from "flowbite-react";
import { useSession } from "next-auth/react";
import { Dashboard } from "~/app/Dashboard";

export default function Home() {
  const { status } = useSession();

  return (
    <>
      {status == "loading" && (
        <Spinner aria-label="Extra large spinner example" size="xl" />
      )}
      {status == "authenticated" && <Dashboard />}
      {status == "unauthenticated" && (
        <>
          <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
            Intermittent Fasting Tracker
          </h1>
        </>
      )}
    </>
  );
}
