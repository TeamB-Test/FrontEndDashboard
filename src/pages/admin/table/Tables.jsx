import { useState } from "react";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Badge } from "../../../components/ui/badge";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import {
  useGetAllTables,
  useCreateTable,
  useUpdateTable,
  useDeleteTable,
} from "../../../hooks/table/useTable";
import { CiUser } from "react-icons/ci";
import toast from "react-hot-toast";

const Tables = () => {
  const { data, isLoading } = useGetAllTables();
  const tables = data?.data || [];

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editTable, setEditTable] = useState(null);
  const [newTable, setNewTable] = useState({ number: "", seats: 4, isOccupied: false });

  const createTableMutation = useCreateTable();
  const updateTableMutation = useUpdateTable();
  const deleteTableMutation = useDeleteTable();

  const handleEditTable = (table) => {
    setEditTable(table);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    const formData = new FormData();
    formData.append("number", editTable.number);
    formData.append("seats", editTable.seats);
    formData.append("isOccupied", editTable.isOccupied);

    updateTableMutation.mutate(
      { id: editTable.id, data: formData },
      {
        onSuccess: () => setIsEditDialogOpen(false),
        onError: (error) =>
          toast.error(error.response?.data?.message || "Update failed."),
      }
    );
  };

  const handleDeleteTable = (id) => {
    deleteTableMutation.mutate(id, {
      onError: (error) => toast.error(error.response?.data?.message || "Delete failed."),
    });
  };

  const handleCreateTable = () => {
    const formData = new FormData();
    formData.append("number", newTable.number);
    formData.append("seats", newTable.seats);
    formData.append("isOccupied", newTable.isOccupied);

    createTableMutation.mutate(formData, {
      onSuccess: () => {
        setNewTable({ number: "", seats: 4, isOccupied: false });
        setIsCreateDialogOpen(false);
      },
      onError: (error) => toast.error(error.response?.data?.message || "Create failed."),
    });
  };

  return (
    <div className="flex min-h-screen bg-muted/20">
      <AdminSidebar />
      <div className="flex-1 ml-16 md:ml-64 p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Tables</h1>
          <Button onClick={() => setIsCreateDialogOpen(true)} className="flex gap-2">
            <PlusCircle size={16} />
            <span>Create Table</span>
          </Button>
        </div>

        {isLoading ? (
          <p>Loading tables...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tables.map((table) => (
              <Card key={table.id} className="relative overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Table #{table.number}</span>
                    <Badge className={table.isOccupied ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}>
                      {table.isOccupied ? "Occupied" : "Available"}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <CiUser /> Seats: {table.seats}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between">
                  <Button variant="ghost" size="icon" onClick={() => handleEditTable(table)}>
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteTable(table.id)} disabled={deleteTableMutation.isLoading}>
                    <Trash2 size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      {editTable && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Table</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Table Number</Label>
                <Input
                  value={editTable.number}
                  onChange={(e) => setEditTable({ ...editTable, number: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Seats</Label>
                <Input
                  type="number"
                  value={editTable.seats}
                  onChange={(e) => setEditTable({ ...editTable, seats: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <select
                  value={editTable.isOccupied ? "true" : "false"}
                  onChange={(e) => setEditTable({ ...editTable, isOccupied: e.target.value === "true" })}
                  className="border border-input rounded-md px-3 h-10"
                >
                  <option value="false">Available</option>
                  <option value="true">Occupied</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveEdit} disabled={updateTableMutation.isLoading}>
                {updateTableMutation.isLoading ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Table</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Table Number</Label>
              <Input
                value={newTable.number}
                onChange={(e) => setNewTable({ ...newTable, number: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Seats</Label>
              <Input
                type="number"
                value={newTable.seats}
                onChange={(e) => setNewTable({ ...newTable, seats: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <select
                value={newTable.isOccupied ? "true" : "false"}
                onChange={(e) => setNewTable({ ...newTable, isOccupied: e.target.value === "true" })}
                className="border border-input rounded-md px-3 h-10"
              >
                <option value="false">Available</option>
                <option value="true">Occupied</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateTable} disabled={createTableMutation.isLoading}>
              {createTableMutation.isLoading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tables;