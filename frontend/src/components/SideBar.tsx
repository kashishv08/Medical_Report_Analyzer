import { useUserStore } from "@/store/userStore";
import { CreditCard, FileText, Leaf } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "./ui/button";

function SideBar() {
  const isPremium = useUserStore((s) => s.isPremium());
  const userFromDb = useUserStore((s) => s.user);
  const [, setLocation] = useLocation();
  const subscriptionEnd = userFromDb?.subscription_end
    ? new Date(userFromDb.subscription_end)
    : null;

  const now = new Date().getTime();

  const daysLeft = subscriptionEnd
    ? Math.max(
        0,
        Math.ceil((subscriptionEnd.getTime() - now) / (1000 * 60 * 60 * 24))
      )
    : 0;
  return (
    <>
      <div className="p-8 h-[10%] mb-3">
        <Link href="/home">
          <a className="flex items-center gap-3 font-heading font-bold text-2xl text-emerald-950 cursor-pointer group">
            <div className="bg-emerald-100 p-2.5 rounded-xl group-hover:scale-110 transition-transform">
              <Leaf className="h-6 w-6 text-emerald-600" />
            </div>
            <span>BioScan</span>
          </a>
        </Link>
      </div>

      <div className="flex flex-col h-[90%] gap-10">
        <nav className="flex-1 px-6 space-y-3 py-4">
          <Button
            variant="ghost"
            className="cursor-pointer w-full justify-start gap-3 px-5 py-6 bg-emerald-100/50 text-emerald-800 font-bold rounded-2xl hover:bg-emerald-100 transition-all"
          >
            <FileText className="w-5 h-5" /> My Reports
          </Button>
          {/* <Button
            variant="ghost"
            className="cursor-pointer w-full justify-start gap-3 px-5 py-6 text-emerald-900/60 hover:bg-white/60 rounded-2xl transition-all font-medium hover:text-emerald-900 hover:scale-[1.02]"
          ></Button> */}
          <Button
            variant="ghost"
            className="cursor-pointer w-full justify-start gap-3 px-5 py-6 text-emerald-900/60 hover:bg-white/60 rounded-2xl transition-all font-medium hover:text-emerald-900 hover:scale-[1.02]"
            onClick={() => setLocation("/pricing")}
          >
            <CreditCard className="w-5 h-5" /> Subscriptions
          </Button>
          {/* <Button
            variant="ghost"
            className="w-full justify-start gap-3 px-5 py-6 text-emerald-900/60 hover:bg-white/60 rounded-2xl transition-all font-medium hover:text-emerald-900 hover:scale-[1.02]"
          >
            <Settings className="w-5 h-5" /> Settings
          </Button> */}
        </nav>

        <div className="p-6 pb-0 flex items-end">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-500 rounded-[1.5rem] p-6 text-white shadow-xl shadow-emerald-900/10 mb-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl group-hover:scale-150 transition-transform duration-700" />

            <div className="relative z-10">
              <h4 className="font-bold text-lg mb-1 flex items-center gap-2">
                <Leaf className="w-4 h-4" /> Pro Plan
              </h4>

              {/* 🔹 SUBTEXT */}
              {isPremium ? (
                <p className="text-emerald-100 text-sm mb-2 font-medium">
                  {userFromDb?.subscription_plan === "yearly"
                    ? "Yearly subscription active"
                    : "Monthly subscription active"}
                </p>
              ) : (
                <p className="text-emerald-100 text-sm mb-4 font-medium opacity-90">
                  Unlock advanced DNA analysis & storage.
                </p>
              )}

              {/* 🔹 DATE INFO */}
              {isPremium && subscriptionEnd && (
                <div className="text-sm text-emerald-100 mb-4 space-y-1">
                  <p>
                    Ends on{" "}
                    <span className="font-semibold">
                      {subscriptionEnd.toDateString()}
                    </span>
                  </p>
                  <p className="font-bold">
                    {daysLeft > 0
                      ? `${daysLeft} days remaining`
                      : "Subscription expired"}
                  </p>
                </div>
              )}

              {/* 🔹 BUTTON LOGIC */}
              <Button
                size="sm"
                variant="secondary"
                className="w-full bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm rounded-xl"
                asChild
              >
                {isPremium ? (
                  daysLeft > 0 ? (
                    // <Link href="/billing">Manage Subscription</Link>
                    ""
                  ) : (
                    <Link href="/pricing">Renew Subscription</Link>
                  )
                ) : (
                  <Link href="/pricing">Upgrade</Link>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
