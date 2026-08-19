export async function generateStaticParams() {
  const ids = Array.from({ length: 100 }, (_, i) => ({ id: String(i + 1) }));
  return ids;
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
