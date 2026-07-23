import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-black py-32 px-6 text-center">
      <h1 className="text-3xl font-semibold text-black dark:text-zinc-50 mb-4">
        Welcome to Intern Shop
      </h1>
      <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400 mb-8">
        Browse our products, add them to your cart, and check out — all in one place.
      </p>
      <Link
        href="/products"
        className="h-12 px-6 flex items-center justify-center rounded-full bg-foreground text-background font-medium hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors"
      >
        Browse Products
      </Link>
    </div>
  );
}