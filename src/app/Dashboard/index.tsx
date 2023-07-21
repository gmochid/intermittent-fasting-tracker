import { useSession } from "next-auth/react";
import { Activity } from "./Activity";
import { InputFasting } from "./InputFasting";
import { Statistic } from "./Statistics";
import { api } from "~/utils/api";

export const Dashboard = () => {
  const { data: sessionData } = useSession();
  const { data: latestFastingLog, isSuccess } =
    api.fastingLog.getLatest.useQuery();

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Intermittent Fasting Tracker
      </h1>
      <h2 className="pb-4 text-xl text-gray-600">
        Good luck on your fasting journey {sessionData?.user.name}!
      </h2>

      <InputFasting />
      {isSuccess && latestFastingLog && <Statistic log={latestFastingLog} />}
      <Activity />
    </>
  );
};
