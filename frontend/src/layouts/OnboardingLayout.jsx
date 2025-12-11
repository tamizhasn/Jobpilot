import { Outlet } from "react-router-dom";

export default function OnboardingLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-10">
        <Outlet />
      </div>
    </div>
  );
}
