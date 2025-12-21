import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function LockedOverlay() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/40 backdrop-blur-[6px]">
      <div className="bg-white/90 p-8 rounded-3xl shadow-2xl text-center max-w-sm border border-white/50 backdrop-blur-xl transform transition-transform hover:scale-105 duration-300">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
          <Lock className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Unlock Full Report</h3>
        <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
          Get deep insights into 45+ biomarkers, diet plans, and personalized
          health trends.
        </p>
        <Link href="/pricing">
          <Button
            size="lg"
            className="cursor-pointer w-full rounded-xl h-12 text-md font-bold shadow-xl shadow-primary/20 bg-gradient-to-r from-primary to-purple-600 hover:to-purple-700 border-none"
          >
            Upgrade to Premium
          </Button>
        </Link>
      </div>
    </div>
  );
}
