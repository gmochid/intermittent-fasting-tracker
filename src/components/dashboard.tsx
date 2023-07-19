const Dashboard = () => {
  return (
    <>
      {/* Statistics */}
      <div className="my-6 flex w-full flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <div className="w-full md:w-6/12">
          <div className="relative w-full overflow-hidden bg-white shadow-lg dark:bg-gray-700">
            <a href="#" className="block h-full w-full">
              <div className="flex items-center justify-between space-x-4 px-4 py-6">
                <div className="flex items-center">
                  <span className="relative rounded-full bg-yellow-100 p-5">
                    <svg
                      width="40"
                      fill="currentColor"
                      height="40"
                      className="absolute left-1/2 top-1/2 h-5 -translate-x-1/2 -translate-y-1/2 transform text-yellow-500"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z"></path>
                    </svg>
                  </span>
                  <p className="ml-2 border-b border-gray-200 text-sm font-semibold text-gray-700 dark:text-white">
                    Level 2 Ambassador
                  </p>
                </div>
                <div className="mt-6 border-b border-gray-200 text-xl font-bold text-black dark:text-white md:mt-0">
                  $44,453.39
                  <span className="text-xs text-gray-400">/$100K</span>
                </div>
              </div>
              <div className="h-3 w-full bg-gray-100">
                <div className="h-full w-2/5 bg-green-400 text-center text-xs text-white"></div>
              </div>
            </a>
          </div>
        </div>
        <div className="flex w-full items-center space-x-4 md:w-1/2">
          <div className="w-1/2">
            <div className="relative w-full bg-white px-4 py-6 shadow-lg dark:bg-gray-700">
              <p className="text-2xl font-bold text-black dark:text-white">
                12
              </p>
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
        </div>
      </div>

      {/* Activities */}
      <div className="my-4 grid grid-cols-1 xl:grid-cols-2 xl:gap-4">
        <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 xl:mb-0">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Latest Activity
            </h3>
            <a
              href="#"
              className="text-primary-700 dark:text-primary-500 inline-flex items-center rounded-lg p-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              View all
            </a>
          </div>
          <ol className="relative border-l border-gray-200 dark:border-gray-700">
            <li className="mb-10 ml-4">
              <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-800 dark:bg-gray-700" />
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                April 2023
              </time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Application UI design in Figma
              </h3>
              <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                Get access to over 20+ pages including a dashboard layout,
                charts, kanban board, calendar, and pre-order E-commerce &amp;
                Marketing pages.
              </p>
              <a
                href="#"
                className="hover:text-primary-700 focus:text-primary-700 inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                Learn more{" "}
                <svg
                  className="ml-2 h-3 w-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li className="mb-10 ml-4">
              <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-800 dark:bg-gray-700" />
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                March 2023
              </time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Marketing UI code in Flowbite
              </h3>
              <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                Get started with dozens of web components and interactive
                elements built on top of Tailwind CSS.
              </p>
              <a
                href="https://flowbite.com/blocks/"
                className="text-primary-700 dark:text-primary-500 inline-flex items-center text-xs font-medium hover:underline sm:text-sm"
              >
                Go to Flowbite Blocks
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </li>
            <li className="mb-10 ml-4">
              <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-800 dark:bg-gray-700" />
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                February 2023
              </time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Marketing UI design in Figma
              </h3>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                Get started with dozens of web components and interactive
                elements built on top of Tailwind CSS.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
