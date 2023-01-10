import Header from "components/ui/header/Header";
import Loading from "components/ui/loading/Loading/Loading";
import useAuthCheck from "hooks/useAuthCheck";
import { Navigate, Outlet } from "react-router-dom";

function Admin() {
  const { user, checkingAuth } = useAuthCheck();

  if (checkingAuth) return <Loading />;
  if (user)
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  return <Navigate to="/" />;
}

export default Admin;
