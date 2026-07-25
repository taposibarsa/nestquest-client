const MAP_SRC =
  "https://maps.google.com/maps?q=Dhanmondi%2C%20Dhaka%2C%20Bangladesh&z=15&output=embed";

export function ContactMap() {
  return (
    <div className="relative h-full min-h-[320px] overflow-hidden rounded-xl border border-navy/10 bg-navy/5 shadow-sm">
      <iframe
        title="NestQuest office — Dhanmondi, Dhaka"
        src={MAP_SRC}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
