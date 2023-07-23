import { Spinner } from "flowbite-react";
import { useSession } from "next-auth/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { api } from "~/utils/api";

interface ProfileInput {
  name: string | undefined;
  targetHours: string | undefined;
}

export default function Profile() {
  useSession({ required: true });
  const { data, isSuccess, isLoading } = api.profile.getProfile.useQuery();
  const { mutate } = api.profile.setProfile.useMutation();
  const { register, handleSubmit } = useForm<ProfileInput>({
    values: data
      ? {
          name: data.name ?? "",
          targetHours: `${data.targetHours}`,
        }
      : {
          name: "",
          targetHours: "",
        },
  });
  const onSubmit: SubmitHandler<ProfileInput> = ({ name, targetHours }) => {
    mutate({
      name,
      targetHours: targetHours ? parseInt(targetHours) : undefined,
    });
  };

  return (
    <>
      {isLoading && <Spinner />}
      {isSuccess && data && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {data.image && <img src={data.image} className="mb-6"></img>}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Name
            </label>
            <input
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Name"
              defaultValue={data.name ?? ""}
              {...register("name")}
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Email Address
            </label>
            <input
              type="email"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="john.doe@company.com"
              defaultValue={data.email ?? ""}
              disabled
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Total Hour
            </label>
            <input
              type="number"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Hours"
              defaultValue={`${data.targetHours}`}
              {...register("targetHours")}
            />
          </div>
          <button
            type="submit"
            className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      )}
    </>
  );
}
