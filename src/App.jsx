import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom"; // Add Navigate

import AdminDashboard from "./pages/admin/dashboard/Dashboard";
import AdminTables from "./pages/admin/table/Tables";
import AdminCategories from "./pages/admin/Categories/Categories";
import AdminFood from "./pages/admin/Food/foods";
import AdminOrder from "./pages/admin/Order/OrderPage";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminRegistration from "./pages/AdminRegistration";
import CompletedOrders from "./pages/admin/Order/CompletedOrders";

const App = () => (
  // <QueryClientProvider client={queryClient}>
  // <TooltipProvider>
  <>
    {/* <Toaster /> */}
    {/* <Sonner /> */}
    <BrowserRouter>
      <Routes>
        {/* Root route redirects to admin dashboard */}
        <Route path="/" element={<Navigate to="/admin/login" replace />} />
        {/* Admin routes */}
        {<Route path="/admin/dashboard" element={<AdminDashboard />} />}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegistration />} />
        <Route path="/admin/tables" element={<AdminTables />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        {<Route path="/admin/foods" element={<AdminFood />} /> }
        {<Route path="/admin/orderpage" element={<AdminOrder />} /> }
        {<Route path="/admin/completed" element={<CompletedOrders />} /> }
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </>
  // </TooltipProvider>
  // </QueryClientProvider>
);

export default App;
