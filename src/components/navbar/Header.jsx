import AdminNavbar from "./Admin/AdminNavbar";
import PrivateNavbar from "./private/PrivateNavbar";
import PublicNavbar from "./public/PublicNavbar";
import { useSelector } from "react-redux";
const Header = () => {
  const state = useSelector((state) => state?.users);
  const { userAuth } = state;
  const isAdmin = userAuth?.isAdmin;
  return (
    <>
      {!userAuth ? (
        <PublicNavbar />
      ) : userAuth ? (
        <PrivateNavbar />
      ) : (
        isAdmin && <AdminNavbar />
      )}
    </>
  );
};

export default Header;
