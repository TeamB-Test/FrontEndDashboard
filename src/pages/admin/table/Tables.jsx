import { useState } from "react";
import { PlusCircle, Table as TableIcon, Trash2, Users, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useGetAllTables } from "../../../hooks/table/useTable";

const Tables = () => {
  const { data, isLoading } = useGetAllTables();
  const tables = data?.data || [];
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editTable, setEditTable] = useState(null);
  const [newTable, setNewTable] = useState({ number: "", isOccupied: false });
  
  // Handle editing a table
  const handleEditTable = (table) => {
    setEditTable(table);
    setIsEditDialogOpen(true);
  };

  // Handle saving edited table
  const handleSaveEdit = () => {
    console.log("Edited table:", editTable);
    setIsEditDialogOpen(false);
  };

  // Handle deleting a table
  const handleDeleteTable = (id) => {
    console.log("Delete table with ID:", id);
  };

  // Handle creating a new table
  const handleCreateTable = () => {
    console.log("Creating new table:", newTable);
    setNewTable({ number: "", isOccupied: false }); // Reset the form
    setIsCreateDialogOpen(false); // Close the dialog
  };

  return (
    <div className="flex min-h-screen bg-muted/20">
      <AdminSidebar />
      <div className="flex-1 ml-16 md:ml-64">
        <div className="p-8">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold animate-fade-in">Tables</h1>
            <Button className="flex items-center gap-2 mb-6" onClick={() => setIsCreateDialogOpen(true)}>
              <PlusCircle size={16} />
              <span>Create Table</span>
            </Button>
            {isLoading ? (
              <p>Loading tables...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tables.map((table) => (
                  <Card key={table.id} className="animate-scale-in relative overflow-hidden">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Table #{table.number}</span>
                        <Badge className={table.isOccupied ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}>
                          {table.isOccupied ? "Occupied" : "Available"}
                        </Badge>
                      </CardTitle>
                      <CardDescription>ID: {table.id}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3 flex justify-between">
                      <Button variant="ghost" size="icon" onClick={() => handleEditTable(table)}>
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteTable(table.id)}>
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

      {/* Edit Table Dialog */}
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
                  onChange={(e) => setEditTable((prev) => ({ ...prev, number: e.target.value }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveEdit}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Create Table Dialog */}
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
                onChange={(e) => setNewTable((prev) => ({ ...prev, number: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateTable}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tables;
