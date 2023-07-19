import { api } from "~/utils/api";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export const Activity = () => {
  const { data, error } = api.fastingLog.getAll.useQuery();
  return (
    <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
      {/* Card header */}
      <div className="items-center justify-between lg:flex">
        <div className="mb-4 lg:mb-0">
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            Fasting Activity
          </h3>
          <span className="text-base font-normal text-gray-500 dark:text-gray-400">
            Be proud of your achievement
          </span>
        </div>
      </div>
      <div className="mt-6 flex flex-col">
        <div className="flex bg-gray-50 py-2">
          <div className="flex-1 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white">
            Date
          </div>
          <div className="flex-1 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white">
            Duration
          </div>
        </div>
        <div>
          {data?.map((log) => {
            const duration = dayjs.duration(dayjs(log.endAt).diff(log.startAt));
            return (
              <div key={log.id} className="flex">
                <div className="flex-1 whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                  <div>{dayjs(log.startAt).format(" DD MMMM YYYY")}</div>
                  <div>
                    {dayjs(log.startAt).format("HH:mm")} -{" "}
                    {log.endAt
                      ? dayjs(log.endAt).format("HH:mm")
                      : "Unfinished"}
                  </div>
                </div>
                <div className="flex-1 whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                  {log.endAt &&
                    `${duration.hours()} hours ${duration.minutes()} minutes`}
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
    </div>
  );
};
