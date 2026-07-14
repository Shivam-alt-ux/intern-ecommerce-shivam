"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  product: {
    title: string;
    image: string;
  };
}

interface Order {
  id: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export default function OrdersPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    apiFetch("/orders")
      .then(setOrders)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load orders"))
      .finally(() => setLoading(false));
  }, [isLoggedIn, router]);

  if (loading) return <div className="p-6">Loading orders...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Order History</h1>

      {orders.length === 0 ? (
        <p>You haven&apos;t placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            return (
              <div key={order.id} className="border rounded p-4">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span className="text-xs bg-gray-100 rounded px-2 py-1">{order.status}</span>
                </div>

                <div className="space-y-2 mb-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 text-sm">
                      <img src={item.product.image} alt={item.product.title} className="w-10 h-10 object-contain" />
                      <span className="flex-1">{item.product.title}</span>
                      <span>x{item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="text-right font-semibold text-sm">
                  Total: ${total.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}