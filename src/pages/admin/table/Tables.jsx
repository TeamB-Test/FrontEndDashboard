
import { useState } from "react";
import { PlusCircle, Table as TableIcon, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import AdminSidebar from "../../../components/admin/AdminSidebar";
// import { useToast } from "@/hooks/use-toast";

// Mock tables data
const initialTables = [
  { id: "1", number: 1, seats: 2, status: "available" },
  { id: "2", number: 2, seats: 4, status: "occupied" },
  { id: "3", number: 3, seats: 2, status: "available" },
  { id: "4", number: 4, seats: 6, status: "reserved" },
  { id: "5", number: 5, seats: 4, status: "available" },
  { id: "6", number: 6, seats: 2, status: "available" },
  { id: "7", number: 7, seats: 8, status: "occupied" },
  { id: "8", number: 8, seats: 2, status: "available" },
];

const Tables = () => {
  const [tables, setTables] = useState(initialTables);
  const [newTable, setNewTable] = useState({ number: "", seats: "" });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [errors, setErrors] = useState({});
  // const { toast } = useToast();
  
  const handleAddTable = () => {
    // Validate form
    const newErrors = {};
    
    if (!newTable.number) {
      newErrors.number = "Table number is required";
    } else if (tables.some((table) => table.number === parseInt(newTable.number))) {
      newErrors.number = "Table number already exists";
    }
    
    if (!newTable.seats) {
      newErrors.seats = "Number of seats is required";
    } else if (parseInt(newTable.seats) <= 0) {
      newErrors.seats = "Number of seats must be greater than 0";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Add new table
    const newId = (Math.max(...tables.map((table) => parseInt(table.id))) + 1).toString();
    
    setTables([
      ...tables,
      {
        id: newId,
        number: parseInt(newTable.number),
        seats: parseInt(newTable.seats),
        status: "available"
      }
    ]);
    
    // Reset form
    setNewTable({ number: "", seats: "" });
    setErrors({});
    setIsAddDialogOpen(false);
    
    // toast({
    //   title: "Table added successfully",
    //   description: `Table #${newTable.number} with ${newTable.seats} seats has been added.`,
    // });
  };
  
  const handleDeleteTable = (id) => {
    setTables(tables.filter((table) => table.id !== id));
    
    // toast({
    //   title: "Table deleted",
    //   description: "The table has been deleted successfully.",
    // });
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200";
      case "occupied":
        return "bg-red-100 text-red-800 border-red-200";
      case "reserved":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="flex min-h-screen bg-muted/20">
      <AdminSidebar />
      
      <div className="flex-1 ml-16 md:ml-64">
        <div className="p-8">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold animate-fade-in">Tables</h1>
                <p className="text-muted-foreground animate-fade-in">
                  Manage your restaurant's tables
                </p>
              </div>
              
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2 animate-fade-in">
                    <PlusCircle size={16} />
                    <span>Add Table</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Table</DialogTitle>
                    <DialogDescription>
                      Create a new table for your restaurant
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="table-number">Table Number</Label>
                      <Input
                        id="table-number"
                        type="number"
                        placeholder="Enter table number"
                        value={newTable.number}
                        onChange={(e) => {
                          setNewTable((prev) => ({ ...prev, number: e.target.value }));
                          if (errors.number) {
                            setErrors((prev) => {
                              const newErrors = { ...prev };
                              delete newErrors.number;
                              return newErrors;
                            });
                          }
                        }}
                        className={errors.number ? "border-destructive" : ""}
                      />
                      {errors.number && (
                        <p className="text-xs text-destructive">{errors.number}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="seats">Number of Seats</Label>
                      <Input
                        id="seats"
                        type="number"
                        placeholder="Enter number of seats"
                        value={newTable.seats}
                        onChange={(e) => {
                          setNewTable((prev) => ({ ...prev, seats: e.target.value }));
                          if (errors.seats) {
                            setErrors((prev) => {
                              const newErrors = { ...prev };
                              delete newErrors.seats;
                              return newErrors;
                            });
                          }
                        }}
                        className={errors.seats ? "border-destructive" : ""}
                      />
                      {errors.seats && (
                        <p className="text-xs text-destructive">{errors.seats}</p>
                      )}
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddTable}>Add Table</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Tables Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tables.map((table, index) => (
                <Card key={table.id} className="animate-scale-in relative overflow-hidden" style={{ animationDelay: `${index * 50}ms` }}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Table #{table.number}</span>
                      <Badge className={getStatusColor(table.status)}>
                        {getStatusText(table.status)}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1.5">
                      <Users size={14} className="mr-1.5" />
                      <span>{table.seats} seats</span>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <TableIcon size={16} className="mr-1.5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">ID: {table.id}</span>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDeleteTable(table.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tables;
