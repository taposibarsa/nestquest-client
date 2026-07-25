export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-navy">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-cool-gray">Last updated: July 2026</p>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-charcoal">
        <p>
          NestQuest collects account details (name, email) and listing data you
          submit so we can display properties and connect seekers with agents
          across Bangladesh.
        </p>
        <p>
          We use cookies only to keep you signed in (`nestquest_auth`) and do not
          sell personal data to third parties. Listing photos and contact
          details you publish are visible to visitors of the site.
        </p>
        <p>
          To update or remove your account information, contact us at{" "}
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
