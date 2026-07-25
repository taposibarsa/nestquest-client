export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-navy">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-cool-gray">Last updated: July 2026</p>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-charcoal">
        <p>
          NestQuest is a listing platform. We do not own the properties shown
          and are not a party to sale or rental contracts between users and
          agents.
        </p>
        <p>
          You agree to provide accurate listing information, use respectful
          communication, and only post properties you are authorized to market.
          NestQuest may remove listings that violate these terms.
        </p>
        <p>
          Platform availability is provided as-is. For questions, email{" "}
          <a
            href="mailto:hello@nestquest.com"
            className="font-medium text-sage underline"
          >
            hello@nestquest.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
