import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, Leaf } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

export default function Navbar() {
  const [location] = useLocation();

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
          <Link href="/">
            <a className="hover:text-emerald-600 transition-colors hover:scale-105 transform duration-200">
              Home
            </a>
          </Link>
          <Link href="/about">
            <a className="hover:text-emerald-600 transition-colors hover:scale-105 transform duration-200">
              How it Works
            </a>
          </Link>
          <Link href="/pricing">
            <a className="hover:text-emerald-600 transition-colors hover:scale-105 transform duration-200">
              Pricing
            </a>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <SignedOut>
            <div className="cursor-pointer inline-block">
              <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>

          <Sheet>
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
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
