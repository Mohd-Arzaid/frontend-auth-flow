import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import OpenRoute from "./authRoutes/OpenRoute";
import PrivateRoute from "./authRoutes/PrivateRoute";
import ProfileDashboard from "./components/manual/profile/profileOutletComponents/ProfileDashboard";
import { ProfileLayout } from "./components/manual/profile/profileLayout/ProfileLayout";
import ProfileSettings from "./components/manual/profile/profileOutletComponents/ProfileSettings";

function App() {
  return (
    <Routes>
      {/* Route for UnAuthorized Users*/}
      <Route
        path="signup"
        element={
          <OpenRoute>
            <Signup />
          </OpenRoute>
        }
      />

      <Route
        path="login"
        element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        }
      />

      <Route
        path="verify-email"
        element={
          <OpenRoute>
            <VerifyEmail />
          </OpenRoute>
        }
      />

      <Route
        path="forgot-password"
        element={
          <OpenRoute>
            <ForgotPassword />
          </OpenRoute>
        }
      />

      <Route
        path="update-password/:token"
        element={
          <OpenRoute>
            <UpdatePassword />
          </OpenRoute>
        }
      />

      {/* Route for Authorized Users*/}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        element={
          <PrivateRoute>
            <ProfileLayout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard/my-profile" element={<ProfileDashboard />} />
        <Route path="dashboard/Settings" element={<ProfileSettings />} />
      </Route>
    </Routes>
  );
}

export default App;
