import { Link } from "react-router-dom";

export default function DashboardHome() {
  return (
    <div className="space-y-6">

      {/* Welcome / Overview Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Welcome back!</h3>
          <p className="text-gray-600">
            Here is a quick overview of your company activity and tools.
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* Create Company Profile */}
            <Link
              to="/dashboard/company/register"
              className="p-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Create Company
            </Link>

            {/* View Company Profile */}
            <Link
              to="/dashboard/company/profile"
              className="p-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            >
              View Profile
            </Link>

            {/* Edit Company Profile */}
            <Link
              to="/dashboard/company/update"
              className="p-4 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
            >
              Edit Profile
            </Link>

          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h4 className="font-semibold">Quick Actions</h4>
          <ul className="mt-3 space-y-3 text-sm text-blue-600">

            <li>
              <Link to="/dashboard/company/register" className="hover:underline">
                📝 Register Company
              </Link>
            </li>

            <li>
              <Link to="/dashboard/company/profile" className="hover:underline">
                🏢 View Company Profile
              </Link>
            </li>

            <li>
              <Link to="/dashboard/company/update" className="hover:underline">
                ✏️ Edit Company Profile
              </Link>
            </li>

            <li>
              <span className="opacity-50">📌 Post a Job (coming soon)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Content Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          Analytics card (coming soon)
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          Recent jobs (coming soon)
        </div>
      </div>
    </div>
  );
}
