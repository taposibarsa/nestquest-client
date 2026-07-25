export function formatBdt(amount: number): string {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPriceLabel(
  price: number,
  priceType: "sale" | "rent",
  rentPeriod: "monthly" | "yearly" | null
): string {
  const base = formatBdt(price);
  if (priceType === "rent") {
    const period = rentPeriod === "yearly" ? "/yr" : "/mo";
    return `${base}${period}`;
  }
  return base;
}
