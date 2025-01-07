import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="signup" element={<Signup />} />

      <Route path="login" element={<Login />} />

      <Route path="verify-email" element={<VerifyEmail />} />

      <Route path="forgot-password" element={<ForgotPassword />} />

    </Routes>
  );
}

export default App;
