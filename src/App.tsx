import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage";
import useStore from "@/context/store";
import SignIn from "@/pages/SignIn";

function App() {
  const auth = useStore((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={auth ? <HomePage /> : <Navigate to="/signin" />}
        />
      </Route>
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;
