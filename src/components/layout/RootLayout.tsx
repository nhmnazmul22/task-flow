import { Outlet } from "react-router";
import Navbar from "./Navbar";

const RootLayout = () => {
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

export default RootLayout;
