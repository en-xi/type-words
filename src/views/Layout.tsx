import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <AppHeader />
      <div className="app">
        <Outlet />
      </div>
      <AppFooter />
    </>
  );
}

export default Layout;
