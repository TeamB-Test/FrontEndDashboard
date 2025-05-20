// OrderPage.jsx
// Imports required UI components, icons, toast notifications, and API hooks
import { useState } from "react";
import { Edit, Trash2, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useGetAllOrders, useCreateOrder, useDeleteOrder, useUpdateOrderStatus } from "../../../hooks/Order/useOrder";

// Main order management page component
const CompletedOrders = () => {
  // Fetch all orders
  const { data, isLoading } = useGetAllOrders(true);
  const orders = data?.data || [];

  // CRUD mutations for orders
  const createOrderMutation = useCreateOrder();
  // const updateOrderMutation = useUpdateOrder();
  const deleteOrderMutation = useDeleteOrder();
  const updateStatusMutation = useUpdateOrderStatus();

  // State management for dialog and order form
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editOrder, setEditOrder] = useState(null);
  const [newOrder, setNewOrder] = useState({
    tableId: "",
    productIds: "",
    quantities: "",
    notes: "",
    status: "PENDING",
  });

  // Opens dialog and sets selected order for editing
  const handleEdit = (order) => {
    setEditOrder(order);
    setIsDialogOpen(true);
  };

  // const handleSave = () => {
  //   updateOrderMutation.mutate(
  //     { id: editOrder.id, data: editOrder },
  //     {
  //       onSuccess: () => setIsDialogOpen(false),
  //       onError: (error) => toast.error(error.response?.data?.message || "Error updating order"),
  //     }
  //   );
  // };

  // Handles creation of a new order
  const handleCreate = () => {
    createOrderMutation.mutate(newOrder, {
      onSuccess: () => {
        setNewOrder({ tableId: "", productIds: "", quantities: "", notes: "", status: "PENDING" });
        setIsDialogOpen(false);
      },
      onError: (error) => toast.error(error.response?.data?.message || "Error creating order"),
    });
  };

  // Handles deletion of an order
  const handleDelete = (id) => {
    deleteOrderMutation.mutate(id, {
      onError: (error) => toast.error(error.response?.data?.message || "Error deleting order"),
    });
  };

  // Updates status of a specific order
  const handleStatusChange = (id, status) => {
    updateStatusMutation.mutate(
      { id, status },
      {
        onError: (error) => toast.error(error.response?.data?.message || "Error updating status"),
      }
    );
  };

  return (
    <div className="flex min-h-screen bg-muted/20">
      <AdminSidebar />
      <div className="flex-1 ml-16 md:ml-64 p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Orders</h1>
          {/* <Button onClick={() => setIsDialogOpen(true)}>
            <PlusCircle className="mr-2" size={16} /> Create Order
          </Button> */}
        </div>
        {isLoading ? (
          <p>Loading orders...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <CardTitle>Table #{order.table?.number}</CardTitle>
                  <CardDescription>Status: {order.status}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
  <p>Total Price: Rs {order.totalPrice}</p>
  <p>Notes: {order.notes}</p>
  <div>
    <p className="font-semibold">Ordered Items:</p>
    <ul className="list-disc list-inside text-sm">
      {order.products?.map((product) => (
        <li key={product.id}>
          {product.name} × {product.quantity}
        </li>
      ))}
    </ul>
  </div>
  <div className="flex justify-between gap-2">
    <Button size="sm" variant="destructive" onClick={() => handleDelete(order.id)}>
      <Trash2 size={14} />
    </Button>
    <select
      value={order.status}
      onChange={(e) => handleStatusChange(order.id, e.target.value)}
      className="border rounded px-2 py-1 text-sm"
    >
      <option value="PENDING">PENDING</option>
      <option value="COMPLETED">COMPLETED</option>
      <option value="ACCEPTED">ACCEPTED</option>
    </select>
  </div>
</CardContent>

              </Card>
            ))}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editOrder ? "Edit Order" : "Create Order"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="tableId">Table ID</Label>
                <Input
                  id="tableId"
                  value={editOrder?.tableId ?? newOrder.tableId}
                  onChange={(e) =>
                    editOrder
                      ? setEditOrder({ ...editOrder, tableId: e.target.value })
                      : setNewOrder({ ...newOrder, tableId: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="productIds">Product IDs (comma separated)</Label>
                <Input
                  id="productIds"
                  value={editOrder?.productIds ?? newOrder.productIds}
                  onChange={(e) =>
                    editOrder
                      ? setEditOrder({ ...editOrder, productIds: e.target.value })
                      : setNewOrder({ ...newOrder, productIds: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantities">Quantities (comma separated)</Label>
                <Input
                  id="quantities"
                  value={editOrder?.quantities ?? newOrder.quantities}
                  onChange={(e) =>
                    editOrder
                      ? setEditOrder({ ...editOrder, quantities: e.target.value })
                      : setNewOrder({ ...newOrder, quantities: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  value={editOrder?.notes ?? newOrder.notes}
                  onChange={(e) =>
                    editOrder
                      ? setEditOrder({ ...editOrder, notes: e.target.value })
                      : setNewOrder({ ...newOrder, notes: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={editOrder ? handleSave : handleCreate}>
                {editOrder ? "Save Changes" : "Create Order"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CompletedOrders;
