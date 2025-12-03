'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { setUser, setIsAuthenticated } from "@/features/auth/auth.slice";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";
import { apiRequest } from "@/utils/api/request";

const HomePage = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Check auth state on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      
      if (token && !isAuthenticated) {
        try {
          const response = await apiRequest({
            url: '/api/user/data',
            method: 'GET',
          });
          
          if (response.success) {
            dispatch(setUser(response.user));
            dispatch(setIsAuthenticated(true));
          }
        } catch (error) {
          // Token invalid, clear it
          localStorage.removeItem('auth_token');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [dispatch, isAuthenticated]);

  const handleLogout = async () => {
    try {
      await apiRequest({
        url: '/api/auth/logout',
        method: 'POST',
      });
    } catch (error) {
      console.log(error);
    }
    
    localStorage.removeItem('auth_token');
    dispatch(setUser(null));
    dispatch(setIsAuthenticated(false));
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center mt-30 px-4 text-center text-gray-800">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Logged in view
  if (isAuthenticated && user) {
    return (
      <div className="flex flex-col justify-center items-center mt-20 px-4 text-center text-gray-800">
        {/* Welcome section */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
        </div>

        <h1 className="text-2xl lg:text-3xl font-semibold mt-6 mb-2">
          Welcome back, {user.name || 'User'}! 👋
        </h1>
        
        <p className="text-gray-500 text-sm lg:text-base max-w-md mb-2">
          {user.email}
        </p>

        <p className="text-gray-600 text-sm lg:text-base max-w-md">
          You are successfully logged in. Explore your dashboard and manage your account.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
          <Button>
            Go to Dashboard
          </Button>
          <Button variant="secondary" onClick={handleLogout}>
            <FaSignOutAlt className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Stats or quick info */}
        <div className="grid grid-cols-3 gap-4 mt-10 w-full max-w-md">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-gray-800">12</p>
            <p className="text-xs text-gray-500">Projects</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-gray-800">48</p>
            <p className="text-xs text-gray-500">Tasks</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-gray-800">89%</p>
            <p className="text-xs text-gray-500">Complete</p>
          </div>
        </div>
      </div>
    );
  }

  // Guest view (not logged in)
  return (
    <div className="flex flex-col justify-center items-center mt-30 px-4 text-center text-gray-800">
      <Image
        src="/header_img.png"
        alt="Center Image"
        width={120}
        height={120}
      />
      <h1 className="flex items-center gap-2 text-xl lg:text-3xl font-normal mb-2">
        Hey, Developer
        <Image
          src="/hand_wave.png"
          alt="hand waving"
          height={30}
          width={30}
        />
      </h1>
      <h2 className="text-3xl lg:text-3xl font-medium mb-2">Welcome to our app</h2>
      <p className="text-gray-500 text-sm lg:text-base">
        Lets Start with a quick product tour and we will have you up and running in no time!
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="/register">
          <Button variant="secondary">Register</Button>
        </Link>
      </div>
    </div>
  )
}

export default HomePage
