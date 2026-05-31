import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "./protected-routes";
import Dashboard from "../pages/dashboard/Dashboard";
import Chat from "../pages/chat/Chat";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat/:id"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}