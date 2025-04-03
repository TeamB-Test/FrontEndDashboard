import { useState } from "react";
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
} from "../components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import axios from "axios";
import toast from "react-hot-toast";
import { useLogin } from "../hooks/auth/useLogin";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { mutate, isPending: isLoading } = useLogin();

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    mutate(formData, {
      onSuccess: (data) => {
        // console.log("Login successful:", data);
        localStorage.setItem("accessToken", data.data.access_token);
        navigate("/admin/dashboard");
        toast.success("Login successful! Welcome to your admin dashboard.");
      },
      onError: (error) => {
        // console.error("Login error:", error);
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
                <CardTitle className="text-2xl">Admin Login</CardTitle>
                <CardDescription>
                  Sign in to access your restaurant dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to="#"
                        className="text-xs text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
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
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    to="/admin/register"
                    className="text-primary hover:underline"
                  >
                    Register
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

export default AdminLogin;
