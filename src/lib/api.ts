import type {
  AuthUser,
  ContactPayload,
  PaginatedProperties,
  Property,
  PropertySort,
  PropertyType,
  Review,
} from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type PropertyQuery = {
  page?: number;
  limit?: number;
  search?: string;
  type?: string | PropertyType[];
  city?: string;
  priceType?: "sale" | "rent" | "";
  minPrice?: number | string;
  maxPrice?: number | string;
  bedrooms?: number | string;
  sort?: PropertySort | string;
};

function buildQuery(params: PropertyQuery): string {
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      qs.set(key, value.join(","));
      continue;
    }
    qs.set(key, String(value));
  }
  const s = qs.toString();
  return s ? `?${s}` : "";
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized") {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}

type AuthResponse = {
  user: AuthUser;
  token: string;
};

async function parseError(res: Response): Promise<never> {
  let message = "Something went wrong";
  try {
    const data = (await res.json()) as { message?: string };
    if (data.message) message = data.message;
  } catch {
    // ignore JSON parse errors
  }
  if (res.status === 401) {
    throw new UnauthorizedError(message);
  }
  throw new ApiError(message, res.status);
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null
): Promise<T> {
  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    await parseError(res);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}

export function getGoogleAuthUrl(): string {
  return `${API_URL}/api/auth/google`;
}

export async function register(input: {
  name: string;
  email: string;
  password: string;
  profileImage?: string;
}): Promise<AuthResponse> {
  return request<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function login(input: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  return request<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function getMe(token: string): Promise<AuthUser> {
  return request<AuthUser>("/api/auth/me", { method: "GET" }, token);
}

export async function getProperties(
  params: PropertyQuery = {}
): Promise<PaginatedProperties> {
  return request<PaginatedProperties>(
    `/api/properties${buildQuery({ limit: 8, ...params })}`
  );
}

export async function getFeaturedProperties(): Promise<Property[]> {
  return request<Property[]>("/api/properties/featured", {
    // Keep homepage featured grid fresh in App Router (avoid static empty/stale cache).
    cache: "no-store",
  });
}

export type PropertyDetailResponse = {
  property: Property;
  reviews: Review[];
};

export async function getPropertyById(
  id: string
): Promise<PropertyDetailResponse> {
  return request<PropertyDetailResponse>(`/api/properties/${id}`);
}

export async function getReviews(propertyId: string): Promise<Review[]> {
  return request<Review[]>(
    `/api/reviews?propertyId=${encodeURIComponent(propertyId)}`
  );
}

export async function createReview(
  token: string,
  input: { propertyId: string; rating: number; comment: string }
): Promise<Review> {
  return request<Review>(
    "/api/reviews",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
    token
  );
}

export type CreatePropertyPayload = {
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  priceType: "sale" | "rent";
  rentPeriod: "monthly" | "yearly" | null;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: {
    address: string;
    area: string;
    city: string;
    country: string;
  };
  images: string[];
  amenities: string[];
  features: {
    furnished: boolean;
    petFriendly: boolean;
    elevator: boolean;
    balcony: boolean;
  };
  contactInfo: {
    agentName: string;
    agentPhone: string;
    agentEmail: string;
  };
};

export async function getUserProperties(token: string): Promise<Property[]> {
  return request<Property[]>("/api/properties/user", { method: "GET" }, token);
}

export async function createProperty(
  token: string,
  payload: CreatePropertyPayload
): Promise<Property> {
  return request<Property>(
    "/api/properties",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    token
  );
}

export async function deleteProperty(
  token: string,
  id: string
): Promise<void> {
  return request<void>(
    `/api/properties/${id}`,
    { method: "DELETE" },
    token
  );
}

export async function submitContact(
  payload: ContactPayload
): Promise<{ message: string; _id: string }> {
  return request<{ message: string; _id: string }>("/api/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
