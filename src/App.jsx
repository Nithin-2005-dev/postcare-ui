import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import AppShell from "./app/AppShell";
import Home from "./pages/Home";
import Symptoms from "./pages/Symptoms";
import Medications from "./pages/Medications";
import Recovery from "./pages/Recovery";
import Insights from "./pages/Insights";

export default function App() {
  const location = useLocation();

  return (
    <AppShell>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/symptoms" element={<Symptoms />} />
          <Route path="/medications" element={<Medications />} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </AnimatePresence>
    </AppShell>
  );
}
