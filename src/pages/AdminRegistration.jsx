import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import toast from "react-hot-toast";
import { useRegister } from "../hooks/auth/useRegister";

const AdminRegistration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const { mutate, isPending: isLoading } = useRegister();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!restaurantName.trim()) {
      newErrors.restaurantName = "Restaurant name is required";
    }
    if (!location.trim()) {
      newErrors.location = "Location is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!image) {
      newErrors.image = "Restaurant image is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name", restaurantName);
    formData.append("location", location);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", image); // Append the image file to FormData

    mutate(formData, {
      onSuccess: () => {
        toast.success("Registration successful! You can now log in.");
        navigate("/admin/login");
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "An error occurred.");
      },
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="glass-card animate-scale-in">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Become a Member</CardTitle>
                <CardDescription>
                  Register your restaurant to start using TableTapster
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="restaurantName">Restaurant Name</Label>
                    <Input
                      id="restaurantName"
                      type="text"
                      placeholder="Enter your restaurant name"
                      value={restaurantName}
                      onChange={(e) => setRestaurantName(e.target.value)}
                      className={
                        errors.restaurantName ? "border-destructive" : ""
                      }
                    />
                    {errors.restaurantName && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.restaurantName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      type="text"
                      placeholder="Enter your restaurant location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className={errors.location ? "border-destructive" : ""}
                    />
                    {errors.location && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.location}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={
                          errors.password ? "border-destructive pr-10" : "pr-10"
                        }
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Restaurant Image</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                      ref={fileInputRef}
                    />
                    <Button
                      type="button"
                      onClick={handleImageButtonClick}
                      className={
                        errors.image ? "border-destructive w-full" : "w-full"
                      }
                    >
                      {image ? image.name : "Upload Image"}
                    </Button>
                    {errors.image && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.image}
                      </p>
                    )}
                    {image && (
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground">
                          Selected Image: {image.name}
                        </p>
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Registering..." : "Register"}
                  </Button>
                </form>
              </CardContent>

              <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    to="/admin/login"
                    className="text-primary hover:underline"
                  >
                    Log in
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminRegistration;
