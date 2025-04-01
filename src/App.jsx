import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom"; // Add Navigate

import AdminDashboard from "./pages/admin/dashboard/Dashboard";
import AdminTables from "./pages/admin/table/Tables";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminRegistration from "./pages/AdminRegistration";

const App = () => (
  // <QueryClientProvider client={queryClient}>
    // <TooltipProvider>
    <>
      {/* <Toaster /> */}
      {/* <Sonner /> */}
      <BrowserRouter>
        <Routes>
          {/* Root route redirects to admin dashboard */}
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          {/* Admin routes */}
          { <Route path="/admin/dashboard" element={<AdminDashboard />} /> }
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegistration />} />
          <Route path="/admin/tables" element={<AdminTables />} />
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </>
    // </TooltipProvider>
  // </QueryClientProvider>
);

export default App;