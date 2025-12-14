import { create } from "zustand";
import { supabase } from "@/lib/services/supabase/supabaseclient";
import { ReportSchema } from "@/lib/services/zod/reportValidation";
import type { reportStoreType, ReportType } from "@/typedef";

export const useReportStore = create<reportStoreType>((set, get) => ({
  reports: [],
  loading: false,

  fetchReports: async (userId: string) => {
    set({ loading: true });

    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .eq("user_id", userId)
      .order("uploaded_at", { ascending: false });

    if (error || !data) {
      set({ loading: false });
      return;
    }

    // 🔐 ZOD VALIDATION HERE
    const safeReports = data
      .map((r) => ReportSchema.safeParse(r))
      .filter((r) => r.success)
      .map((r) => r.data);

    set({ reports: safeReports, loading: false });
  },

  getReportById: (id: string): ReportType | undefined => {
    return get().reports.find((r) => r.id === id);
  },

  upsertReport: (report: ReportType) => {
    const parsed = ReportSchema.safeParse(report);

    if (!parsed.success) {
      console.error("Invalid report shape", parsed.error);
      return;
    }

    set((state: { reports: ReportType[] }) => {
      const exists = state.reports.find((r) => r.id === parsed.data.id);

      if (exists) {
        return {
          reports: state.reports.map((r) =>
            r.id === parsed.data.id ? parsed.data : r
          ),
        };
      }

      return {
        reports: [parsed.data, ...state.reports],
      };
    });
  },
}));
