import type { Metadata } from "next";
import { ContactInfoCards } from "@/components/contact/ContactInfoCards";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactMap } from "@/components/contact/ContactMap";

export const metadata: Metadata = {
  title: "Contact NestQuest | Get In Touch",
  description:
    "Reach NestQuest in Dhanmondi, Dhaka — call, email, or send a message. We’re here to help you find your next property.",
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <section className="bg-navy px-4 py-14 text-center text-white sm:py-16">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">
          Get In Touch
        </h1>
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-amber" />
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
          Have a question or need help finding a property? Our team is here to
          help.
        </p>
      </section>

      <ContactInfoCards />

      <section className="bg-white py-12 sm:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[55%_1fr] lg:items-stretch lg:px-8">
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-navy">
              Send a Message
            </h2>
            <ContactForm />
          </div>
          <div className="relative min-h-[320px] lg:h-auto lg:min-h-[520px]">
            <div className="h-full min-h-[320px] lg:absolute lg:inset-0 lg:min-h-0">
              <ContactMap />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
