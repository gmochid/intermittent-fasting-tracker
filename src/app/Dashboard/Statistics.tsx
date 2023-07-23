import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { type User, type FastingLog } from "@prisma/client";
import { useEffect, useState } from "react";
dayjs.extend(duration);

interface StatisticProps extends React.HTMLProps<HTMLDivElement> {
  log: FastingLog;
  profile: User;
}

interface FastingTextProps extends React.HTMLProps<HTMLDivElement> {
  durationHour: number;
}

const FastingText = ({ durationHour }: FastingTextProps) => {
  if (durationHour < 3) {
    return (
      <div className="px-6 py-4">
        <div className="text-sm font-semibold">Blood Sugar Level Rises</div>
        <div className="text-xs">Your body start the digestion process</div>
      </div>
    );
  }
  if (durationHour < 6) {
    return (
      <div className="px-6 py-4">
        <div className="text-sm font-semibold">Blood Sugar Level Drops</div>
        <div className="text-xs">Your body start the digestion process</div>
      </div>
    );
  }
  if (durationHour < 9) {
    return (
      <div className="px-6 py-4">
        <div className="text-sm font-semibold">
          Blood Sugar Level Settles Down
        </div>
        <div className="text-xs">Your body start the digestion process</div>
      </div>
    );
  }
  if (durationHour < 11) {
    return (
      <div className="px-6 py-4">
        <div className="text-sm font-semibold">
          Blood Sugar Level Settles Down
        </div>
        <div className="text-xs">Your body start the digestion process</div>
      </div>
    );
  }
  if (durationHour < 14) {
    return (
      <div className="px-6 py-4">
        <div className="text-sm font-semibold">Fat Burning</div>
        <div className="text-xs">Your body start the digestion process</div>
      </div>
    );
  }
  if (durationHour < 16) {
    return (
      <div className="px-6 py-4">
        <div className="text-sm font-semibold">Ketosis</div>
        <div className="text-xs">Your body start the digestion process</div>
      </div>
    );
  }
  return (
    <div className="px-6 py-4">
      <div className="text-sm font-semibold">Autophagy</div>
      <div className="text-xs">Your body start the digestion process</div>
    </div>
  );
};

export const Statistic = ({ log, profile }: StatisticProps) => {
  const [duration, setDuration] = useState(
    dayjs.duration(dayjs(dayjs()).diff(log.startAt))
  );
  useEffect(() => {
    const interval = setInterval(
      () => setDuration(dayjs.duration(dayjs(dayjs()).diff(log.startAt))),
      10000
    );
    return () => {
      clearInterval(interval);
    };
  });

  const percentage =
    (duration.asMinutes() /
      dayjs.duration({ hours: profile.targetHours }).asMinutes()) *
    100;

  return (
    <div className="my-6 flex w-full flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
      <div className="w-full md:w-6/12">
        <div className="relative w-full overflow-hidden bg-white shadow-lg dark:bg-gray-700">
          <a className="block h-full w-full">
            <div className="flex items-center justify-between space-x-4 px-4 py-6">
              <div className="flex items-center">
                <p className="ml-2 border-b border-gray-200 text-sm font-semibold text-gray-700 dark:text-white">
                  Your fasting today
                </p>
              </div>
              <div className="mt-6 border-b border-gray-200 text-xl font-bold text-black dark:text-white md:mt-0">
                {`${Math.round(
                  duration.asHours()
                )} hours ${duration.minutes()} minutes`}
                <span className="text-xs text-gray-400">
                  {" "}
                  / {profile.targetHours} hours
                </span>
              </div>
            </div>
            <FastingText durationHour={duration.get("hours")} />
            <div className="h-3 w-full bg-gray-100">
              <div
                className="h-full bg-green-400 text-center text-xs text-white"
                style={{ width: `${percentage > 100 ? 100 : percentage}%` }}
              ></div>
            </div>
          </a>
        </div>
      </div>
      {/* <div className="flex w-full items-center space-x-4 md:w-1/2">
        <div className="w-1/2">
          <div className="relative w-full bg-white px-4 py-6 shadow-lg dark:bg-gray-700">
            <p className="text-2xl font-bold text-black dark:text-white">12</p>
            <p className="text-sm text-gray-400">Active projects</p>
          </div>
        </div>
        <div className="w-1/2">
          <div className="relative w-full bg-white px-4 py-6 shadow-lg dark:bg-gray-700">
            <p className="text-2xl font-bold text-black dark:text-white">
              $93.76
            </p>
            <p className="text-sm text-gray-400">Commission in approval</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};
