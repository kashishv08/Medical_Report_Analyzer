import type { aiResType } from "@/typedef";
import { HeartPulse } from "lucide-react";

export function DetailedBiomarkerContent({ ai }: { ai: aiResType }) {
  return (
    <div className="space-y-10 text-justify h-full overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      {/* Detailed Metrics */}
      {ai?.detailed_metrics?.length > 0 && (
        <div className="space-y-6">
          <h3 className="font-bold text-xl">Detailed Biomarkers</h3>
          {ai?.detailed_metrics.map((m, i) => (
            <div key={i}>
              <div className="flex justify-between mb-2">
                <span className="font-medium flex items-center gap-2">
                  <HeartPulse className="w-4 h-4" />
                  {m.name}
                </span>
                <span className="font-mono bg-gray-100 px-2 rounded">
                  {m.value} {m.unit ?? ""}
                </span>
              </div>
              <div className="h-4 bg-muted rounded-full overflow-hidden relative">
                <div
                  className={`h-full ${
                    m.severity === "normal"
                      ? "bg-green-400"
                      : m.severity === "warning"
                      ? "bg-yellow-400"
                      : "bg-red-400"
                  }`}
                  style={{
                    width: m.progress_percent
                      ? `${m.progress_percent}%`
                      : "75%",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Diagnoses */}
      {ai?.full_data?.diagnoses && ai.full_data.diagnoses.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-bold text-xl">Diagnoses</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground">
            {ai?.full_data?.diagnoses.map((d: string, i: number) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Antibiotic Sensitivity */}
      {ai?.full_data?.lab_results?.antibiotic_sensitivity &&
        Object.keys(ai?.full_data.lab_results.antibiotic_sensitivity).length >
          0 && (
          <div className="space-y-2">
            <h3 className="font-bold text-xl">Antibiotic Sensitivity</h3>
            <div className="grid sm:grid-cols-2 gap-2 text-sm">
              {Object.entries(
                ai?.full_data.lab_results.antibiotic_sensitivity
              ).map(([drug, status]) => (
                <div
                  key={drug}
                  className={`flex justify-between p-2 rounded-lg border ${
                    status === "Sensitive"
                      ? "bg-green-50 border-green-300 text-green-700"
                      : status === "Intermediate"
                      ? "bg-yellow-50 border-yellow-300 text-yellow-700"
                      : "bg-red-50 border-red-300 text-red-700"
                  }`}
                >
                  <span>{drug}</span>
                  <span className="font-semibold">{String(status)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Observations */}
      {ai?.full_data?.observations?.length &&
        ai?.full_data?.observations?.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-bold text-xl">Observations</h3>
            <ul className="list-disc pl-5 text-sm text-muted-foreground">
              {ai?.full_data.observations.map((o: string, i: number) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>
        )}

      {/* Predictions */}
      {ai?.prediction?.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-bold text-xl">Predictions</h3>
          {ai?.prediction.map((p, i: number) => (
            <div
              key={i}
              className="border border-gray-400 rounded-xl p-3 bg-muted/30 space-y-1 text-sm"
            >
              <p className="font-medium">{p.reason}</p>
              <p className="text-muted-foreground">{p.insight}</p>
              <p className="text-primary">Prevention: {p.prevention_tip}</p>
            </div>
          ))}
        </div>
      )}

      {/* Recommendations */}
      {ai?.recommendation?.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-bold text-xl">Recommendations</h3>
          {ai?.recommendation.map((r, i: number) => (
            <div
              key={i}
              className="border border-gray-400 rounded-xl p-3 bg-muted/30 space-y-1 text-sm"
            >
              <p className="font-medium">{r.title}</p>
              <p className="text-muted-foreground">{r.explanation}</p>
              <p className="text-primary">Daily Action: {r.daily_action}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
