const API_URL = "http://ecommerce-alb-1346095368.ap-south-1.elb.amazonaws.com";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Something went wrong" }));
    throw new Error(error.message || "Request failed");
  }

  return res.json();
}
