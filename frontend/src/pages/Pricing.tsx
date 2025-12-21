import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
// import { loadStripe } from "@stripe/stripe-js";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useLocation } from "wouter";
import { subscription } from "@/lib/services/supabase/payment/subscription";
import { PRICING_PLANS } from "@/lib/config/pricing";
import { useUserStore } from "@/store/userStore";
import { toast } from "sonner";

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const [, setLocation] = useLocation();
  const { fetchUserById } = useUserStore();
  const [loadingPlan, setLoadingPlan] = useState<"monthly" | "yearly" | null>(
    null
  );

  useEffect(() => {
    const fetch = () => {
      if (user?.id) fetchUserById(user.id);
    };
    fetch();
  }, [user?.id]);

  const userFromDB = useUserStore((s) => s.user);
  const isPremium = userFromDB?.subscription_status;
  const activePlan = userFromDB?.subscription_plan;
  const subscriptionEnd = userFromDB?.subscription_end
    ? new Date(userFromDB.subscription_end)
    : null;

  const now = new Date().getTime();
  // Avoid using setState synchronously in effect just for computed state
  const isExpired = subscriptionEnd ? subscriptionEnd.getTime() < now : false;

  const handleSubscribe = async (planKey: "monthly" | "yearly") => {
    if (!userFromDB) return;

    if (isPremium === true && !isExpired) {
      toast("You already have an active subscription");
      return;
    }

    if (!isSignedIn) {
      setLocation("/sign-in");
      return;
    }

    if (isPremium && !isExpired) {
      toast("You already have an active subscription");
      return;
    }

    try {
      setLoadingPlan(planKey); // 🔥 START LOADING

      const plan = PRICING_PLANS[planKey];

      const res = await subscription({
        priceId: plan.priceId,
        email: user?.primaryEmailAddress?.emailAddress ?? "",
        clerkUserId: user?.id ?? "",
        plan: plan.interval,
      });

      if (res?.url) {
        window.location.assign(res.url);
      }
    } catch {
      toast("Something went wrong");
      setLoadingPlan(null);
    }
  };

  const monthly = PRICING_PLANS.monthly;
  const yearly = PRICING_PLANS.yearly;

  const highlightCard =
    "border-2 border-primary shadow-2xl scale-105 z-10 bg-background relative";
  // const normalCard = "border border-border bg-background";

  const tickColor = (active: boolean) =>
    active ? "text-primary" : "text-muted-foreground";

  const isUserLoaded = !!userFromDB;
  const hasActiveSubscription =
    isUserLoaded && isPremium === true && !isExpired;

  return (
    <div className="min-h-screen bg-muted/20 py-30 px-4">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that fits your health monitoring needs.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mt-8 bg-muted px-6 py-3 rounded-full w-fit mx-auto">
          <Label className={!annual ? "font-bold" : "text-muted-foreground"}>
            Monthly
          </Label>

          <Switch checked={annual} onCheckedChange={setAnnual} />

          <Label className={annual ? "font-bold" : "text-muted-foreground"}>
            Yearly
            <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </Label>
        </div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Basic */}
        <Card className="p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
          <h3 className="text-2xl font-bold mb-2">Basic</h3>
          <p className="text-muted-foreground mb-6">For occasional checkups</p>

          <div className="text-4xl font-bold mb-8">
            $0 <span className="text-base text-muted-foreground">/mo</span>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex gap-3 text-sm">
              <Check className="w-5 h-5 text-primary" /> 3 Reports / month
            </li>
            <li className="flex gap-3 text-sm">
              <Check className="w-5 h-5 text-primary" /> Basic Summary
            </li>
            <li className="flex gap-3 text-sm">
              <Check className="w-5 h-5 text-primary" /> 7-day history
            </li>
          </ul>

          <Button
            variant="outline"
            className="cursor-pointer w-full transition-all hover:scale-[1.02]"
            onClick={() => setLocation("/home")}
          >
            Get Started
          </Button>
        </Card>

        {/* Monthly */}
        <Card
          className={clsx(
            "p-8 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl relative",
            !annual && highlightCard
          )}
        >
          {!annual && (
            <>
              <div className="absolute inset-0 -z-10 rounded-xl bg-primary/10 blur-2xl opacity-40" />
              <div className="absolute top-0 right-0 bg-primary text-white text-xs px-3 py-1 rounded-bl-xl rounded-tr-xl">
                ACTIVE
              </div>
            </>
          )}

          <h3 className="text-2xl font-bold text-primary">{monthly.title}</h3>
          <p className="text-muted-foreground mb-6">{monthly.subtitle}</p>

          <div className="text-4xl font-bold mb-8">
            ${monthly.price}
            <span className="text-base text-muted-foreground">/mo</span>
          </div>

          <ul className="space-y-4 mb-8">
            {[
              "Unlimited Reports",
              "Detailed Analysis",
              "Trend Tracking",
              "Priority Support",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm font-medium">
                <Check
                  className={clsx(
                    "w-5 h-5 transition-transform duration-300",
                    tickColor(!annual),
                    !annual && "scale-110"
                  )}
                />
                {item}
              </li>
            ))}
          </ul>

          <Button
            disabled={
              !isUserLoaded || // ⛔ block early clicks
              loadingPlan === "monthly" ||
              hasActiveSubscription
            }
            onClick={() => handleSubscribe("monthly")}
          >
            {hasActiveSubscription && activePlan === "monthly"
              ? "Current Plan"
              : loadingPlan === "monthly"
              ? "Redirecting..."
              : "Choose Monthly"}
          </Button>
        </Card>

        {/* Yearly */}
        <Card
          className={clsx(
            "p-8 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl relative",
            annual && highlightCard
          )}
        >
          {annual && (
            <>
              <div className="absolute inset-0 -z-10 rounded-xl bg-primary/10 blur-2xl opacity-40" />
              <div className="absolute top-0 right-0 bg-primary text-white text-xs px-3 py-1 rounded-bl-xl rounded-tr-xl">
                MOST POPULAR
              </div>
            </>
          )}

          <h3 className="text-2xl font-bold text-primary">{yearly.title}</h3>
          <p className="text-muted-foreground mb-6">{yearly.subtitle}</p>

          <div className="text-4xl font-bold mb-8">
            ${yearly.price}
            <span className="text-base text-muted-foreground">/mo</span>
          </div>

          <ul className="space-y-4 mb-8">
            {[
              "Unlimited Reports",
              "Detailed Analysis",
              "Trend Tracking",
              "Priority Support",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm font-medium">
                <Check
                  className={clsx(
                    "w-5 h-5 transition-transform duration-300",
                    tickColor(annual),
                    annual && "scale-110"
                  )}
                />
                {item}
              </li>
            ))}
          </ul>

          <Button
            disabled={
              !isUserLoaded || loadingPlan === "yearly" || hasActiveSubscription
            }
            onClick={() => handleSubscribe("yearly")}
          >
            {hasActiveSubscription && activePlan === "yearly"
              ? "Current Plan"
              : loadingPlan === "yearly"
              ? "Redirecting..."
              : "Choose Yearly"}
          </Button>
        </Card>
      </div>
    </div>
  );
}
