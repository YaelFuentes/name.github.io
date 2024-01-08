import Router from "next/router";
import useSWR from "swr";

export default function useUser({
  redirectTo = "/",
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR("/api/user");
  const loading = !user; // State to handle loading

  // Lógica de redirección
  if (redirectTo) {
    if (
      !loading &&
      ((redirectIfFound && user?.isLoggedIn) ||
        (!redirectIfFound && !user?.isLoggedIn))
    ) {
      Router.push(redirectTo);
    }
  }

  return { user, mutateUser, loading };
}
