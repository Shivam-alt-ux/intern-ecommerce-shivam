"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch("/products")
      .then(setProducts)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading products...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Products</h1>
      <input
        type="text"
        placeholder="Search products or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm border border-zinc-800 bg-zinc-900 rounded-lg px-3 py-2 mb-6 outline-none focus:border-zinc-500 transition-colors"
      />
      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500">No products match your search.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="border border-zinc-800 rounded-xl p-4 bg-zinc-900 hover:border-zinc-600 hover:-translate-y-1 transition-all"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={128}
                className="w-full h-32 object-contain mb-2"
              />
              <p className="text-sm font-medium line-clamp-2">{product.title}</p>
              <p className="text-xs text-gray-500 mb-1">{product.category}</p>
              <p className="text-sm font-semibold">${product.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}