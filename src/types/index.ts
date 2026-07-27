export type AuthProvider = "local" | "google" | "both";
export type UserRole = "user" | "admin";
export type PriceType = "sale" | "rent";
export type RentPeriod = "monthly" | "yearly" | null;
export type PropertyType =
  | "apartment"
  | "house"
  | "villa"
  | "office"
  | "land"
  | "studio";
export type PropertyStatus = "available" | "sold" | "rented";
export type ModerationStatus = "pending" | "approved" | "rejected";
export type PropertySort =
  | "newest"
  | "price_asc"
  | "price_desc"
  | "rating"
  | "reviews";

/** Authenticated user from API — never includes password. */
export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  authProvider?: AuthProvider;
}

export type User = AuthUser;

export interface PropertyLocation {
  address: string;
  area: string;
  city: string;
  country: string;
}

export interface PropertyFeatures {
  furnished: boolean;
  petFriendly: boolean;
  elevator: boolean;
  balcony: boolean;
}

export interface PropertyContactInfo {
  agentName: string;
  agentPhone: string;
  agentEmail: string;
}

export interface Property {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  priceType: PriceType;
  rentPeriod: RentPeriod;
  propertyType: PropertyType;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: PropertyLocation;
  images: string[];
  amenities: string[];
  features: PropertyFeatures;
  contactInfo: PropertyContactInfo;
  postedBy: string;
  averageRating: number;
  totalReviews: number;
  featured: boolean;
  moderationStatus?: ModerationStatus;
  moderatedAt?: string;
  moderatedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  property: string;
  user: string;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface PaginatedProperties {
  data: Property[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
}
