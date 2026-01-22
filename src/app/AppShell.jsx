import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/home" },
  { label: "Symptoms", path: "/symptoms" },
  { label: "Medications", path: "/medications" },
  { label: "Recovery", path: "/recovery" },
  { label: "Insights", path: "/insights" },
];

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-800 px-6 py-6 flex flex-col">
        <div className="mb-10">
          <h1 className="text-lg font-semibold tracking-wide">
            Care<span className="text-blue-500">OS</span>
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Recovery Intelligence
          </p>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm transition
                 ${
                   isActive
                     ? "bg-neutral-800 text-white"
                     : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                 }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-neutral-800">
          <p className="text-xs text-neutral-500">
            Logged in as
          </p>
          <p className="text-sm font-medium">
            Nithin
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top header */}
        <header className="sticky top-0 z-10 bg-neutral-950/80 backdrop-blur border-b border-neutral-800">
          <div className="px-8 py-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-400">
                Recovery dashboard
              </p>
              <h2 className="text-lg font-semibold">
                Post-surgery overview
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-neutral-800" />
            </div>
          </div>
        </header>

        {/* Page outlet */}
        <div className="px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
