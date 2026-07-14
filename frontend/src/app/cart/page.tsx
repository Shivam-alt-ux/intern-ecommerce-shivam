"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
}

interface Cart {
  id: number;
  items: CartItem[];
}

export default function CartPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [checkingOut, setCheckingOut] = useState(false);

  const loadCart = () => {
    setLoading(true);
    apiFetch("/cart")
      .then(setCart)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load cart"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
  if (!isLoggedIn) {
    router.push("/login");
    return;
  }
  // eslint-disable-next-line react-hooks/set-state-in-effect
  loadCart();
}, [isLoggedIn, router]);

  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity < 1) return;
    try {
      await apiFetch(`/cart/items/${productId}`, {
        method: "PATCH",
        body: JSON.stringify({ quantity }),
      });
      loadCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update item");
    }
  };

  const removeItem = async (productId: number) => {
    try {
      await apiFetch(`/cart/items/${productId}`, { method: "DELETE" });
      loadCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove item");
    }
  };

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      await apiFetch("/orders/checkout", { method: "POST" });
      router.push("/orders");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setCheckingOut(false);
    }
  };

  if (loading) return <div className="p-6">Loading cart...</div>;

  const total = cart?.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0) ?? 0;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      {!cart || cart.items.length === 0 ? (
        <p>
          Your cart is empty.{" "}
          <Link href="/products" className="underline">
            Browse products
          </Link>
        </p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cart.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border rounded p-3">
                <img src={item.product.image} alt={item.product.title} className="w-16 h-16 object-contain" />
                <div className="flex-1">
                  <p className="font-medium">{item.product.title}</p>
                  <p className="text-sm text-gray-500">${item.product.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="w-7 h-7 border rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="w-7 h-7 border rounded"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-sm text-red-600 underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total: ${total.toFixed(2)}</span>
            <button
              onClick={handleCheckout}
              disabled={checkingOut}
              className="rounded bg-black text-white px-6 py-2 disabled:opacity-50"
            >
              {checkingOut ? "Placing order..." : "Checkout"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}