import { useSession } from "next-auth/react";

const ProtectedPage = () => {
  const { data } = useSession({
    required: true,
  });

  return <div>This is ProtectedPage</div>;
};

export default ProtectedPage;
