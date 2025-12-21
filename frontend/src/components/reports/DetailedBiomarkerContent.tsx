import { HeartPulse } from "lucide-react";

export function DetailedBiomarkerContent() {
  return (
    <div className="space-y-8">
      {[1, 2, 3].map((i) => (
        <div key={i}>
          <div className="flex justify-between mb-2">
            <span className="font-medium flex items-center gap-2">
              <HeartPulse className="w-4 h-4" />
              Total Cholesterol
            </span>
            <span className="font-mono bg-gray-100 px-2 rounded">
              210 mg/dL
            </span>
          </div>

          <div className="h-4 bg-muted rounded-full overflow-hidden relative">
            <div className="h-full bg-gradient-to-r from-green-400 to-yellow-400 w-3/4 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
