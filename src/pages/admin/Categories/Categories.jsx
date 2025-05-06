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
import AdminSidebar from "../../../components/admin/AdminSidebar";
import toast from "react-hot-toast";
import { useCreateCategory, useDeleteCategory, useGetAllCategories, useUpdateCategory } from "../../../hooks/Category/UseCategory";


const Categories = () => {
  const { data, isLoading } = useGetAllCategories();
  const categories = data?.data || [];

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    image: null,
  });

  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const handleEditCategory = (category) => {
    setEditCategory({
      ...category,
      image: null,
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    console.log(editCategory)
    console.log("clicked edit")
    const formData = new FormData();
    formData.append("name", editCategory.name);
    formData.append("description", editCategory.description);
    if (editCategory.image) {
      formData.append("image", editCategory.image);
    }

    updateCategoryMutation.mutate(
      { id: editCategory.id, formData },
      {
        onSuccess: () => {
          setIsEditDialogOpen(false);
          console.log("test")
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || "Failed to update category");
        },
      }
    );
  };

  const handleCreateCategory = () => {
    const formData = new FormData();
    formData.append("name", newCategory.name);
    formData.append("description", newCategory.description);
    if (newCategory.image) {
      formData.append("image", newCategory.image);
    }

    createCategoryMutation.mutate(formData, {
      onSuccess: () => {
        setNewCategory({ name: "", description: "", image: null });
        setIsCreateDialogOpen(false);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Failed to create category");
      },
    });
  };

  const handleDeleteCategory = (id) => {
    deleteCategoryMutation.mutate(id, {
      onError: (error) => {
        toast.error(error.response?.data?.message || "Failed to delete category");
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-muted/20">
      <AdminSidebar />
      <div className="flex-1 ml-16 md:ml-64 p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Categories</h1>
          <Button onClick={() => setIsCreateDialogOpen(true)} className="flex gap-2">
            <PlusCircle size={16} />
            <span>Create Category</span>
          </Button>
        </div>

        {isLoading ? (
          <p>Loading categories...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                {category.image && (
                  <img src={category.image} alt={category.name} className="w-full h-40 object-cover" />
                )}
                <CardContent className="flex justify-between pt-4">
                  <Button variant="ghost" size="icon" onClick={() => handleEditCategory(category)}>
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteCategory(category.id)}
                    disabled={deleteCategoryMutation.isPending}
                  >
                    <Trash2 size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setNewCategory({ ...newCategory, image: e.target.files[0] })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateCategory} disabled={createCategoryMutation.isPending} >
              {createCategoryMutation.isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      {editCategory && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={editCategory.name}
                  onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  value={editCategory.description}
                  onChange={(e) => setEditCategory({ ...editCategory, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>New Image (optional)</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditCategory({ ...editCategory, image: e.target.files[0] })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveEdit} disabled={updateCategoryMutation.isPending}>
                {updateCategoryMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Categories;
