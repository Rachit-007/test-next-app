import { useRouter } from "next/router";

/**
 * @returns page after navigation from the home page
 */
const DynamicRoute = () => {
  const router = useRouter();

  return <>{router?.query?.id?.join(" / ")}</>;
};

export default DynamicRoute;
