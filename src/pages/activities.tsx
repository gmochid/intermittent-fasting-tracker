import { ActivityDuration } from "~/app/Dashboard/Activity";
import { api } from "~/utils/api";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export default function Activities() {
  const { data } = api.fastingLog.getAll.useQuery();
  return (
    <div className="mt-6 flex flex-col">
      <div className="flex bg-gray-50 py-2">
        <div className="flex-1 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white">
          Detail
        </div>
        <div className="flex-1 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white">
          Duration
        </div>
      </div>
      <div>
        {data?.map((log, index) => {
          const duration = dayjs.duration(dayjs(log.endAt).diff(log.startAt));
          return (
            <div key={index} className="flex">
              <div className="flex-1 whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                <ActivityDuration log={log} alwaysShowDate />
              </div>
              <div className="flex-1 whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                {log.endAt &&
                  `${Math.round(
                    duration.asHours()
                  )} hours ${duration.minutes()} minutes`}
                {!log.endAt && "NOT DONE"}
              </div>
            </div>
          );
        })}
      </div>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
        <tbody className="bg-white dark:bg-gray-800"></tbody>
      </table>
    </div>
  );
}
