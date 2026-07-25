import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
    profileImage: z
      .string()
      .optional()
      .refine(
        (val) =>
          !val ||
          val.trim() === "" ||
          val.startsWith("http://") ||
          val.startsWith("https://"),
        "Profile photo must be a valid http(s) URL"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

const httpUrl = z
  .string()
  .trim()
  .refine(
    (val) => val.startsWith("http://") || val.startsWith("https://"),
    "Must be a valid http(s) URL"
  );

const optionalHttpUrl = z
  .string()
  .trim()
  .transform((val) => (val === "" ? undefined : val))
  .optional()
  .refine(
    (val) =>
      val === undefined ||
      val.startsWith("http://") ||
      val.startsWith("https://"),
    "Must be a valid http(s) URL"
  );

export const PROPERTY_AMENITIES = [
  "Parking",
  "Gym",
  "Swimming Pool",
  "24/7 Security",
  "Generator Backup",
  "Elevator",
  "Natural Gas",
  "High-Speed Internet",
  "Rooftop Access",
  "CCTV",
] as const;

export const PROPERTY_CITIES = [
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Other",
] as const;

export const propertySchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Title is required")
      .max(100, "Title must be at most 100 characters"),
    shortDescription: z
      .string()
      .trim()
      .min(1, "Short description is required")
      .max(150, "Max 150 characters"),
    fullDescription: z
      .string()
      .trim()
      .min(100, "Full description must be at least 100 characters"),
    propertyType: z.enum([
      "apartment",
      "house",
      "villa",
      "office",
      "studio",
      "land",
    ]),
    priceType: z.enum(["sale", "rent"]),
    rentPeriod: z.enum(["monthly", "yearly"]).optional(),
        price: z
      .number({ error: "Enter a valid price" })
      .positive("Price must be greater than 0"),
    bedrooms: z
      .number({ error: "Enter bedrooms" })
      .int()
      .min(0, "Cannot be negative"),
    bathrooms: z
      .number({ error: "Enter bathrooms" })
      .int()
      .min(0, "Cannot be negative"),
    area: z
      .number({ error: "Enter area" })
      .positive("Area must be greater than 0"),
    address: z.string().trim().min(1, "Street address is required"),
    areaName: z.string().trim().min(1, "Area / neighbourhood is required"),
    city: z.enum(PROPERTY_CITIES),
    cityOther: z.string().trim().optional(),
    country: z.string().trim().min(1),
    image1: httpUrl,
    image2: optionalHttpUrl,
    image3: optionalHttpUrl,
    amenities: z.array(z.string()),
    furnished: z.boolean(),
    petFriendly: z.boolean(),
    elevator: z.boolean(),
    balcony: z.boolean(),
    agentName: z.string().trim().min(1, "Agent name is required"),
    agentPhone: z.string().trim().min(1, "Agent phone is required"),
    agentEmail: z.string().trim().email("Enter a valid email"),
  })
  .superRefine((data, ctx) => {
    if (data.priceType === "rent" && !data.rentPeriod) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Select a rent period",
        path: ["rentPeriod"],
      });
    }
    if (data.city === "Other" && !data.cityOther?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Enter a city name",
        path: ["cityOther"],
      });
    }
  });

export type PropertyFormValues = z.infer<typeof propertySchema>;

export const CONTACT_SUBJECTS = [
  "General Inquiry",
  "Property Listing",
  "Technical Support",
  "Partnership",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v && v.length > 0 ? v : undefined)),
  subject: z.enum(CONTACT_SUBJECTS, {
    error: "Select a subject",
  }),
  message: z
    .string()
    .trim()
    .min(20, "Message must be at least 20 characters"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
