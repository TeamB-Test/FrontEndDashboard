import { DollarSign, ShoppingBag, Utensils, Box } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardCard from "../../../components/DashboardCard";
import DashboardChart from "../../../components/DashboardChart";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useGetAnalytics } from "../../../hooks/dashboard/useGetAnalytics";

const AdminDashboard = () => {
  const { data, isLoading, isError } = useGetAnalytics();

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (isError || !data) return <div className="p-8">Failed to load analytics.</div>;

  const {
    summaryMetrics,
    orderSummary,
    revenueSummary,
    topSellingItems,
    recentOrders,
  } = data;

  return (
    <div className="flex min-h-screen bg-muted/20">
      <AdminSidebar />
      <div className="flex-1 ml-16 md:ml-64">
        <div className="p-8">
          <div className="flex flex-col gap-4 md:gap-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">
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
                value={summaryMetrics.totalOrders}
                description="Last 7 days"
                icon={<ShoppingBag size={18} />}
                trend="neutral"
                trendValue={`Rs {orderSummary.percentChange}%`}
              />
              <DashboardCard
                title="Total Revenue"
                value={`Rs ${summaryMetrics.totalRevenue}`}
                description="Last 7 days"
                icon={<DollarSign size={18} />}
                trend="neutral"
                trendValue={`${revenueSummary.percentChange}%`}
              />
              <DashboardCard
                title="Menu Items"
                value={summaryMetrics.totalProducts}
                description="Total products available"
                icon={<Utensils size={18} />}
                trend="neutral"
                trendValue="0"
              />
              <DashboardCard
                title="Active Tables"
                value={summaryMetrics.activeTables}
                description="Currently in use"
                icon={<Box size={18} />}
                trend="neutral"
                trendValue="0"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <DashboardChart
                title="Orders by Day"
                description="Number of orders in the last 7 days"
                data={orderSummary.dailyOrders}
                type="bar"
                dataKeys={["orders"]}
                colors={["#3b82f6"]}
              />
              <DashboardChart
                title="Revenue by Day"
                description="Revenue in USD for the last 7 days"
                data={revenueSummary.dailyRevenue}
                type="line"
                dataKeys={["revenue"]}
                colors={["#10b981"]}
              />
            </div>

            {/* Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Items</CardTitle>
                  <CardDescription>Most popular items from your menu</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {topSellingItems.length > 0 ? topSellingItems.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-6">{index + 1}.</div>
                        <div className="flex-1 ml-2">{item.name}</div>
                        <div className="flex items-center">
                          <span className="font-medium">{item.value}</span>
                          <span className="text-muted-foreground text-sm ml-1">orders</span>
                        </div>
                      </div>
                    )) : (
                      <p>No data available</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest orders and activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order, index) => (
                      <div key={index} className="flex items-start">
                        <div className="h-2 w-2 mt-2 rounded-full bg-primary mr-3"></div>
                        <div>
                          <p className="font-medium">
                            {order.status === "COMPLETED"
                              ? `Payment received from Table #${order.tableNumber}`
                              : `New order from Table #${order.tableNumber}`}
                          </p>
                          <p className="text-sm text-muted-foreground">{order.time}</p>
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
