import { supabase } from "@/lib/services/supabase/supabaseclient";
import { ReportSchema } from "@/lib/services/zod/reportValidation";
import type { reportStoreType, ReportType } from "@/typedef";
import { create } from "zustand";

export const useReportStore = create<reportStoreType>((set, get) => ({
  reports: [],
  loading: false,

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

  loadReports: async (userId: string) => {
    try {
      set({ loading: true });

      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("user_id", userId);

      if (error) throw error;

      const parsed = ReportSchema.array().safeParse(data);

      if (!parsed.success) {
        console.log(parsed.error);
        throw new Error("Invalid data from DB");
      }

      set({ reports: data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  selectUserReports: (userId: string) => {
    return get().reports.filter((r) => r.user_id == userId);
  },
}));
