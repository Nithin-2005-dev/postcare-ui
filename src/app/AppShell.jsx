import { NavLink } from "react-router-dom";
import {
  Home,
  Activity,
  Pill,
  HeartPulse,
  Brain,
  Menu,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Home", path: "/home", icon: Home },
  { label: "Symptoms", path: "/symptoms", icon: Activity },
  { label: "Medications", path: "/medications", icon: Pill },
  { label: "Recovery", path: "/recovery", icon: HeartPulse },
  { label: "Insights", path: "/insights", icon: Brain },
];

export default function AppShell({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden md:flex w-64 border-r border-neutral-800 px-6 py-6 flex-col">
        <Brand />

        <nav className="mt-10 flex flex-col gap-1">
          {navItems.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </nav>

        <UserCard />
      </aside>

      {/* ================= MOBILE DRAWER ================= */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-72 bg-neutral-950 border-r border-neutral-800 p-6">
            <Brand />

            <nav className="mt-10 flex flex-col gap-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.path}
                  item={item}
                  onClick={() => setOpen(false)}
                />
              ))}
            </nav>

            <UserCard />
          </aside>
        </div>
      )}

      {/* ================= MAIN ================= */}
      <main className="flex-1 flex flex-col">
        {/* TOP HEADER */}
        <header className="sticky top-0 z-20 bg-neutral-950/80 backdrop-blur border-b border-neutral-800">
          <div className="px-5 md:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-neutral-800"
              >
                <Menu size={20} />
              </button>

              <div>
                <p className="text-xs text-neutral-400">
                  Recovery dashboard
                </p>
                <h2 className="text-base md:text-lg font-semibold">
                  Post-surgery overview
                </h2>
              </div>
            </div>

            <div className="h-9 w-9 rounded-full bg-neutral-800" />
          </div>
        </header>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-5 md:px-8 py-6 pb-20 md:pb-8">
          {children}
        </div>

        {/* ================= MOBILE BOTTOM NAV ================= */}
        <nav className="md:hidden fixed bottom-0 inset-x-0 z-20 bg-neutral-950 border-t border-neutral-800">
          <div className="flex justify-around py-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center text-xs gap-1 px-3 py-2 rounded-lg
                   ${
                     isActive
                       ? "text-blue-400"
                       : "text-neutral-400"
                   }`
                }
              >
                <item.icon size={18} />
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </main>
    </div>
  );
}

/* ================= SUB COMPONENTS ================= */

function Brand() {
  return (
    <div>
      <h1 className="text-lg font-semibold tracking-wide">
        Care<span className="text-blue-500">OS</span>
      </h1>
      <p className="text-xs text-neutral-400 mt-1">
        Recovery Intelligence
      </p>
    </div>
  );
}

function NavItem({ item, onClick }) {
  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
         ${
           isActive
             ? "bg-neutral-800 text-white"
             : "text-neutral-400 hover:text-white hover:bg-neutral-900"
         }`
      }
    >
      <item.icon size={18} />
      {item.label}
    </NavLink>
  );
}

function UserCard() {
  return (
    <div className="mt-auto pt-6 border-t border-neutral-800">
      <p className="text-xs text-neutral-500">
        Logged in as
      </p>
      <p className="text-sm font-medium">
        Nithin
      </p>
    </div>
  );
}
