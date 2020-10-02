import { useRouter } from "next/router";

/**
 * Returns int id from the route's query parameter
 * or -1 if the id is not valid
 */
export const useRouteId = (): number => {
  const router = useRouter();
  const { id } = router.query;
  return typeof id === "string" ? parseInt(id) : -1;
};
