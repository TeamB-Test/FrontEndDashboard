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
  useGetAllFoods,
  useCreateFood,
  useUpdateFood,
  useDeleteFood,
} from "../../../hooks/food/useFood";
import { useGetAllCategories } from "../../../hooks/Category/useCategory";
import toast from "react-hot-toast";

const Foods = () => {
  const { data, isLoading } = useGetAllFoods();
  const foods = data?.data || [];

  const { data: categoriesData } = useGetAllCategories();
  const categories = categoriesData?.data || [];

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editFood, setEditFood] = useState(null);
  const [newFood, setNewFood] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    image: null,
  });

  const createFoodMutation = useCreateFood();
  const updateFoodMutation = useUpdateFood();
  const deleteFoodMutation = useDeleteFood();

  const handleEditFood = (food) => {
    setEditFood(food);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    const formData = new FormData();
    formData.append("name", editFood.name);
    formData.append("description", editFood.description);
    formData.append("price", editFood.price);
    formData.append("categoryId", editFood.categoryId);
    if (editFood.image instanceof File) {
      formData.append("image", editFood.image);
    }

    updateFoodMutation.mutate(
      { id: editFood.id, data: formData },
      {
        onSuccess: () => setIsEditDialogOpen(false),
        onError: (error) =>
          toast.error(error.response?.data?.message || "Error updating food."),
      }
    );
  };

  const handleDeleteFood = (id) => {
    deleteFoodMutation.mutate(id, {
      onError: (error) =>
        toast.error(error.response?.data?.message || "Error deleting food."),
    });
  };

  const handleCreateFood = () => {
    const formData = new FormData();
    formData.append("name", newFood.name);
    formData.append("description", newFood.description);
    formData.append("price", newFood.price);
    formData.append("categoryId", newFood.categoryId);
    if (newFood.image) {
      formData.append("image", newFood.image);
    }

    createFoodMutation.mutate(formData, {
      onSuccess: () => {
        setNewFood({
          name: "",
          description: "",
          price: "",
          categoryId: "",
          image: null,
        });
        setIsCreateDialogOpen(false);
      },
      onError: (error) =>
        toast.error(error.response?.data?.message || "Error creating food."),
    });
  };

  return (
    <div className="flex min-h-screen bg-muted/20">
      <AdminSidebar />
      <div className="flex-1 ml-16 md:ml-64">
        <div className="p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Foods</h1>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <PlusCircle className="mr-2" size={16} />
              Create Food
            </Button>
          </div>
          {isLoading ? (
            <p>Loading foods...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {foods.map((food) => (
                <Card key={food.id}>
                  <CardHeader>
                    <CardTitle>{food.name}</CardTitle>
                    <CardDescription>
                      <div className="flex flex-col">
                        <span> {food.description}</span>

                        <span> {food.category.name}</span>
                      </div>
                    </CardDescription>
                    {food.image && (
                      <img
                        src={`${food.image}`}
                        alt={food.name}
                        className="w-full h-40 object-cover rounded-md mt-2"
                      />
                    )}
                    <Badge className="mt-2">${food.price}</Badge>
                  </CardHeader>
                  <CardContent className="flex justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditFood(food)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteFood(food.id)}
                      disabled={deleteFoodMutation.isLoading}
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

      {/* Edit Dialog */}
      {editFood && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Food</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={editFood.name}
                  onChange={(e) =>
                    setEditFood({ ...editFood, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Input
                  id="edit-description"
                  value={editFood.description}
                  onChange={(e) =>
                    setEditFood({ ...editFood, description: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Price</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={editFood.price}
                  onChange={(e) =>
                    setEditFood({ ...editFood, price: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
                <select
                  id="edit-category"
                  value={editFood.categoryId}
                  onChange={(e) =>
                    setEditFood({ ...editFood, categoryId: e.target.value })
                  }
                  className="border border-input bg-background rounded-md h-10 px-3"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-image">Image</Label>
                <Input
                  id="edit-image"
                  type="file"
                  onChange={(e) =>
                    setEditFood({ ...editFood, image: e.target.files[0] })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={() => setIsEditDialogOpen(false)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveEdit}
                disabled={updateFoodMutation.isLoading}
              >
                {updateFoodMutation.isLoading ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Food</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newFood.name}
                onChange={(e) =>
                  setNewFood({ ...newFood, name: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newFood.description}
                onChange={(e) =>
                  setNewFood({ ...newFood, description: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                value={newFood.price}
                onChange={(e) =>
                  setNewFood({ ...newFood, price: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={newFood.categoryId}
                onChange={(e) =>
                  setNewFood({ ...newFood, categoryId: e.target.value })
                }
                className="border border-input bg-background rounded-md h-10 px-3"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                type="file"
                onChange={(e) =>
                  setNewFood({ ...newFood, image: e.target.files[0] })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setIsCreateDialogOpen(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateFood}
              disabled={createFoodMutation.isLoading}
            >
              {createFoodMutation.isLoading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Foods;
