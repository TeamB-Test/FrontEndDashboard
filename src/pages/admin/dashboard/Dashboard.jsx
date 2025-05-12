import { BarChart, Box, DollarSign, ShoppingBag, TrendingUp, Users, Utensils } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import DashboardCard from "../../../components/DashboardCard";
import DashboardChart from "../../../components/DashboardChart";
import AdminSidebar from "../../../components/admin/AdminSidebar";

// Mock data for the dashboard  
const ordersByDay = [
  { name: "Mon", orders: 34 },
  { name: "Tue", orders: 42 },
  { name: "Wed", orders: 55 },
  { name: "Thu", orders: 48 },
  { name: "Fri", orders: 67 },
  { name: "Sat", orders: 89 },
  { name: "Sun", orders: 72 }
];

const revenueByDay = [
  { name: "Mon", revenue: 540 },
  { name: "Tue", revenue: 620 },
  { name: "Wed", revenue: 750 },
  { name: "Thu", revenue: 680 },
  { name: "Fri", revenue: 950 },
  { name: "Sat", revenue: 1200 },
  { name: "Sun", revenue: 980 }
];

const topSellingItems = [
  { name: "Ribeye Steak", value: 42 },
  { name: "Craft Beer", value: 38 },
  { name: "Grilled Salmon", value: 30 },
  { name: "Bruschetta", value: 27 },
  { name: "Chocolate Lava Cake", value: 25 }
];

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-muted/20">
      <AdminSidebar />
      
      <div className="flex-1 ml-16 md:ml-64">
        <div className="p-8">
          <div className="flex flex-col gap-4 md:gap-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold animate-fade-in">Dashboard</h1>
                <p className="text-muted-foreground animate-fade-in">
                  Overview of your restaurant's performance
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Today:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <DashboardCard
                title="Total Orders"
                value="1,284"
                description="Last 30 days"
                icon={<ShoppingBag size={18} />}
                trend="up"
                trendValue="12%"
                className="animate-fade-in"
              />
              <DashboardCard
                title="Total Revenue"
                value="$24,853"
                description="Last 30 days"
                icon={<DollarSign size={18} />}
                trend="up"
                trendValue="8.2%"
                className="animate-fade-in"
              />
              <DashboardCard
                title="Menu Items"
                value="48"
                description="Across 6 categories"
                icon={<Utensils size={18} />}
                trend="neutral"
                trendValue="0"
                className="animate-fade-in"
              />
              <DashboardCard
                title="Active Tables"
                value="12"
                description="Currently in use"
                icon={<Box size={18} />}
                trend="down"
                trendValue="3"
                className="animate-fade-in"
              />
            </div>
            
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <DashboardChart
                title="Orders by Day"
                description="Number of orders in the last 7 days"
                data={ordersByDay}
                type="bar"
                dataKeys={["orders"]}
                colors={["#3b82f6"]}
                className="animate-fade-in"
              />
              <DashboardChart
                title="Revenue by Day"
                description="Revenue in USD for the last 7 days"
                data={revenueByDay}
                type="line"
                dataKeys={["revenue"]}
                colors={["#10b981"]}
                className="animate-fade-in"
              />
            </div>
            
            {/* Additional Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Top Selling Items</CardTitle>
                  <CardDescription>Most popular items from your menu</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {topSellingItems.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-6">{index + 1}.</div>
                        <div className="flex-1 ml-2">{item.name}</div>
                        <div className="flex items-center">
                          <span className="font-medium">{item.value}</span>
                          <span className="text-muted-foreground text-sm ml-1">orders</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest orders and activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { time: "10 mins ago", message: "New order from Table #5", type: "order" },
                      { time: "35 mins ago", message: "Table #3 paid their bill", type: "payment" },
                      { time: "1 hour ago", message: "New order from Table #1", type: "order" },
                      { time: "2 hours ago", message: "Added 3 new menu items", type: "update" },
                      { time: "3 hours ago", message: "New order from Table #7", type: "order" }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start">
                        <div className="h-2 w-2 mt-2 rounded-full bg-primary mr-3"></div>
                        <div>
                          <p className="font-medium">{activity.message}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;