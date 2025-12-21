export type PlanInterval = "monthly" | "yearly";

export const PRICING_PLANS = {
  monthly: {
    id: "pro-monthly",
    title: "Pro Health",
    subtitle: "Billed Monthly",
    price: 12,
    priceId: "price_1SfieDAMFulaawy2GkrkpFYK",
    interval: "monthly" as PlanInterval,
    popular: false,
  },
  yearly: {
    id: "pro-yearly",
    title: "Health Pro+",
    subtitle: "Billed Yearly",
    price: 9,
    priceId: "price_1Sg27bAMFulaawy2PBDIlV8X",
    interval: "yearly" as PlanInterval,
    popular: true,
  },
};
