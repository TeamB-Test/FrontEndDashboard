import { useState } from "react";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
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
  const { data, isLoading } = useGetAllTables(); // Fetch all tables data
  const tables = data?.data || []; // Extract tables array from data or set to empty array

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editTable, setEditTable] = useState(null);
  const [newTable, setNewTable] = useState({ number: "", seats: 4 });

  const createTableMutation = useCreateTable(); // Mutation for creating a new table
  const updateTableMutation = useUpdateTable(); // Mutation for updating an existing table
  const deleteTableMutation = useDeleteTable(); // Mutation for deleting a table

  // Handle editing a table
  const handleEditTable = (table) => {
    setEditTable(table);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    const formData = new FormData();
    formData.append("number", editTable.number);
    formData.append("seats", editTable.seats);

    updateTableMutation.mutate(
      { id: editTable.id, data: formData },
      {
        onSuccess: () => {
          setIsEditDialogOpen(false);
        },
        onError: (error) => {
          console.error("Update table failed:", error);
          toast.error(
            error.response?.data?.message || "An error occurred while updating."
          );
        },
      }
    );
  };

  const handleDeleteTable = (id) => {
    deleteTableMutation.mutate(id, {
      onError: (error) => {
        console.error("Delete table failed:", error);
        toast.error(
          error.response?.data?.message || "An error occurred while deleting."
        );
      },
    });
  };

  const handleCreateTable = () => {
    const formData = new FormData(); // Create form data object
    formData.append("number", newTable.number);
    formData.append("seats", newTable.seats || 4);

    createTableMutation.mutate(formData, {
      onSuccess: () => {
        setNewTable({ number: "" , seats: 4 });
        setIsCreateDialogOpen(false);
      },
      onError: (error) => {
        console.error("Create table failed:", error);
        toast.error(
          error.response?.data?.message || "An error occurred while creating."
        );
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-muted/20">
      <AdminSidebar />
      <div className="flex-1 ml-16 md:ml-64">
        <div className="p-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold animate-fade-in">Tables</h1>
              <Button
                className="flex items-center gap-2"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <PlusCircle size={16} />
                <span>Create Table</span>
              </Button>
            </div>
            {isLoading ? (
              <p>Loading tables...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tables.map((table) => (
                  <Card
                    key={table.id}
                    className="animate-scale-in relative overflow-hidden"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Table #{table.number}</span>
                        <Badge className="bg-green-100 text-green-800">
                          Available
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-2">
                          <CiUser />
                          <p>Seats : {table.seats}</p>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3 flex justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditTable(table)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteTable(table.id)}
                        disabled={deleteTableMutation.isLoading}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
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
                  type="text"
                  value={editTable.number}
                  onChange={(e) =>
                    setEditTable((prev) => ({
                      ...prev,
                      number: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Seats</Label>
                <Input
                  type="number"
                  value={editTable.seats}
                  onChange={(e) =>
                    setEditTable((prev) => ({
                      ...prev,
                      seats: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveEdit}
                disabled={updateTableMutation.isLoading}
              >
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
                type="text"
                value={newTable.number}
                onChange={(e) =>
                  setNewTable((prev) => ({
                    ...prev,
                    number: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Seats</Label>
              <Input
                type="number"
                value={newTable.seats}
                
                onChange={(e) =>
                  setNewTable((prev) => ({
                    ...prev,
                    seats: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateTable}
              disabled={createTableMutation.isLoading}
            >
              {createTableMutation.isLoading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tables;
