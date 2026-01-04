import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { DollarSignIcon, LayoutPanelLeft, Leaf } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const { userId } = useAuth();
  const isPremium = useUserStore((s) => s.isPremium());

  if (location === "/" || location.startsWith("/dashboard")) return null;

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <div className="w-full max-w-6xl glass rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl shadow-emerald-900/5">
        <Link href="/home">
          <a className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-400 p-2.5 rounded-xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-foreground">
              BioScan<span className="text-emerald-600">.ai</span>
            </span>
          </a>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="/home">
            <a className="hover:text-emerald-600 transition-colors hover:scale-105 transform duration-200">
              Home
            </a>
          </Link>
          <button
            onClick={() => {
              const element = document.getElementById("how-it-works");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hover:text-emerald-600 transition-colors hover:scale-105 transform duration-200 cursor-pointer"
          >
            How it Works
          </button>
          <Link href="/pricing">
            <a className="hover:text-emerald-600 transition-colors hover:scale-105 transform duration-200">
              Pricing
            </a>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {isPremium && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border-emerald-200 text-emerald-800 text-sm font-bold shadow-xl shadow-emerald-900/5 backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                Pro
              </div>
            </motion.div>
          )}
          <SignedOut>
            <Button
              className="cursor-pointer inline-block"
              onClick={() => setLocation("/sign-in")}
            >
              SignIn
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Dashboard"
                  labelIcon={<LayoutPanelLeft size={17} />}
                  onClick={() => setLocation(`/dashboard/${userId}`)}
                />
              </UserButton.MenuItems>
              {/* <div className="block md:hidden"> */}
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Pricing"
                  labelIcon={<DollarSignIcon size={17} />}
                  onClick={() => setLocation(`/pricing`)}
                />
              </UserButton.MenuItems>
              {/* </div> */}
            </UserButton>
          </SignedIn>

          {/* <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                <Link href="/home">
                  <a className="text-lg font-medium">Home</a>
                </Link>
                <Link href="/pricing">
                  <a className="text-lg font-medium">Pricing</a>
                </Link>
                <Link href="/auth">
                  <a className="text-lg font-medium">Login</a>
                </Link>
              </div>
            </SheetContent>
          </Sheet> */}
        </div>
      </div>
    </nav>
  );
}
