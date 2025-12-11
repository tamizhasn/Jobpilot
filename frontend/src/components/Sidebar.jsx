import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCompany } from "../store/companySlice";

import {
  HomeIcon,
  BuildingStorefrontIcon,
  BriefcaseIcon,
  Square3Stack3DIcon,
  Cog6ToothIcon,
} from "./Icons";

const nav = [
  { name: "Home", to: "/dashboard", icon: HomeIcon },
  { name: "Company", action: "company", icon: BuildingStorefrontIcon },
  { name: "Jobs", to: "/dashboard/jobs", icon: BriefcaseIcon },
  { name: "Analytics", to: "/dashboard/analytics", icon: Square3Stack3DIcon },
  { name: "Settings", to: "/dashboard/settings", icon: Cog6ToothIcon },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const loc = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { company } = useSelector((state) => state.company);

  // Load company status once
  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);

  const handleCompanyClick = () => {
    if (company) {
      navigate("/dashboard/company/profile");
    } else {
      navigate("/dashboard/company/register");
    }
  };

  return (
    <aside
      className={`bg-white border-r transition-all duration-200 ease-in-out ${
        collapsed ? "w-20" : "w-64"
      } overflow-hidden`}
    >
      {/* Top Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-md w-10 h-10 flex items-center justify-center font-bold">
            JP
          </div>
          {!collapsed && <span className="font-semibold text-lg">JobPilot</span>}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-100"
        >
          <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-3">
        {nav.map((item) => {
          const active =
            item.to && (loc.pathname === item.to || loc.pathname.startsWith(item.to + "/"));

          return item.action === "company" ? (
            // SMART COMPANY BUTTON
            <button
              key={item.name}
              onClick={handleCompanyClick}
              className={`flex w-full text-left items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-l-4 ${
                loc.pathname.includes("/company")
                  ? "bg-indigo-50 border-indigo-500"
                  : "border-transparent"
              }`}
            >
              <item.icon className="w-5 h-5 text-gray-600" />
              {!collapsed && <span>{item.name}</span>}
            </button>
          ) : (
            // NORMAL NAV LINKS
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-l-4 ${
                active ? "bg-indigo-50 border-indigo-500" : "border-transparent"
              }`}
            >
              <item.icon className="w-5 h-5 text-gray-600" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="mt-auto p-4 border-t">
        <div className="flex items-center gap-3">
          <img src="/default-avatar.png" className="w-9 h-9 rounded-full" />
          {!collapsed && (
            <div>
              <div className="text-sm font-medium">Acme HR</div>
              <div className="text-xs text-gray-500">Employer</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
