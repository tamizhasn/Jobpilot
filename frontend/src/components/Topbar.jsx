// src/components/Topbar.jsx
import { useState } from "react";

export default function Topbar({ collapsed, setCollapsed }) {
  const [open, setOpen] = useState(false);
  const user = { name: "Acme HR", email: "hr@acme.com" }; // replace from redux if needed

  return (
    <header className="flex items-center justify-between h-16 px-4 bg-white border-b">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={() => setCollapsed(!collapsed)}
        >
          <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>

        <div className="relative hidden md:block">
          <input
            placeholder="Search jobs, candidates, companies..."
            className="w-96 pl-4 pr-10 py-2 rounded-lg border bg-gray-50 text-sm focus:outline-none"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5"/></svg>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="px-3 py-1 text-sm rounded bg-indigo-50 text-indigo-600">Post a Job</button>

        <div className="relative">
          <button onClick={() => setOpen(!open)} className="flex items-center gap-2">
            <img src="/default-avatar.png" alt="avatar" className="w-9 h-9 rounded-full object-cover" />
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium">{user.name}</div>
              <div className="text-xs text-gray-500">{user.email}</div>
            </div>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg py-2">
              <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Profile</button>
              <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Settings</button>
              <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
