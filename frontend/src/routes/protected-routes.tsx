import { useAuth } from "../context/auth-context";
import { Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-gray-600 text-sm font-medium">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-[90%] max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Access Denied 🚫
          </h2>

          <p className="text-gray-500 mt-2 text-sm">
            You need to login to access this page.
          </p>

          <button
            onClick={() => (window.location.href = "/login")}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return <Outlet />;
}