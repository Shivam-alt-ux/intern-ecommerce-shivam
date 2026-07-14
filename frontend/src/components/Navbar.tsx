"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      <Link href="/products" className="font-semibold">
        Intern Shop
      </Link>

      <div className="flex items-center gap-4 text-sm">
        <Link href="/products">Products</Link>

        {isLoggedIn ? (
          <>
            <Link href="/cart">Cart</Link>
            <Link href="/orders">Orders</Link>
            <button onClick={handleLogout} className="underline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}