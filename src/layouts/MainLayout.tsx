import NavbarBig from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <NavbarBig />

      <div className="pt-16">
        <Outlet />
      </div>
    </div>
  );
}
