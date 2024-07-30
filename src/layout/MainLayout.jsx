//components
import {Navbar} from "../components"

//rrd
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
    <main className="flex justify-between ">
      <Navbar  />
        <Outlet />
      </main>
    </>
  );
}
export default MainLayout