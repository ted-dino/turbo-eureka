import { redirect } from "next/navigation";
import AuthPanel from "../AuthPanel";
import { cookies } from "next/headers";

type Props = {
  searchParams: Record<string, string> | null | undefined;
};

export default function AuthContainer({ searchParams }: Props) {
  const isLoggedIn = cookies().get("tedflix.session-token");
  const showLogin = searchParams && searchParams.showLogin;

  if (isLoggedIn && showLogin) {
    redirect("/");
  }

  return <>{showLogin && !isLoggedIn && <AuthPanel showLogin={showLogin} />}</>;
}
