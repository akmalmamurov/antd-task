import { Fragment } from "react";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  );
};

export default MainLayout;
