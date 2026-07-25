import Link from "next/link";
import { Home, Mail, MapPin, Phone } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

const propertyTypes = [
  { href: "/properties?type=apartment", label: "Apartments" },
  { href: "/properties?type=house", label: "Houses" },
  { href: "/properties?type=villa", label: "Villas" },
  { href: "/properties?type=office", label: "Office Spaces" },
];

const socials = [
  { href: "https://facebook.com", label: "Facebook", glyph: "f" },
  { href: "https://instagram.com", label: "Instagram", glyph: "ig" },
  { href: "https://linkedin.com", label: "LinkedIn", glyph: "in" },
  { href: "https://twitter.com", label: "Twitter", glyph: "x" },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-display text-xl font-bold"
          >
            <Home className="h-5 w-5 text-amber" aria-hidden />
            NestQuest
          </Link>
          <p className="mt-3 text-sm text-white/70">
            Finding you the perfect space since 2021.
          </p>
          <div className="mt-4 flex gap-3">
            {socials.map(({ href, label, glyph }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-xs font-bold uppercase text-white/80 transition hover:bg-amber hover:text-navy"
              >
                {glyph}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-amber">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber">
            Property Types
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            {propertyTypes.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-amber">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber">
            Contact Info
          </h3>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
              House 15, Road 7, Dhanmondi, Dhaka-1205
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
              <a href="tel:+8801700000000" className="hover:text-amber">
                +880 1700-000000
              </a>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
              <a href="mailto:hello@nestquest.com" className="hover:text-amber">
                hello@nestquest.com
              </a>
            </li>
            <li className="text-white/60">Working hours: Sun–Thu, 9AM–6PM</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 NestQuest. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-amber">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-amber">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
