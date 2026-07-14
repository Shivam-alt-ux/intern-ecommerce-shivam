"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  category: string;
  brand?: string;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    apiFetch(`/products/${id}`)
      .then(setProduct)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    setAdding(true);
    try {
      await apiFetch("/cart/items", {
        method: "POST",
        body: JSON.stringify({ productId: Number(id), quantity: 1 }),
      });
      router.push("/cart");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error && !product) return <div className="p-6 text-red-600">{error}</div>;
  if (!product) return null;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <img src={product.image} alt={product.title} className="w-full h-64 object-contain mb-4" />
      <h1 className="text-2xl font-semibold mb-1">{product.title}</h1>
      <p className="text-sm text-gray-500 mb-2">
        {product.category} {product.brand ? `· ${product.brand}` : ""}
      </p>
      <p className="text-lg font-bold mb-2">${product.price}</p>
      <p className="text-sm mb-4">{product.description}</p>
      <p className="text-sm mb-4">
        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
      </p>

      {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

      <button
        onClick={handleAddToCart}
        disabled={adding || product.stock === 0}
        className="w-full rounded bg-black text-white py-2 disabled:opacity-50"
      >
        {adding ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}