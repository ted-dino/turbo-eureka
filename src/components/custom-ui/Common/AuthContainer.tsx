import AuthPanel from "../AuthPanel";

type Props = {
  searchParams: Record<string, string> | null | undefined;
};

export default function AuthContainer({ searchParams }: Props) {
  const showLogin = searchParams && searchParams.showLogin;
  return <>{showLogin && <AuthPanel showLogin={showLogin} />}</>;
}
