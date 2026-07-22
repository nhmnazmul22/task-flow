import { Outlet } from "react-router";
import Navbar from "./Navbar";

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
    </>
  );
};

export default AdminLayout;
