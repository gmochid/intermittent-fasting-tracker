import { useSession } from "next-auth/react";
import { Activity } from "./Activity";
import { InputFasting } from "./InputFasting";

export const Dashboard = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
        Good afternoon, {sessionData?.user.name}
      </h1>
      <h2 className="text-md pb-4 text-gray-400">
        Here is your fasting progress
      </h2>

      <InputFasting />

      {/* <Statistic /> */}
      <Activity />
    </>
  );
};
