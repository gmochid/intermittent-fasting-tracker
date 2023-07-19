import { useSession } from "next-auth/react";
import { Activity } from "./Activity";
import { InputFasting } from "./InputFasting";

export const Dashboard = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Intermittent Fasting Tracker
      </h1>
      <h2 className="pb-4 text-xl text-gray-600">
        Good luck on your fasting journey {sessionData?.user.name}!
      </h2>

      <InputFasting />

      {/* <Statistic /> */}
      <Activity />
    </>
  );
};
