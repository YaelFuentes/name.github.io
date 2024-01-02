import Router from "next/router";
import useSWR from "swr";

export default function useUser({
  redirectTo = "/",
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR("/api/user");

  // Lógica de redirección
  if (redirectTo && user) {

    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }

  return { user, mutateUser };
}