import type { PropertyType } from "@/types";
import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Building2,
  Castle,
  Home,
  LayoutTemplate,
  Map,
} from "lucide-react";

export const CATEGORIES: {
  type: PropertyType;
  label: string;
  countLabel: string;
  Icon: LucideIcon;
}[] = [
  {
    type: "apartment",
    label: "Apartments",
    countLabel: "320 listings",
    Icon: Building2,
  },
  { type: "house", label: "Houses", countLabel: "180 listings", Icon: Home },
  { type: "villa", label: "Villas", countLabel: "45 listings", Icon: Castle },
  {
    type: "office",
    label: "Office Spaces",
    countLabel: "90 listings",
    Icon: Briefcase,
  },
  {
    type: "studio",
    label: "Studios",
    countLabel: "210 listings",
    Icon: LayoutTemplate,
  },
  {
    type: "land",
    label: "Land / Plots",
    countLabel: "60 listings",
    Icon: Map,
  },
];

export const TESTIMONIALS = [
  {
    name: "Rakibul Hasan",
    location: "Gulshan, Dhaka",
    rating: 5,
    text: "NestQuest helped us find a family villa in Gulshan within two weeks. The filters for sale listings and agent contacts made viewings straightforward.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Nusrat Jahan",
    location: "Agrabad, Chittagong",
    rating: 5,
    text: "I relocated for work and needed a furnished flat fast. Searching by city and rent period on NestQuest saved me from endless Facebook groups.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Imran Chowdhury",
    location: "Dhanmondi, Dhaka",
    rating: 5,
    text: "Listing our Dhanmondi apartment was simple, and genuine inquiries came through within days. The manage dashboard keeps everything organised.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
  },
];

export const BLOGS = [
  {
    title: "Top 5 Neighbourhoods to Buy Property in Dhaka in 2025",
    category: "Buying Tips",
    date: "12 Jun 2025",
    excerpt:
      "From lakeside Dhanmondi to expanding Purbachal, here is where buyers are focusing this year—and what to check before you commit.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    title:
      "Renting vs Buying: What Makes Sense for Young Professionals in Bangladesh",
    category: "Finance",
    date: "28 May 2025",
    excerpt:
      "Compare upfront costs, mobility, and long-term equity so you can decide whether a lease or a loan fits your next five years.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "A Beginner's Guide to Property Documentation in Bangladesh",
    category: "Legal",
    date: "4 May 2025",
    excerpt:
      "Mutation, RAJUK approval, and utility clearances explained in plain language before you sign on the dotted line.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
  },
];

export const FAQS = [
  {
    q: "How do I list my property on NestQuest?",
    a: "Create a free account, open Add Property from the menu, and complete the listing form with photos, price, and agent contact details. Your property goes live as soon as you submit.",
  },
  {
    q: "Is NestQuest free to use for property seekers?",
    a: "Yes. Browsing, filtering, and viewing listing details are free. You can contact agents directly from each property page without paying NestQuest a fee.",
  },
  {
    q: "How are agents verified on your platform?",
    a: "Agents register with a valid email and phone number shown on every listing. We encourage seekers to confirm documents and visit properties before any payment.",
  },
  {
    q: "Can I negotiate price directly with the seller?",
    a: "Absolutely. NestQuest connects you with the listing agent—use Call or Email on the property page to discuss price, viewings, and terms.",
  },
  {
    q: "What cities do you currently cover?",
    a: "We focus on Bangladesh, with strong inventory in Dhaka, Chittagong, Sylhet, Rajshahi, and Khulna, plus growing coverage in surrounding districts.",
  },
];

export const MONTHLY_LISTINGS = [
  { month: "Feb", listings: 95 },
  { month: "Mar", listings: 112 },
  { month: "Apr", listings: 128 },
  { month: "May", listings: 140 },
  { month: "Jun", listings: 155 },
  { month: "Jul", listings: 168 },
];
