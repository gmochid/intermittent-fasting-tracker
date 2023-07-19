import { api } from "~/utils/api";

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
      {/* Table */}
      <div className="mt-6 flex flex-col">
        <div className="overflow-x-auto rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white"
                    >
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800">
                  {data?.map((log) => (
                    <tr key={log.id}>
                      <td className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                        {log.startAt.toISOString()}
                      </td>
                      <td className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                        {log.endAt && "DONE"}
                        {!log.endAt && "NOT DONE"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
