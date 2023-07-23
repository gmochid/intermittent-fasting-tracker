import { api } from "~/utils/api";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { type FastingLog } from "@prisma/client";
import { Button } from "flowbite-react";
dayjs.extend(duration);

interface ActivityDurationProps extends React.HTMLProps<HTMLDivElement> {
  log: FastingLog;
}

const ActivityDuration = ({ log }: ActivityDurationProps) => {
  if (!log.endAt) {
    return (
      <>
        <div>{dayjs(log.startAt).format("DD MMMM YYYY")}</div>
        <div>{`${dayjs(log.startAt).format("HH:mm")} - UNFINISHED`}</div>
      </>
    );
  }
  if (dayjs(log.endAt).isAfter(dayjs(log.startAt), "days")) {
    return (
      <>
        <div>{`${dayjs(log.startAt).format("DD MMMM YYYY HH:mm")} - `}</div>
        <div>{dayjs(log.endAt).format("DD MMMM YYYY HH:mm")}</div>
      </>
    );
  }
  return (
    <>
      <div>{dayjs(log.startAt).format("DD MMMM YYYY")}</div>
      <div>
        {`${dayjs(log.startAt).format("HH:mm")} - ${dayjs(log.endAt).format(
          "HH:mm"
        )}`}
      </div>
    </>
  );
};

export const Activity = () => {
  const { data } = api.fastingLog.getOneWeek.useQuery();
  return (
    <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
      <div className="items-center justify-between lg:flex">
        <div className="mb-4 lg:mb-0">
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            Fasting Activity
          </h3>
          <span className="text-base font-normal text-gray-500 dark:text-gray-400">
            Be proud of your achievement
          </span>
        </div>
        <Button color="gray">See All Activities</Button>
      </div>
      <div className="mt-6 flex flex-col">
        <div className="flex bg-gray-50 py-2">
          <div className="flex-1 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white">
            Date
          </div>
          <div className="flex-1 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white">
            Detail
          </div>
          <div className="flex-1 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white">
            Duration
          </div>
        </div>
        <div>
          {data?.map(({ date, log }, index) => {
            if (log === undefined) {
              return (
                <div key={index} className="flex">
                  <div className="flex-1 whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                    {dayjs(date).format("dddd, DD MMMM YYYY")}
                  </div>
                  <div className="flex-1 whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                    -
                  </div>
                  <div className="flex-1 whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                    -
                  </div>
                </div>
              );
            }
            const duration = dayjs.duration(dayjs(log.endAt).diff(log.startAt));
            return (
              <div key={index} className="flex">
                <div className="flex-1 whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                  {dayjs(date).format("dddd, DD MMMM YYYY")}
                </div>
                <div className="flex-1 whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                  <ActivityDuration log={log} />
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
    </div>
  );
};
