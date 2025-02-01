import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage";
import useStore from "@/context/store";
import SignIn from "@/pages/SignIn";
import AuthLayout from "./layouts/AuthLayout";
import SignUp from "./pages/SignUp";

function App() {
  const auth = useStore((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={auth ? <HomePage /> : <Navigate to="/auth/signin" />} // ✅ To‘g‘ri URL
        />
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<SignIn />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
