import { MapPin, Phone, Mail } from "lucide-react";

const CARDS = [
  {
    title: "Office Address",
    Icon: MapPin,
    body: "House 15, Road 7, Dhanmondi, Dhaka-1205, Bangladesh",
    href: undefined as string | undefined,
  },
  {
    title: "Phone",
    Icon: Phone,
    body: "+880 1700-000000",
    href: "tel:+8801700000000",
  },
  {
    title: "Email",
    Icon: Mail,
    body: "hello@nestquest.com",
    href: "mailto:hello@nestquest.com",
  },
] as const;

export function ContactInfoCards() {
  return (
    <section className="bg-off-white py-10 sm:py-12">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
        {CARDS.map(({ title, Icon, body, href }) => (
          <article
            key={title}
            className="rounded-xl border border-navy/10 bg-white p-6 text-center shadow-sm"
          >
            <Icon
              className="mx-auto h-8 w-8 text-amber"
              strokeWidth={1.5}
              aria-hidden
            />
            <h2 className="mt-3 font-display text-lg font-semibold text-navy">
              {title}
            </h2>
            {href ? (
              <a
                href={href}
                className="mt-2 block text-sm text-cool-gray hover:text-sage hover:underline"
              >
                {body}
              </a>
            ) : (
              <p className="mt-2 text-sm text-cool-gray">{body}</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
