import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="bg-[url('/src/assets/bg.jpg')] h-screen flex items-center justify-center bg-no-repeat bg-cover w-full bg-bottom relative z-0">
      <div className="absolute top-0 left-0 w-full h-full opacity-80 bg-[#000000B2] z-10"></div>

      <div className="relative z-20 w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
